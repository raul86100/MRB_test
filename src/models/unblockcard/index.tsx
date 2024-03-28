import {Modal } from 'antd';
import { blockedtype } from '../../type';
import './index.scss';

const UnBlock= ({IsUnblocked,setUnIsblocked,setSelectedIds,setunblockdata,SelectedIds,setunblocklength,roomname,availableblockdata,setunblockornot}:blockedtype) => {
 
    const handleTdClick = (id:number,meetingName:string,hostName:string,startTime:string,endTime:string) => {
      const isSelected = SelectedIds.includes(id);
      if (isSelected) {
        setSelectedIds(prev => prev.filter(selectedId => selectedId !== id));
        setunblockdata(prev => prev.filter(item => item.id !== id));
      } else {
        setSelectedIds(prev => [...prev, id]);
        setunblockdata(prev => ([...prev, {
          meetingName: meetingName,
          hostName: hostName,
          startTime: startTime,
          endTime: endTime,
          id: id 
        }]));
      }
    };

  const handleunblock = () => {
    setUnIsblocked(false);
    setunblocklength(SelectedIds.length);
    setunblockornot(true);

  };

  const handleCancel = () => {
    setUnIsblocked(false);
    setSelectedIds([]);
  };

  return (
    <>
      <Modal footer={null} width={600} open={IsUnblocked} centered onCancel={handleCancel}>
      <h1 className='roomname'>{roomname}</h1>
      <div className='unblock-container'>
          {availableblockdata.map((data) => (
                        <div onClick={()=>handleTdClick(data.id,data.meetingName,data.hostName,data.startTime,data.endTime)} key={data.id} className={SelectedIds.includes(data.id)?"selected":"notselected"}>
                             {data.meetingName} | {data.hostName} |{data.startTime} - {data.endTime}
                        </div>
          ))}               
      </div>
      <div className='button_container'><button  onClick={handleunblock} className={SelectedIds.length>0?'closebuttonstyle':'closebuttonstyle_disable'} disabled={SelectedIds.length>0?false:true}>UnBlock</button>
     </div>
      </Modal>
    </>
  );
};

export default UnBlock;