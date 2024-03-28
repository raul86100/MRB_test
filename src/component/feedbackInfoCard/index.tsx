import { FaUserCircle } from "react-icons/fa";
import "./index.scss";
import { FeedbackInfoCard } from "../../type";
import { useEffect, useState } from "react";
interface Cardtype {
  data: FeedbackInfoCard;
  active: boolean;
  callback: (data: FeedbackInfoCard) => void;
}

const FeedbackInfo = (props: Cardtype) => {
  const { data, active, callback } = props;
  const [timeElapsedString, setTimeElapsedString] = useState("");
  useEffect(() => {
    lastSeen(new Date(data.timestamp));
    const intervalId = setInterval(() => {
      lastSeen(new Date(data.timestamp));
    },60000);
    return () => clearInterval(intervalId);
    // eslint-disable-next-line
  }, []);

  const lastSeen = (lastseen: any) => {
    const currentDate = new Date();

    const timeDifference = currentDate.getTime() - lastseen.getTime();

    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      setTimeElapsedString(`${days} day ago`);
    } else if (hours > 0) {
      setTimeElapsedString(`${hours} hrs ago`);
    } else if (minutes > 0) {
      setTimeElapsedString(`${minutes} min ago`);
    } else {
      setTimeElapsedString(`now`);
    }
  };
  return (
    <div
      className={active ? "unseencard" : "info-card"}
      onClick={() => {
        if (!active) {
          callback(data);
        }
      }}
    >
      <section className="name-details">
        <FaUserCircle className="avatar" />
        <h4>
          {data.hostName} 
        </h4>
        {timeElapsedString}
      </section>
      <p className="short-des">
        {data.feedback}
      </p>
    </div>
  );
};
export default FeedbackInfo;
