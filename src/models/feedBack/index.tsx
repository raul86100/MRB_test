import { FaStar } from "react-icons/fa";

import "./index.scss";
import { Modal } from "antd";
import { useState } from "react";
import TextArea from "antd/es/input/TextArea";
import apifunction from "../../utils/apiCall";
import { api } from "../../constant/apiConstant";
type Props = {
  meetingId: number;
  callback: any;
  isopen: boolean;
};

const FeedbackModel = (props: Props) => {
  const { meetingId, callback, isopen } = props;
  const [message, setMessage] = useState("");
  const feebackLength = Array.from({ length: 5 });
  const [rating, setRating] = useState(0);
  const checkRating = (index: number) => {
    if (rating >= index) {
      return true;
    } else {
      return false;
    }
  };
  const onSubmit=async()=>{
    await apifunction({url:api.baseurl+api.userFeedback,method:"post",payload:{feedback:message,rating:rating,meetingId:meetingId},auth:true});
    callback(true);
  }
  return (
    <Modal
      open={isopen}
      onCancel={() => {
        callback(false);
      }}
      onOk={()=>message.length>0? onSubmit() :alert("Please Enter the feedback")}
      centered
   
    >
      <div className="user-feedback">
      <h2>Feedback {"(max 255 character)"}</h2>
      <TextArea
        rows={10}
        placeholder="Enter Reason here"
        maxLength={255}
        onChange={(e) => {
          setMessage(e.target.value);
        }}
      />

      <section>
        {feebackLength.map((_, index) => {
          return (
            <FaStar
              size={30}
              className={checkRating(index + 1) ? "yellow" : "non-yellow"}
              key={index}
              onClick={() => {
                setRating(index + 1);
              }}

            />
          );
        })}
      </section>
      </div>
    </Modal>
  );
};
export default FeedbackModel;
