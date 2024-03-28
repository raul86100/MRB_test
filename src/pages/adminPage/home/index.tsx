import { useState, useEffect } from "react";
import "./index.scss";
import { FaArrowRight, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {imageConst} from '../../../constant/imageConstant'
import DateAndTime from "../../../component/currentTime";
import DoughnutChart from "../../../component/chart";
import { FeedbackType, Response, Userslice } from "../../../type";
import { MeetingType } from "../../../type";
import apifunction from "../../../utils/apiCall";
import { api } from "../../../constant/apiConstant";
import { useSelector } from "react-redux";
import Calender from "../../../component/calendar";
import { Popover } from "antd";
import Spinloading from "../../../models/spinLoading";
const Home = () => {
  const navigate = useNavigate();
  const [feedbackdata, setFeedback] = useState<FeedbackType[]>([]);
  const [meeting, setMeeting] = useState<MeetingType[]>([]);
  const [clientMeetingCount, setClientMeetingCount] = useState<number>(0);
  const [ManagerMeetingCount, setManagerMeetingCount] = useState<number>(0);
  const [teamMeetingCount, setTeamMeetingCount] = useState<number>(0);
  const userdata = useSelector((state: any) => state.userReducer as Userslice);
  const [loading,setLoading]=useState(true);
  useEffect(() => {
    fetchAdmindata();
    // eslint-disable-next-line
  }, []);
  const fetchAdmindata = async() => {
    await feedbackFetchData();
    await meetingFetchData();
    await countFetchData();
    await setLoading(false);
  };
  const countFetchData = async () => {
    const response = await apifunction({
      url: api.baseurl + api.adminActivityHistory,
      method: "get",
      auth: true,
    }).then((res) => {
      return res as Response;
    });
    if (response.status === 200) {
      setClientMeetingCount(
        response.data?.data.categoryCounts["Client Meeting"]
      );
      setManagerMeetingCount(
        response.data?.data.categoryCounts["Manager Meeting"]
      );
      setTeamMeetingCount(response.data?.data.categoryCounts["Team Meeting"]);
    }
  };
const feedbackFetchData = async () => {
    const response = await apifunction({
      url: api.baseurl + api.adminHomefeedback,
      method: "get",
      auth: true,
    }).then((res) => {
      return res as Response;
    });
    if (response.status === 200) {
      setFeedback(response.data?.data === null ? [] : response.data?.data);
    }
  };
const meetingFetchData = async () => {
    const response = await apifunction({
      url: api.baseurl + api.adminHomeMeetings,
      method: "get",
      auth: true,
    }).then((res) => {
      return res as Response;
    });
    if (response.status === 200) {
      setMeeting(response.data?.data === null ? [] : response.data?.data);
    }
  };
const truncateMessage = (text: string, maxLength: number) => {
    const words = text.split(" ");
    const truncated = words.slice(0, maxLength).join(" ");
    return words.length > maxLength ? `${truncated} ...` : truncated;
  };
  const content = (
    <div className="userModal-Info">
      <h2>{userdata.data.name}</h2>
      <h4>{userdata.data.email} </h4>
    </div>
  );
  const nomeeting = (
    <img
      src={imageConst.nomeetingImg}
      className="meetingImage"
      alt="meetingImage"
      width={"180px"}
    />
  );
  if(loading){
    return (<Spinloading />)
  }
  return (
    <div className="adminHome">
      <section className="header">
        <Popover content={content} placement="bottomLeft">
          <FaUserCircle size={40} className="profile-icon" />
        </Popover>
      </section>
      <div className="wholeBlock">
        <section className="feedbackCard">
          <header className="feedbackCardHeader">
            <span> Feedback</span>{" "}
            <FaArrowRight className='arrowpointer'
              onClick={() => {
                navigate("feedback");
              }}
            />
          </header>

          {feedbackdata.length > 0 ? (
            <section className="listoffeedback">
              {feedbackdata.map((item, index) => (
                <div key={index} className="items">
                  <p>{truncateMessage(item.feedback, 7)}</p>
                  <p>{item.hostName}</p>
                </div>
              ))}
            </section>
          ) : (
            <section className="nomeetingFeedback">
              <img src={imageConst.feedbackImg} alt="feedback" />
              You have no new feedback
            </section>
          )}
        </section>
        <div className="centerBlock">
          <section className="timeCard">
            <DateAndTime />
          </section>
          <div className="activitiesCard">
            <div className="header">
              <span>This Month</span>
              <FaArrowRight className='arrowpointer'
                onClick={() => {
                  navigate("activity");
                }}
              />
            </div>
            <section className="activityBody">
              {clientMeetingCount !== 0 ||
              teamMeetingCount !== 0 ||
              ManagerMeetingCount !== 0 ? (
                <DoughnutChart
                  clientMeetingData={clientMeetingCount}
                  teamMeetingData={teamMeetingCount}
                  managerMeetingData={ManagerMeetingCount}
                />
              ) : (
                <div className="noMeetingContainer">
                  {nomeeting}
                  <p>No meeting on this month</p>
                </div>
              )}
            </section>
          </div>
        </div>
        <section className="rightblock">
          <section className="SchudulerCard">
            <header className="SchulerHeader">
              <span> Scheduler</span>
              <FaArrowRight className='arrowpointer'
                onClick={() => {
                  navigate("schedules");
                }}
              />
            </header>
            <section className="calendar">
              <Calender onclick={false} />
            </section>
          </section>
          <div className="meetingCard">
            <header className="meetingHeader">Upcoming Meeting</header>
            <section className="meeting-container">
              {meeting.length > 0 ? (
                meeting.slice(0, 4).map((meetingItem) => (
                  <p className="meetingItems">
                    {meetingItem.meetingCategory} on {meetingItem.startDate} at{" "}
                    {meetingItem.startTime} - {meetingItem.endTime} Venue:
                    {meetingItem.roomName}
                  </p>
                ))
              ) : (
                <div className="noMeetingContainer">
                  {nomeeting}
                  <p>You have no meetings</p>
                </div>
              )}
            </section>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
