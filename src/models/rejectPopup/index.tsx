import React, { useState } from "react";
import "./index.scss";
import { Modal } from "antd";
import { Input } from 'antd';
type RejectPopProps={
  id:number;
  onclose:()=> void;
  onReject:(id:number,message:string)=>void;
  isopen:boolean;
}
const { TextArea } = Input;

const RejectPopUp: React.FC<RejectPopProps> = ({id,onclose,onReject,isopen}) => {
  const [message,setmessage]=useState("");

  
  return (
   <Modal open={isopen} centered onCancel={onclose} onOk={()=>{message.length>0?onReject(id,message):alert("Please fill the Reason")}}>
    <section>
      <h2>Reason</h2>
      <TextArea rows={10} placeholder="maxLength is 255" maxLength={255} onChange={(e)=>{setmessage(e.target.value)}}/>
    </section>
   </Modal>
  );
};

export default RejectPopUp;
