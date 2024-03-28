import { Modal, DatePicker,TimePicker,Button, Form, Input, Tooltip } from 'antd';
import dayjs from 'dayjs';
import{ Dayjs } from 'dayjs';
import { formatTimeTo24Hours } from '../../utils/function';
import { BlockformProps } from '../../type/index';
import { validateEndTime, validateStartTime } from '../../utils/dateDisabler';
import {Blockbutton,astriex,fromTime,timewidth,datestyle,titlestyle,buttonstyle,timepickergap} from '../../style/cssproperties'
import { useState } from 'react';

const Blockform = ({ IsModalOpen, setIsModalOpen, roomname, date, meetingblock, settimedayjs, timedayjs, setmeetingblock, settime, onblock, book ,time}: BlockformProps) => {
  const { TextArea } = Input;
  const datevalue=date;
  // const dateinstring=formatDateToISO(date);
  const [timelimit,setTimelimit]=useState("");
  const handleInputChange = (value: string) => {
    setmeetingblock(prevState => ({
      ...prevState,
      description: value,
    }));
  };
  const onStartChange = (time: any) => {
    if (time) {
      settimedayjs(prevState => ({
        ...prevState,
        startdayjs:time,
      }));
      settime(prevState => ({
        ...prevState,
        starttime:formatTimeTo24Hours(time),
      }));
        const calculatedend = new Date(time.$d);
        calculatedend.setMinutes(calculatedend.getMinutes() + 30);
        settimedayjs(prevState => ({
          ...prevState,
          enddayjs: dayjs(calculatedend),
        }));
        settime(prevState => ({
          ...prevState,
          endtime: formatTimeTo24Hours(dayjs(calculatedend)),
        }));
        setTimelimit(formatTimeTo24Hours(dayjs(calculatedend)))
    } else {
      settime(prevState => ({
        ...prevState,
        starttime:'',
        endtime: '',
      }));
      settimedayjs(prevState => ({
        ...prevState,
        startdayjs:time,
        enddayjs:null,
      }));
    }
  };

  const onEndChange = (time: Dayjs) => {
    if (time) {
      settimedayjs(prevState => ({
        ...prevState,
        enddayjs:time,
      }));
      settime(prevState => ({
        ...prevState,
        endtime: formatTimeTo24Hours(time),
      }));
    }else{
      settime(prevState => ({
        ...prevState,
        starttime:'',
        endtime: '',
      }));
      settimedayjs(prevState => ({
        ...prevState,
        startdayjs:null,
        enddayjs:null,
      }));
    }
  };

  const handleCancel = () => {
    meetingblock.description='';
    settimedayjs(prevState => ({
      ...prevState,
      startdayjs:null,
      enddayjs:null,
    }));
    setIsModalOpen(false);
  };
  
  return (
    <Modal title={<span style={titlestyle}>{roomname}</span>} footer={null} open={IsModalOpen} onCancel={handleCancel}>
      <Form layout='vertical'>
        <Form.Item
          label={<span style={datestyle}>Date <span style={astriex}>*</span></span>}
        >
          <Tooltip color='#5476e5' title="Can't Select the date. Please Select the date in the room page.">
          <DatePicker value={datevalue} format='DD-MM-YYYY' style={timewidth} disabled inputReadOnly  /></Tooltip>
        </Form.Item>
        <div style={timepickergap}>
        <Form.Item label={<span>From <span style={astriex}>*</span></span>} style={fromTime}>
        <TimePicker
            format="hh:mm a"
            onChange={(value) => {
              onStartChange(value);
            }}
            value={timedayjs.startdayjs}
            disabledTime={(date:Dayjs) =>
              validateStartTime(dayjs(), datevalue as Dayjs,date)
            }
          />
        </Form.Item>
        <Form.Item label={<span>To <span style={astriex}>*</span></span>} style={fromTime}>
        <Tooltip color='#5476e5' title={time.starttime==='' &&' Kindly Select Start Time Before Selecting End Time'}>
          <TimePicker 
            format="hh:mm a"
            onChange={(value) => {
              onEndChange(value);
            }}
            value={timedayjs.enddayjs}
            disabledTime={(date:Dayjs) =>
              validateEndTime(timelimit,date)
            }
            disabled={time.starttime.length > 0 ? false : true}
          /></Tooltip>
          </Form.Item>
        </div>
        <Form.Item label={<span>Reason <span style={astriex}>*</span></span>}>
          <TextArea value={meetingblock.description} rows={4} onChange={(e) => handleInputChange(e.target.value)} />
        </Form.Item>
        <Form.Item style={Blockbutton}>
          <Button disabled={!book} type="primary" style={buttonstyle} onClick={onblock}>
            Block
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}
export default Blockform;