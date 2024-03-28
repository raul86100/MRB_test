import { useEffect, useState } from "react";
import { Dateformatter } from "../../../utils/function";
import dayjs from "dayjs";
import apifunction from "../../../utils/apiCall";
import { api } from "../../../constant/apiConstant";
import { DatePicker } from "antd";
import "./index.scss";
import { FeedbackInfoCard } from "../../../type";
import FeedbackInfo from "../../../component/feedbackInfoCard";
import { FaUserCircle } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { imageConst } from "../../../constant/imageConstant";

const Feedbackpage = () => {
  const [date, setDate] = useState(Dateformatter(dayjs(new Date()), true));
  const [feedback, setFeedback] = useState<FeedbackInfoCard[]>([]);
  const [activeclass, setActiveclass] = useState(0);
  const [activeinfo, setActiveInfo] = useState<FeedbackInfoCard>({
    hostName: "",
    feedback: "",
    rating: 0,
    timestamp: "",
    roomName: "",
  });
  const feebackLength = Array.from({ length: 5 });
  useEffect(() => {
    fetchFeedback(date);
    // eslint-disable-next-line
  }, []);
  const fetchFeedback = async (date: string) => {
    setDate(date);
    const response = await apifunction({
      url: api.baseurl + api.adminFeedback + date,
      method: "get",
      auth: true,
    }).then((res) => {
      return res.data.data as FeedbackInfoCard[];
    });
    await setFeedback(response);
    if (response.length > 0) {
      await setActiveInfo(response[0]);
    }
  };
  const checkRating = (index: number) => {
    if (activeinfo.rating >= index) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <div className="feeback-container">
      <h2>Feedback</h2>
      <div className="main-container">
        <section className="left-container">
          <DatePicker
            onChange={(e: any) => {
              setActiveclass(0);
              fetchFeedback(Dateformatter(e.$d, true));
            }}
            value={dayjs(date)}
            format={"DD/MM/YYYY"}
            allowClear={false}
            className="datepicker"
            maxDate={dayjs()}
          />
          <div className="feedbacks-list">
            <h3>People's Feedback</h3>
            <section className={feedback.length > 0 ?"list-of-feedback":"nofeedback"}>
              {feedback.length > 0 ? (
                feedback.map((item, index) => {
                  return (
                    <FeedbackInfo
                      data={item}
                      key={index}
                      active={activeclass === index ? true : false}
                      callback={(data: FeedbackInfoCard) => {
                        setActiveclass(index);
                        setActiveInfo(data);
                      }}
                    />
                  );
                })
              ) : (
                <h3 className="no-feedback-text">No Feedback</h3>
              )}
            </section>
          </div>
        </section>
        <section
          className={
            feedback.length > 0
              ? "right-container"
              : "right-container new-right-container"
          }
        >
          {feedback.length > 0 ? (
            <>
              <header className="right-header">
                {" "}
                <FaUserCircle size={"80px"} />{" "}
                <section>
                  <h2>{activeinfo.hostName}</h2>
                  {activeinfo.roomName}
                </section>
              </header>
              <p>{activeinfo.feedback}</p>
              <footer>
                {feebackLength.map((_, index) => {
                  return (
                    <FaStar
                      size={30}
                      className={
                        checkRating(index + 1) ? "yellow" : "non-yellow"
                      }
                      key={index}
                    />
                  );
                })}
              </footer>
            </>
          ) : (
            <>
              <img src={imageConst.noDatafound} alt="no-data" />
            </>
          )}
        </section>
      </div>
    </div>
  );
};

export default Feedbackpage;
