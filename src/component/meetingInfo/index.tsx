import React from "react";
import "./index.scss";

interface MeetingInfoProps {
  meeting: string;
  name:string;
  host: string;
  startTiming: string;
  endTiming: string;
  room: string;
  shade:boolean
}

const MeetingInfo: React.FC<MeetingInfoProps> = ({
  meeting,
  host,
  startTiming,
  endTiming,
  room,
  name,shade
}) => {
  return (
    <div className={shade?"meetingInfo-container":"shade-meetingInfo-container"}>
      <div className="meetingInfo">
        <h3>
          {name} ({meeting}) | {host} | {startTiming} -{" "}
          {endTiming} | {room}
        </h3>
      </div>
    </div>
  );
};

export default MeetingInfo;
