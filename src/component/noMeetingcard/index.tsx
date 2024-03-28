import React from 'react'
import './index.scss';
import { FaUsers } from "react-icons/fa";
type Props={
    message:string,
}

const Nomeeting = (props:Props) => {
    const{message}=props
  return (
    <div className="no-meeting">
      <FaUsers className='no-meeting-icon'/> 
      <h4>{message}</h4>
    </div>
  )
}

export default Nomeeting
