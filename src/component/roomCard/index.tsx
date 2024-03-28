import './index.scss';
import { api } from '../../constant/apiConstant';
import apifunction from '../../utils/apiCall';
import { HiUserGroup } from "react-icons/hi";
import {EyeTwoTone} from '@ant-design/icons'
import { useNavigate } from 'react-router-dom';
import Blockform from '../../models/blockform';
import AvailableSlot from '../../models/availableslot';
import { useSelector} from 'react-redux';
import {Userslice,unblockdatatype,PropsRoomcardtype,Blockroomdata,Response} from '../../type'
import { useEffect, useState } from 'react';
import { Dayjs } from 'dayjs';
import {formatDateToISO} from '../../utils/function';
import { ImUnlocked } from "react-icons/im";
import UnBlock from '../../models/unblockcard';
import UnBlockornot from '../../models/unblockornot';
import { Dateformatter } from '../../utils/function';

const Roomcard=(props:PropsRoomcardtype)=>{
const{data,datePicker,Blockingroom,dateinString,setIsblocked,setspinLoading} =props;
const navigate=useNavigate();
const [OpenSlot, setOpenSlot] = useState(false);
const [IsUnblock, setIsUnblock] = useState(false);
const userdata = useSelector((state: any) => state.userReducer as Userslice);
const [isModalOpen, setIsModalOpen] = useState(false);
const [selectedIds, setSelectedIds] = useState<number[]>([]);
const [unblockornot,setunblockornot]=useState(false);
const[unblockdata,setunblockdata]=useState<unblockdatatype[]>([]);
const [unblocklength,setunblocklength]=useState(0);
const [showButton, setShowButton] = useState(false);
const [availableSlotdata, setavailableSlotdata] = useState<Blockroomdata[]>([]);
const [loading,setloading]=useState(false);
const [blockroomdetail,setblockroomdetail]=useState<Blockroomdata[]>([]);
const UnblockSlot = async (data:number[]) => {
  setspinLoading(true);
  const res= await apifunction({
    url: api.baseurl + api.unBlockids ,
    method: 'put',
    auth: true,
    payload:{ids:data}
  }).then((res)=>{ return res as Response})

if(res.status===200){
  setIsblocked({
    open:true,
    message:'unblock',
    content:res.data?.message
  });
  setSelectedIds([]);
}
setspinLoading(false);
};
const Dateformat = Dateformatter(dateinString,true);

const fetchAvailableSlot = async (Dateformat:string, id: number) => {
  setloading(true);
  const room = await apifunction({
    url: api.baseurl + api.getBlockedroomdetails + id + '?date=' + Dateformat,
    method: 'get',
    auth: true
  }).then((res) => {
    return res.data.data as Blockroomdata[];
  });
  setavailableSlotdata(room);
  setloading(false);
};
const fetchblockedroomdetail = async (Dateformat:string, id: number) => {
  setloading(true);
  const room = await apifunction({
  url: api.baseurl + api.getblockedroomdetails +'?roomId='+ id + '&date=' + Dateformat,
  method: 'get',
  auth: true
  }).then((res) => {
  return res.data.data as Blockroomdata[];
  });
  setblockroomdetail(room);
  setloading(false);
  };

const [timedayjs,settimedayjs]=useState<{ startdayjs: Dayjs | null; enddayjs: Dayjs | null }>({
   startdayjs:null,
   enddayjs:null
})
const [time,settime]=useState({
    starttime:'',
    endtime:''
})
const [meetingblock,setmeetingblock]=useState({
  meetingName: data.name,
  description: '',
  startTime: '',
  endTime:'',
  roomEntityId: data.id,
});

useEffect(() => {
  const stringdate=formatDateToISO(datePicker);
  setmeetingblock(prevState => ({
    ...prevState,
    startTime: stringdate + 'T' + time.starttime,
    endTime: stringdate + 'T' + time.endtime
  }));
}, [datePicker,time.starttime,time.endtime]);
const [book,setbook]=useState(false);

useEffect(() => {
  if (((meetingblock.description!=='') && (meetingblock.startTime.length>12) && meetingblock.endTime.length>12)) {
    setbook(true);
  } else {
    setbook(false);
  }}, [meetingblock,unblocklength]);


const onblock=()=>{
  Blockingroom(meetingblock);
  setIsModalOpen(false);
  settimedayjs(pre=>({
    ...pre,
    startdayjs:null,
    enddayjs:null,
  }))
  setmeetingblock(prevState => ({
    ...prevState,
 
    description:'',
  }));
};
const handleNavigate=(id:number,datePicker:Dayjs)=>{
navigate("/bookform",{state:{ id, datePicker }});
} 

const handleAvailableSlot=(Dateformat:string,id:number) => {
  fetchAvailableSlot(Dateformat,id);
  setOpenSlot(true);
}
const handleunblock=(Dateformat:string,id:number)=>{
  fetchblockedroomdetail(Dateformat,id);
  setIsUnblock(!IsUnblock);
}
return(
<div >
<div className='roomcard-outer'>
<div className='roomcard-layout'>
<img src={data.imageUrl} className='row-1' alt='roomimg'/>
{userdata.data.admin===true&&
     <div className='dots-menu'>
     <div className='dots-icon' onClick={() => setShowButton(!showButton)}>
       &#8942;
     </div>
     {showButton && (
       <button className='unblock' onClick={() => handleunblock(Dateformat,data.id)}>
         <ImUnlocked /> Unblock
       </button>
     )}
   </div>
}
<UnBlock setunblockornot={setunblockornot} availableblockdata={blockroomdetail} IsUnblocked={IsUnblock}roomname={data.name} setUnIsblocked={setIsUnblock} SelectedIds={selectedIds} setSelectedIds={setSelectedIds} setunblockdata={setunblockdata}setunblocklength={setunblocklength}/>
<UnBlockornot  selectedIds={selectedIds} unblockcard={unblockornot} setunblockcard={setunblockornot} unblockdata={unblockdata} UnblockSlot={UnblockSlot}/>
<section>
<div className='row-2'>
<div className='idquantity' >
<span>{data.name}</span>
<span className='capacity-label'><HiUserGroup />{data.minCapacity}-{data.maxCapacity}</span>
</div>
<button className='viewslotbutton' onClick={()=>handleAvailableSlot(Dateformat,data.id)}><EyeTwoTone />Available Slot</button>
</div>
<AvailableSlot loading={loading}name={data.name} setOpenSlot={setOpenSlot} availableSlotdata={availableSlotdata}OpenSlot={OpenSlot} />
<footer>{data.facilitiesEntityList.map((item,index)=>{return <img src={item.iconUrl} width="50px" key={index} alt={index.toString()}/>})}</footer>
{userdata.data.admin===true?
  <><button onClick={() => setIsModalOpen(!isModalOpen)}>Block Room</button>
   <Blockform meetingblock={meetingblock} book={book} settime={settime} time={time} settimedayjs={settimedayjs} timedayjs={timedayjs}setmeetingblock={setmeetingblock} IsModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} roomname={data.name}  date={datePicker} onblock={onblock}/>
 </>:<button onClick={()=>handleNavigate(data.id,datePicker)}>Request for Booking</button>
}
</section>
</div>
</div>
</div>
)}
export default Roomcard;