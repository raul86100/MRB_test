import { useEffect, useState } from "react";
import apifunction from "../../utils/apiCall";
import { api } from "../../constant/apiConstant";
import Roomcard from "../../component/roomCard";
import { Response } from "../../type";
import BlockVerification from '../../models/verifyblock'
import dayjs, { Dayjs } from 'dayjs';
import { DatePicker } from 'antd';
import type { DatePickerProps } from 'antd';
import { formatDateToISO } from '../../utils/function'
import "./index.scss";
import Spinloading from '../../models/spinLoading';

const Book = () => {

    const [data, setdata] = useState([]);
    const [datePicker, setdatepicker] = useState<Dayjs>(dayjs(new Date()));
    const [dateinString, setdateinString] = useState<string>(formatDateToISO(dayjs(new Date())));
    const [Isblocked, setIsblocked] = useState({
        open:false,
        message:'',
        content:''
    });
    const [spinLoadingroom,setspinloadingroom]=useState(false);
    const [spinLoading,setspinLoading]=useState(false);

    const fetchdata = async () => {
        setspinloadingroom(true);
        const room = await apifunction({ url: api.baseurl + api.userListroom, method: "get", auth: true }).then((res) => {
            return res as any as Response;
        });
        setdata(room.data?.data);
        setspinloadingroom(false);
    }

    const Blockingroom = async (data: any) => {
        setspinLoading(true);
        const res:Response = await apifunction({
            url: api.baseurl + api.blockRoomapi,
            method: 'post',
            auth: true,
            payload: data,
        }).then((myres)=>{ return myres as Response})
    
        if(res.status === 200){
           await setIsblocked({
                open:true,
                message:'block',
                content:res.data?.message as string
              });
         }else{
            await setIsblocked({
                open:true,
                message:'notblock',
                content:res.data?.message as string
              });
         }           
         setspinLoading(false);
    
    };

    useEffect(() => {
        fetchdata();
        // eslint-disable-next-line
    }, [])

    const onChange: DatePickerProps['onChange'] = (date) => {
        const currentDate = date ? new Date(date.valueOf()) : new Date();
        const formattedDate = currentDate.getDate();
        const formattedMonth = currentDate.getMonth() + 1;
        const formattedYear = currentDate.getFullYear();
        setdatepicker(dayjs(currentDate));
        setdateinString(`${formattedYear}-${formattedMonth}-${formattedDate}`);
    };

    return (
        <div>
            {spinLoadingroom ||spinLoading ? <Spinloading/>:
           <>
            <header className="room-r1">
                <span>
                   <h2>{dayjs(datePicker).format("DD")} {dayjs(datePicker).format("MMMM")}, {dayjs(datePicker).format("dddd")}</h2>
                </span>
                <section>
                    <DatePicker format={"DD/MM/YYYY"} onChange={onChange} minDate={dayjs(new Date())} value={datePicker} />
                </section>
            </header>
            <div className="room-r3">
            {data.map((item, index) => (
                <Roomcard
                    setspinLoading={setspinLoading}
                    setIsblocked={setIsblocked}
                    dateinString={dateinString}
                    data={item}
                    key={index}
                    datePicker={datePicker}
                    Blockingroom={(meetingdata: any) => {
                        Blockingroom(meetingdata);
                    }}
                />
            ))}
             <BlockVerification Isblocked={Isblocked} setIsblocked={setIsblocked}  />
            </div>
        </>
          }
        </div>
    );
};

export default Book;
