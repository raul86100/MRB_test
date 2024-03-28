import { ChangeEvent, useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import {
Button,
DatePicker,
Form,
Input,
Select,
} from 'antd';
import { Modal,Tooltip,TimePicker} from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { formatDateToISO, formatTimeTo24Hours } from '../../utils/function';
import { RoomData } from '../../type';
import 'dayjs/locale/en';
//stylesheet
import './index.scss';
import AttendeesModal from '../../models/attendeesModal';
import {validateEndTime, validateStartTime } from '../../utils/dateDisabler';
import { bookingstatus_box,bb_info, timepickergap} from '../../style/cssproperties';
const Roomform = ({
roomDetail,
category,
empnameid,
callbackbody,
cofirmbooking,
editdata,
dateincard,
}: RoomData) => {
useEffect(() => {
dataset();
// eslint-disable-next-line
}, []);

const { Option } = Select;
  const startTimeValue = editdata.startTime
    ? dayjs(editdata.startTime, "h:mm a")
    : null;
  const endTimeValue = editdata.endTime
    ? dayjs(editdata.endTime, "h:mm a")
    : null;
  const initialDateValue = editdata.startDate
    ? dayjs(editdata.startDate, "DD-MM-YYYY")
    : null;

  const [roomdata, setroomdata] = useState({
    meetingtype: editdata.meetingCategory,
    description: editdata.description,
    meetingname: editdata.meetingName,
  });
  const guestEmails: string[] = editdata.guestList.map((guest: any) => {
    if (typeof guest === "string") {
      return guest;
    } else {
      return guest.email;
    }
  });
  const [emaildata, setemaildata] = useState(guestEmails);
  const [starttime, setstarttime] = useState({
    date: "",
    string: "T",
    stime: "",
  });
  const [endtime, setendtime] = useState({ string: "T", etime: "" });
  const [pickervalue, setpickervalue] = useState({
    datevalue: initialDateValue,
    starttimevalue: startTimeValue,
    endtimevalue: endTimeValue,
  });

  const [isFormFilled, setIsFormFilled] = useState<
    string | boolean | undefined
  >(false);
  const [isconfiembookingModal, setIsconfirmbookingModal] = useState(false);
  const [isattendeesModal, setattendeesModal] = useState(false);
  const [timelimit,setTimelimit]=useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setIsFormFilled(validation());
    cofirmbooking && setIsconfirmbookingModal(true);
    // eslint-disable-next-line
  }, [roomdata, starttime, emaildata, endtime, cofirmbooking]);

  const updatestarttime = (key: string, value: any) => {
    setstarttime((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const updatendtime = (key: string, value: any) => {
    setendtime((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const updatePickerValue = (key: string, value: Dayjs | null) => {
    setpickervalue((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const updateroomdata = (key: string, value: any) => {
    setroomdata((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const [timebool, settimeboo] = useState({
    starttimebool: false,
    endtimebool: false,
    datebool: false,
  });

  const updatetimdateestatus = (key: any, value: boolean) => {
    settimeboo((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleEmployeeModel = () => {
    setattendeesModal(true);
  };

  const onDateChange = (date: any) => {
    if (date) {
      updatePickerValue("datevalue", date);
      updatestarttime("date", formatDateToISO(date));
      updatetimdateestatus("dtbool", true);
    }
  };

  

  const onStartChange = (time: any) => {
    if (time) {
      updatePickerValue("starttimevalue", time);
      updatestarttime("stime", formatTimeTo24Hours(time));
        const calculatedend = new Date(time.$d);

        calculatedend.setMinutes(calculatedend.getMinutes() + 30);

        updatePickerValue("endtimevalue", dayjs(calculatedend));
        updatendtime("etime", formatTimeTo24Hours(dayjs(calculatedend)));
        setTimelimit(formatTimeTo24Hours(dayjs(calculatedend)))
   
    } else {
      updatestarttime("stime", "");
      updatePickerValue("endtimevalue", null);
      updatendtime("etime", "");
    }
    updatePickerValue("starttimevalue", time);
    updatetimdateestatus("stbool", true);
  };

  const onEndChange = (time: Dayjs) => {
    if (time) {
      updatePickerValue("endtimevalue", time);
      updatendtime("etime", formatTimeTo24Hours(time));
      updatetimdateestatus("etbool", true);
    }else{
      updatestarttime("stime","");
      updatePickerValue("endtimevalue", null);
      updatendtime("etime", "");
      updatePickerValue("starttimevalue",null);

    }
  };

  const handleMeetingnameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length > 0) {
      updateroomdata("meetingname", value);
    } else {
      updateroomdata("meetingname", "");
    }
  };

  const requestBody = {
    meetingName: roomdata.meetingname,
    meetingCategory: roomdata.meetingtype,
    userEntityList: emaildata,
    description: roomdata.description,
    startTime: starttime.date + starttime.string + starttime.stime,
    endTime: starttime.date + endtime.string + endtime.etime,
    roomEntityId: roomDetail?.id,
  };
  const timeDifference = () => {
    const startDate = new Date(`${starttime.date}T${starttime.stime}`);
    const endDate = new Date(`${starttime.date}T${endtime.etime}`);
    const differenceMs = endDate.getTime() - startDate.getTime();

    const differenceMinutes = Math.floor(differenceMs / (1000 * 60));
    return differenceMinutes >= 30;
  };
  const validation = () => {
    const timedifference = timeDifference();
    const isFormValid =
      roomdata.meetingtype &&
      starttime.stime &&
      endtime.etime &&
      emaildata.length > 0 &&
      roomdata.description &&
      roomdata.meetingname &&
      timedifference;
    return isFormValid;
  };

  const dataset = () => {
    if (dateincard) {
      updatePickerValue("datevalue", dayjs(dateincard.$d));
      updatestarttime("date", formatDateToISO(dayjs(dateincard.$d)));
      updatetimdateestatus("dtbool", true);
    }
    if (startTimeValue && timebool.starttimebool === false) {
      updatestarttime("stime", formatTimeTo24Hours(startTimeValue));
    }
    if (endTimeValue && timebool.endtimebool === false) {
      updatendtime("etime", formatTimeTo24Hours(endTimeValue));
    }
    if (initialDateValue && timebool.datebool === false) {
      updatestarttime("date", formatDateToISO(initialDateValue));
    }
  };

  const handleform = () => {
    callbackbody(requestBody);
    updateroomdata("meetingname", "");
    updateroomdata("meetingtype", "");
    updateroomdata("description", "");
    setemaildata([]);
    updatePickerValue("datevalue", null);
    updatePickerValue("starttimevalue", null);
    updatePickerValue("endtimevalue", null);
  };
  const handlenavigatetocard = () => {
    setIsconfirmbookingModal(false);
    navigate("/user/activity");
  };
  const currentDate = dayjs();
  return (
    <Form className="BookDetail_form" layout={"vertical"} onFinish={handleform}>
      <h1>{roomDetail?.name}</h1>
      <div className="form_item_row1">
        <Form.Item label="Meeting Category">
          <Select
            className="category_select"
            placeholder="Select Meeting Type"
            value={roomdata.meetingtype}
            onChange={(selectedValue) =>
              updateroomdata("meetingtype", selectedValue)
            }
            allowClear
          >
            {Array.isArray(category) &&
              category?.map((meetingType: string) => (
                <Option key={meetingType} value={meetingType}>
                  {meetingType}
                </Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item label="Date">
          <Tooltip
            title={
              editdata.startDate
                ? "Select Valid Date"
                : "Can't Select the date. Please Select the date in the room page."
            }
          >
            <DatePicker
              className="date"
              value={pickervalue.datevalue}
              onChange={onDateChange}
              disabledDate={(current) =>
                current && current < currentDate.startOf("day")
              }
              disabled={dateincard}
              format={"DD/MM/YYYY"}
            />
          </Tooltip>
        </Form.Item>
      </div>
      <div className="form_item_row2">
        <Form.Item label="Meeting Name">
          <Input
            className="meetname"
            placeholder="Enter Meeting Name"
            value={roomdata.meetingname}
            onChange={handleMeetingnameChange}
            maxLength={25}
          />
        </Form.Item>
        <Form.Item label="Attendees">
          <button
            className="attende_input"
            onClick={handleEmployeeModel}
            type="button"
          >
            {emaildata.length}
          </button>
        </Form.Item>
        {isattendeesModal && (
          <AttendeesModal
            emaildata={emaildata}
            setemaildata={setemaildata}
            empnameid={empnameid}
            isattendeesModal={isattendeesModal}
            setattendeesModal={setattendeesModal}
          />
        )}
      </div>
      <Form.Item className="form_item_row3" label="Agenda">
        <Input.TextArea
          rows={5}
          maxLength={250}
          value={roomdata.description}
          onChange={(e) => updateroomdata("description", e.target.value)}
        />
      </Form.Item>
      <div className="form_item_row4">
    
        <Form.Item  label={"Time Range (Atleast 30 mins)"}>
            <section style={timepickergap}>
          <TimePicker 
            format="hh:mm a"
            onChange={(value) => {
              onStartChange(value);
            }}
            value={pickervalue.starttimevalue}
            disabledTime={
              (date:Dayjs) =>
             
            validateStartTime(dayjs(), pickervalue.datevalue as Dayjs,date)
            }
           
          />
          <Tooltip  title={starttime.stime==="" &&' Kindly Select Start Time Before Selecting End Time'}>
          <TimePicker
            format="hh:mm a"
            onChange={(value) => {
              onEndChange(value);
            }}
            value={pickervalue.endtimevalue}
            disabledTime={(date:Dayjs)=> validateEndTime(timelimit,date)}
           
            disabled={starttime.stime.length > 0 ? false : true}
          /></Tooltip>
          </section>
        </Form.Item>
      
        <Button type="primary" htmlType="submit" disabled={!isFormFilled}>
          Book Now
        </Button>
        <Modal
          open={isconfiembookingModal}
          centered
          closable={false}
          footer={null}
        >
          <div style={bookingstatus_box}>
            {cofirmbooking?.icon}
            <p>{cofirmbooking?.shortdes}</p>
            <p style={bb_info}>{cofirmbooking?.longdes}</p>
            <button className='confiembookingModalbutton' onClick={handlenavigatetocard}>
              OK
            </button>
          </div>
        </Modal>
      </div>
    </Form>
  );
};

export default Roomform;