import { Button,Modal } from 'antd';
import {imageConst} from '../../constant/imageConstant'
import {useEffect, useState } from 'react';
import {blockedactiontype}from '../../type/index';
import { verifyblockStyle,verifyblockclosebuttonstyle,verifyblockcontentstyle,verifyblockparastyle } from '../../style/cssproperties';
const BlockVerification= ({Isblocked,setIsblocked}:blockedactiontype) => {
  
  const [block,setblock]=useState({icon:'',status:''});
  const checkblock={
    success:{
      icon:imageConst.sucessImg,
      status:'Slot Blocked',
    },
    failure:{
     icon:imageConst.failureImg,
     status:'Slot Unavailable',
    },
    unblock:{
      icon:imageConst.sucessImg,
      status:'UnBlocked'
    }
 };

 useEffect(()=>{
   if(Isblocked.message==='block'){
    setblock(checkblock.success);
   }else if(Isblocked.message==='notblock'){
     setblock(checkblock.failure);
   }else if(Isblocked.message==='unblock'){
     setblock(checkblock.unblock);
   }
   // eslint-disable-next-line
},[Isblocked])


 const handleOk = () => {
  setIsblocked(false);
};
  const handleCancel = () => {
    setIsblocked(false);
  };

  return (  
      <Modal footer={null} style={verifyblockStyle} open={Isblocked.open} centered onCancel={handleCancel}>
        <div style={verifyblockcontentstyle}>
        <img  src={block.icon} alt='loading' width={120} />
        <h2 style={verifyblockparastyle}>{block.status}</h2>
        <h3>{Isblocked.content}</h3>
        <Button style={verifyblockclosebuttonstyle} onClick={handleOk}>Close</Button>
        </div>
      </Modal>   
  );
};

export default BlockVerification;