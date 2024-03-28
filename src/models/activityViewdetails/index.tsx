import { useState } from "react";
import { ActivityCardentity } from "../../type";
import { CloseOutlined } from "@ant-design/icons";
import { FaUserCircle } from "react-icons/fa";

import "./index.scss";
import { Modal } from "antd";
type Props = {
  data: ActivityCardentity;
  callback: any;
  isopen: boolean;
};

const Viewcard = (props: Props) => {
  const [mysection, setMysection] = useState("Summary");
  const { data, callback, isopen } = props;
  const section = [
    "Summary",
    "Attendies",
    "Agenda",
    data.reason ? "Reason" : "",
  ];


  return (
    <Modal
      open={isopen}
      footer={null}
      className="viewmorepop"
      onCancel={() => {
        callback();
      }}
      centered
    >
      <section
        className={"inner-layer"}
       
      >
        <header>
          <ul>
            {section.map((item) => {
              return (
                <li
                  key={item}
                  className={
                    mysection === item ? "view-header" : "view-nonheader"
                  }
                  onClick={() => {
                    setMysection(item);
                  }}
                >
                  {item}
                </li>
              );
            })}
          </ul>{" "}
          <CloseOutlined
            onClick={() => {
              callback();
            }}
          />
        </header>

        {mysection === "Summary" ? (
          <div className="summary">
            <label>
              Meeting Name :<span>{data.meetingName}</span>{" "}
            </label>
            <label>
              Host Name :<span>{data.hostName}</span>{" "}
            </label>
            <label>
              Meeting Type :<span>{data.meetingCategory}</span>
            </label>
            <label>
              Date :<span>{data.startDate}</span>
            </label>
            <label>
              Time :
              <span>
                {data.startTime} to {data.endTime}
              </span>
            </label>
            <label>
              Venue :<span>{data.roomName}</span>
            </label>
          </div>
        ) : (
          <></>
        )}

        {mysection === "Attendies" ? (
          <section className="list-of-attendies">
            {" "}
            {data.guestList.map((item, index) => {
              return (
                <span key={index} className="attendy">
                  <FaUserCircle />
                  {item.name}
                </span>
              );
            })}
          </section>
        ) : (
          <></>
        )}
        {mysection === "Agenda" ? (
          <section className="agenda">
            <p
              className="agenda-des"
            >
              {data.description}
            </p>
          </section>
        ) : (
          <></>
        )}
        {mysection === "Reason" ? (
          <section className="agenda">
            <p
              className="agenda-des"
            >
              {data.reason}
            </p>
          </section>
        ) : (
          <></>
        )}
      </section>
    </Modal>
  );
};
export default Viewcard;
