import React, { useEffect } from 'react';
import { Modal } from 'antd';
import { imageConst } from '../../constant/imageConstant';
import './index.scss';
type Props={
  onclose:()=> void;
  status:{visiblity:boolean,message:string};
}

const Model: React.FC<Props> = ({onclose,status}) => {
  const [modal, contextHolder] = Modal.useModal();
  useEffect(()=>{
countDown();
// eslint-disable-next-line
  },[])

  
  let secondsToGo =5;
  const content=(<section className='sucesspop'>
    <img src={status.visiblity?imageConst.sucessImg:imageConst.failureImg} alt="sucess" width="100px"/>
    <h2>{status.visiblity?"Successful":"Failed"}</h2>
    <h3>{status.message}</h3>
    <button className='okay-btn' onClick={onclose} >Ok</button>
  </section>);




  const countDown = () => {
    

    const instance = modal.info({
      content:content,
      centered:true,
      footer:null
    });

    const timer = setInterval(() => {
     
      secondsToGo -= 1;
      instance.update({
        content:content,
      });
      
    }, 1000);

    setTimeout(() => {
      clearInterval(timer);
      instance.destroy();
      onclose();
    }, secondsToGo * 1000);
  };
  
  
  return (
    <>
      {contextHolder}
    </>
  );
};

export default Model;