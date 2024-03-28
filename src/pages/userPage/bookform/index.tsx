import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apifunction from '../../../utils/apiCall';
import { api } from '../../../constant/apiConstant';
import { useSelector } from 'react-redux';
import Roomform from '../../../component/bookingRoomForm';
import { EmploeenameidType, MeetCategoryType, RoomData, roomData,cofirmbooking,Facility,Userslice} from '../../../type';
import {confirbooking} from '../../../constant/confirbookingConstant';
import { useLocation } from 'react-router-dom';
import { icons } from '../../../constant/reacticonConstant'
import Spinloading from '../../../models/spinLoading';
//stylesheet
import './index.scss';
const Bookingpage= () => {
 
  const [roomDetail, setRoomDetail] = useState<roomData>({} as RoomData);
  const [meetcategory,setmeetcategory]=useState<MeetCategoryType>({} as MeetCategoryType);
  const [empnameemail,setempnameemail]=useState<EmploeenameidType[]>();
  const [bookstatus,setbookstatus]=useState<cofirmbooking>();
  const [spinloading,setspinloading]=useState(false);

  const userdata = useSelector((state: any) => state.userReducer as Userslice);
  const location = useLocation();
  const navigate=useNavigate();
  
  const editdata= location.state?.status==="PENDING"?location.state:{description:"",endDate: "",endTime: null,guestList:[],hostEmail:"", hostName: "",
  id:-5,meetingCategory:"",meetingName: "",roomEntityId:2,roomName: "",startDate:null,startTime: null,
  status:"PENDING"};
  const roomid:number=location.state?.status==='PENDING'?location.state.roomEntityId:location.state.id;

  const fetchRoomDetails = async (roomid:number) => {
    setspinloading(true);
      const response = await apifunction({
        url: `${api.baseurl}${api.bookingRoomdetailbyid}${roomid}`,
        method: 'get',
        auth: true,
      });
      setRoomDetail(response.data.data);
   
    setspinloading(false);

  };
  const fetchMeeetingcategory = async () => {
    setspinloading(true);
    
      const response = await apifunction({
        url: `${api.baseurl}${api.meetingCategoryurl}`,
        method: 'get',
        auth: true,
      });
      setmeetcategory(response.data.data);
  
    setspinloading(false);

  }; 
  const fetchAttendees = async () => {
    setspinloading(true);
      const response=await apifunction({
        url:api.baseurl + api.employeNameid,
        method:'get',
        auth:true,
      }).then((res)=>{return res.data.data as EmploeenameidType[]})
      const filterhost=response.filter((item)=>{return item.email!== userdata.data.email});
      
      setempnameemail(filterhost);
    setspinloading(false);

  };
  const roomBooking=async(data:any)=>{
    setspinloading(true);
    const res=await apifunction({
      url:api.baseurl + api.postBookingroomForm,
      method:'post',
      auth:true,
      payload:data,
    });
    if (res.status===200) {
      setbookstatus(confirbooking.success);
    }
    else{
      setbookstatus(confirbooking.failed);
    }
    setspinloading(false);

  };
  const editRoomBooking=async(data:any,id:number)=>{
    setspinloading(true);
     const res=await apifunction({
       url:api.baseurl + api.putBookingroomForm + id,
       method:'put',
       auth:true,
       payload:data,
     });
     if(res.status===200) {
       setbookstatus(confirbooking.success);
     }else{
      setbookstatus(confirbooking.failed);
     }
    
    setspinloading(false);

   };

const postorputbookroomdata=(data:any)=>{
  if(location.state?.status==="PENDING"){
    editRoomBooking(data,editdata.id);
   }else{
    roomBooking(data);
     }
  }

  useEffect(() => {
    fetchall();
    // eslint-disable-next-line
  }, [roomid]);

  const fetchall=async()=>{
    await fetchRoomDetails(roomid);
    await fetchMeeetingcategory(); 
    await fetchAttendees();
  }
  
  return (
    <div className='Meeting_page'>
      {spinloading?<Spinloading/>:<>
       <div className='Nav_back' onClick={()=>navigate('/user/booking')}><icons.MdArrowBackIos/>Back </div>
      <div className='Meetingimageform_container'>
        <div className='Room_image'>
          <img src={roomDetail?.imageUrl} className='room_image'alt="logo" />
        </div>
        <Roomform roomDetail={roomDetail} dateincard={location.state?.datePicker} cofirmbooking={bookstatus} category={meetcategory} empnameid={empnameemail}  callbackbody={(data:any)=>postorputbookroomdata(data)} editdata={editdata}/>
      </div>
      <div className='About'>
        <h3>About</h3>
        <div className='Room_about'>
            <p>{roomDetail?.description}</p>    
         </div>
      </div>
      <div className='Amenities'>
        <h3>Amenities</h3>
        <div className='Amenities_content'>
           <div className='Amenities_item'>
              <icons.BsFillPeopleFill className='icon'/>
              <h6>{roomDetail?.minCapacity}-{roomDetail?.maxCapacity}</h6>
        </div>
          {roomDetail?.facilitiesEntityList?.map((i:Facility)=>(
             <div key={i.facilityName} className='Amenities_item'>
                <img src={i.iconUrl} alt='loading'/>
                <h6>{i.facilityName}</h6>
              </div>     
           ))}
        </div>
      </div>
      </>}
    </div>
  )
}

export default Bookingpage

