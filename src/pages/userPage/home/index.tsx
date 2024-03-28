import "../home/index.scss";
import MeetingInfo from "../../../component/meetingInfo";
import { MeetingData, Response, Userslice } from "../../../type";
import { FaUserCircle } from "react-icons/fa";
import UserMeetingModal from "../../../models/userMeeting";
import { useSelector } from "react-redux";
import apifunction from "../../../utils/apiCall";
import { api } from "../../../constant/apiConstant";
import Calender from "../../../component/calendar";
import { imageConst } from "../../../constant/imageConstant";
import { useEffect, useState } from "react";
import { Carousel } from "antd";
import { Popover } from "antd";
import Nomeeting from "../../../component/noMeetingcard";

const UserHomePage = () => {
  const currentdate = new Date();
  const [date, setDate] = useState(
    currentdate.getFullYear() +
      "-" +
      (currentdate.getMonth() + 1) +
      "-" +
      currentdate.getDate()
  );
  const [meeting, setMeeting] = useState<MeetingData[]>([]);
  const [meetingmodel, setMeetingmodel] = useState(false);
  const [periodOfDay, setPeriodofDay] = useState("");
  const userdata = useSelector((state: any) => state.userReducer as Userslice);
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const slogan = [
    {
      slogan:
        "The great thing in this world is not so much where you stand, as in what direction you are moving. ",
      auther: " Oliver Wendell Holmes",
    },
    {
      slogan: "Either you run the day, or the day runs you.",
      auther: "Jim Rohn",
    },
    {
      slogan:
        " Luck is a dividend of sweat. The more you sweat, the luckier you get.",
      auther: "Ray Kroc",
    },
    {
      slogan:
        "A man who dares to waste one hour of time has not discovered the value of life. ",
      auther: "Charles Darwin",
    },
    {
      slogan:
        " Don’t worry about failures, worry about the chances you miss when you don’t even try. ",
      auther: "Jack Canfield",
    },
    {
      slogan: "Live each day as if your life had just begun.",
      auther: "Johann Wolfgang Von Goethe",
    },
    {
      slogan: " Life is 10% what happens to us and 90% how we react to it.",
      auther: "Dennis P. Kimbro",
    },
  ];

  useEffect(() => {
    fetch();

    // eslint-disable-next-line
  }, [date]);

  const fetch = async () => {
    await loader();
    const meetingdata = await apifunction({
      url: api.baseurl + api.userHomePageurl + date,
      method: "get",
      auth: true,
    }).then((res) => {
      return res as Response;
    });
    setMeeting(meetingdata.data?.data);
  };
  function formatDate(date: Date) {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }
  const newday = new Date(date);
  const formateddate = formatDate(newday);
  const content = (
    <div className="userModal-Info">
      <h2>{userdata.data.name}</h2>
      <h4>{userdata.data.email} </h4>
    </div>
  );
  const loader = () => {
    const currentHour = currentdate.getHours();
    if (currentHour < 12) {
      setPeriodofDay("Morning");
    } else if (currentHour < 18) {
      setPeriodofDay("Afternoon");
    } else if (currentHour < 24) {
      setPeriodofDay("Evening");
    }
  };

  return (
    <div className="homePage-container">
      {meetingmodel && (
        <UserMeetingModal
          onClose={() => {
            setMeetingmodel(false);
          }}
          date={formateddate}
          day={daysOfWeek[newday.getDay()]}
          meetingData={meeting}
        />
      )}
      <section className="row-1">
        <Popover content={content} placement="bottomLeft">
          <FaUserCircle size={40} />
        </Popover>
      </section>
      <section className="row-2">
        <div className="row-2-text">
          <span className="greeting">
          <h1> Good {periodOfDay},</h1>
            <h2>{userdata.data.name}</h2>
          </span>
          <Carousel autoplay={true} autoplaySpeed={5000}>
            {slogan.map((item, index) => {
              return (
                <div key={index}>
                  <span className="slogan">{item.slogan}</span>
                  <footer className="auther"> - {item.auther}</footer>
                </div>
              );
            })}
          </Carousel>
        </div>
        <img src={imageConst.meeringImg} width={"400px"} alt="meeting" className="meeting-img"/>
      </section>
      <section className="row-3">
        <div className="row-3-calendar">
          <Calender
            callback={(e: string) => {
              setDate(e);
            }}
            onclick={true}
      
          />
        </div>
        <div >
          <span className="date-label">
            {monthNames[currentdate.getMonth()] +
              " " +
              (parseInt(date.slice(-2)) < 0
                ? "0" + date.slice(-1)
                : date.slice(-2)) +
              ","}
              <span className="myday">{daysOfWeek[newday.getDay()]}</span>
          </span>
          <div className={meeting.length===0?"meeting-list empty-meeting-list":"meeting-list"}>
          {meeting.length === 0 ? (
            <Nomeeting message="No meeting on this day"/>
          ) : (
            meeting.slice(0, 3).map((item, index) => {
              return (
                <MeetingInfo
                  meeting={item.meetingCategory}
                  host={item.hostName}
                  startTiming={item.startTime}
                  endTiming={item.endTime}
                  room={item.roomName}
                  name={item.meetingName}
                  key={index}
                  shade={true}
                />
              );
            })
          )}</div>
          {meeting.length > 3 ? (
            <span
              onClick={() => {
                setMeetingmodel(true);
              }}
              className="view-more"
            >
              View more meetings.....
            </span>
          ) : (
            <></>
          )}
        </div>
      </section>
    </div>
  );
};

export default UserHomePage;
