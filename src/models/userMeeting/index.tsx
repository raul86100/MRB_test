import React from "react";
import "../userMeeting/userMeeting.scss";
import {CloseOutlined} from '@ant-design/icons';
import { MeetingData } from "../../type";
import MeetingInfo from "../../component/meetingInfo";


interface UserMeetingModalProps {
  onClose: () => void;
  date: string;
  day: string;
  meetingData: MeetingData[];
}

const UserMeetingModal: React.FC<UserMeetingModalProps> = ({
  onClose,
  date,
  day,
  meetingData,
}) => {
  return (
    <div className="userMeeting-container">
      <div className="userMeeting-Modal">
        <div className="userMeeting-close">
          <div className="userMeeting-date">
            <p> {date}</p>
            <p className="userMeeting-day">{day}</p>
          </div>
          <CloseOutlined size={25} onClick={onClose} />
        </div>
        <div className="meeting-details">
          {meetingData.length > 0 ? (
            meetingData.map((data) => (
              <MeetingInfo
                key={data.id}
                meeting={data.meetingCategory}
                host={data.hostName}
                startTiming={data?.startTime}
                endTiming={data?.endTime}
                room={data.roomName}
                name={data.meetingName}
                shade={false}
              />
            ))
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserMeetingModal;
