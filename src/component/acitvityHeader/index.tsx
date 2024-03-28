import React, { useState } from 'react'
import './index.scss';
type Props={
label:string[],
defaultLabel:string,
callback:(e:string)=> void;
}

const ActivityHeader:React.FC<Props> = (props) => {
        const {label,callback,defaultLabel}=props;

    const [myclass,setMyclass]=useState(defaultLabel);
    

    const handlechange=(item:string)=>{
        setMyclass(item);
        callback(item as string);

    }

  return (
    <>
    <ul className='activityheader'>
        {label.map((item,index)=>{
            return <li key={index} className={myclass===item ? "blue":"nonblue"} onClick={()=>handlechange(item)}>{item}</li>
        })}
       
    </ul>
    </>
  )
}


export default ActivityHeader;
