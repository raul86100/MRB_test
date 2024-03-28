import { useState } from "react";
import { api } from "../../constant/apiConstant";
import { ActivityCardentity, Userslice } from "../../type";
import apifunction from "../../utils/apiCall";
import Rejectbutton from "../buttons/confirmationButton";
import "./index.scss";
import { FaArrowRight } from "react-icons/fa";
import {
  ClockCircleTwoTone,
  EditTwoTone,
  EyeTwoTone,
  UserOutlined,
  CalendarTwoTone,
} from "@ant-design/icons";
import Popcard from "../../models/activityConfirmationpopup";
import Viewcard from "../../models/activityViewdetails";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

type Props = {
  isedit: boolean;
  isview: boolean;
  iscancel: boolean;
  ishost: boolean;
  data: ActivityCardentity;
  divison?: string;
  callback: any;
  isLoading: any;
  feedback?: any;
};

const Card = (props: Props) => {
  const {
    isedit,
    isview,
    data,
    divison,
    iscancel,
    ishost,
    callback,
    isLoading,
    feedback,
  } = props;
  const [pop, setPop] = useState(false);
  const [view, setView] = useState(false);
  const [card, setCarddata] = useState<ActivityCardentity>();
  const navigate = useNavigate();
  const userdata = useSelector((state: any) => state.userReducer as Userslice);

  const widthdrawcall = (id: number) => {
    if (id) {
      setPop(true);
    }
  };
  const completewithdraw = async (type: boolean) => {
    setPop(false);
    if (type) {
      isLoading(true);
     const response= await apifunction({
        url: api.baseurl + (userdata.data.admin?api.adminMeetingCancel:api.userPendingwithdraw) + data.id,
        method: "put",
        auth: true,
      }).then((res)=>{return res as Response});

      if (divison === "Pending") {
        callback("reloadPending");
      } else {
        callback("reloadUpcoming",response);
      }
    } else {
      setPop(false);
    }
  };
  const myViewcard = (mydata: ActivityCardentity) => {
    setCarddata(mydata);
    setView(true);
  };
  const handleNavigate = (obj: ActivityCardentity) => {
    navigate("/bookform", { state: obj });
  };
  const timstampconverter = (dateTimeString: string) => {
    const [datePart, timePart, merdian] = dateTimeString.split(" ");
    const [day, month, year] = datePart.split("-");
    const [hourString, minuteString] = timePart.split(":");

    const hour =
      merdian === "pm"
        ? hourString === "12"
          ? 12
          : parseInt(hourString) + 12
        : parseInt(hourString);

    const targetDate = new Date(
      parseInt(year),
      parseInt(month) - 1,
      parseInt(day),
      hour,
      parseInt(minuteString),
      0,
      0
    );
    const currentDate = new Date();

    const differenceInMilliseconds =
      currentDate.getTime() - targetDate.getTime();
    const thirtyMinutes = 30 * 60 * 1000;
    if (targetDate.toDateString() === currentDate.toDateString()) {
      return differenceInMilliseconds < thirtyMinutes;
    }
    return false;
  };
  const handlefeeback = () => {
    if (data !== undefined && data.id !== undefined) {
      feedback(data.id as number);
    }
  };
  return (
    <div
      className={
        divison === "History" &&
        timstampconverter(data.endDate + " " + data.endTime) &&
        !data.feedback &&
        data.status === "COMPLETED" &&
        data.hostEmail === userdata.data.email
          ? "activity-history-card"
          : "activity-card-layout"
      }
    >
      <section className="acitivity-card">
        {view && (
          <Viewcard
            data={card as ActivityCardentity}
            callback={() => {
              setView(false);
            }}
            isopen={view}
          />
        )}
        {pop && (
          <Popcard
            message={
              divison === "Pending"
                ? "Are you sure you want to Withdraw the meeting?"
                : "Are you sure you want to cancel the meeting?"
            }
            okay={"confirm"}
            reject={"cancel"}
            callback={(e: string) => {
              e === "confirm"
                ? completewithdraw(true)
                : completewithdraw(false);
            }}
          />
        )}

        <p className="meeting-name">
          {data.meetingName}({data.meetingCategory})
        </p>
        {ishost && (
          <span className="host">
            <UserOutlined />
            {data.hostName}
          </span>
        )}
        <span className="indicator">
          <CalendarTwoTone />
          {data.startDate}
        </span>
        <span className="indicator">
          <ClockCircleTwoTone />
          {data.startTime}
          <span>-{data.endTime}</span>
        </span>

        {isview && (
          <span
            className="card-click"
            onClick={() => {
              myViewcard(data);
            }}
          >
            <EyeTwoTone />
            <p>view</p>
          </span>
        )}
        {isedit && (
          <span className="card-click" onClick={() => handleNavigate(data)}>
            <EditTwoTone />
            <p> edit</p>
          </span>
        )}
        {divison === "History" ? (
          <span
            className={data.status === "COMPLETED" ? "positive" : "negative"}
          >
            {data.status}
          </span>
        ) : (
          <></>
        )}

        {iscancel && (
          <Rejectbutton
            btnname={divison === "Pending" ? "Withdraw" : "Cancel"}
            callback={() => widthdrawcall(data.id as number)}
            positive={false}
          />
        )}
      </section>

      {divison === "History" &&
      timstampconverter(data.endDate + " " + data.endTime) &&
      !data.feedback &&
      data.status === "COMPLETED" &&
      data.hostEmail === userdata.data.email ? (
        <h4 className="feedback-text" onClick={handlefeeback}>
          Feedback <FaArrowRight size={"15px"} />
        </h4>
      ) : (
        ""
      )}
    </div>
  );
};
export default Card;
