import { Modal } from 'antd';
import {unblockornottype} from '../../type';
import './index.scss';

const UnBlockornot= ({unblockcard,setunblockcard,unblockdata,UnblockSlot,selectedIds}:unblockornottype) => {
   
  const handleOk = (confirm:string) => {
    if(confirm==='yes'){
      UnblockSlot(selectedIds);
    }
    setunblockcard(false);
  };

  const handleCancel = () => {
    setunblockcard(false);
  };

  return (
    <>
      <Modal footer={null} open={unblockcard} centered onCancel={handleCancel}>
        <div className='unblockornot_container'>
        <h1>Unblock the slot ?</h1>
        <div className='unblockornot_content'>
        {unblockdata.map((data) =>(
           <div key={data.id} className='unblockornot_data'>
            {data.meetingName} | {data.hostName} | {data.startTime} | {data.endTime}
           </div>
        ))}
        </div>
        <div className='yesorno_button'>
        <button className='yesbutton' onClick={()=>handleOk('yes')}>Yes</button>
        <button className='nobutton' onClick={()=>handleOk('no')}>No</button>
        </div>
        </div>
      </Modal>
    </>
  );
};

export default UnBlockornot;