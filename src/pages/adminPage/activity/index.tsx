import { useEffect, useRef, useState } from "react";
import ActivityHeader from "../../../component/acitvityHeader";
import "./index.scss";
import { DatePicker, Pagination } from "antd";
import { ActivityCardentity } from "../../../type";
import { Dateformatter } from "../../../utils/function";
import apifunction from "../../../utils/apiCall";
import { api } from "../../../constant/apiConstant";
import DoughnutChart from "../../../component/chart";
import Card from "../../../component/activityCard";
import Spinloading from "../../../models/spinLoading";
import dayjs from "dayjs";
import Nomeeting from "../../../component/noMeetingcard";
import {  notification } from "antd";

interface Histroy {
  meetings: ActivityCardentity[];
  categoryCounts: any;
}
const { RangePicker } = DatePicker;
type NotificationType = "success" | "info" | "warning" | "error";


const AdminActivity = () => {
  const [categories, setCategories] = useState("Upcoming");
  const [Meeting, setMeeting] = useState<ActivityCardentity[]>([]);
  const [clientMeetingCount, setClientMeetingCount] = useState<number>(0);
  const [managerMeetingCount, setManagerMeetingCount] = useState<number>(0);
  const [teamMeetingCount, setTeamMeetingCount] = useState<number>(0);
  const [filterdate, setFilterDate] = useState("");
  const startDate = useRef("");
  const endDate = useRef("");
  const [currentpage, setCurrentpage] = useState(1);
  const itemsPerpage = categories === "History" ? 5 : 6;
  const [loading, setLoading] = useState(false);
  const indexOfLastItem = currentpage * itemsPerpage;
  const indexOfFirstItem = indexOfLastItem - itemsPerpage;
  const tableLable=["Date", "Meeting", "Venue", "Time"];
  const [noti, contextHolder] = notification.useNotification();

  useEffect(() => {
    tabSwitch(categories);
    // eslint-disable-next-line
  }, []);

  const historydata = async () => {
    const dateurl =
      startDate.current.length !== 0
        ? "?startDate=" + startDate.current + "&endDate=" + endDate.current
        : "";
    const history = await apifunction({
      url: api.baseurl + api.adminActivityHistory + dateurl,
      method: "get",
      auth: true,
    }).then((res) => {
      return res.data.data as Histroy;
    });

    setMeeting(history.meetings);
    setClientMeetingCount(history.categoryCounts["Client Meeting"]);
    setManagerMeetingCount(history.categoryCounts["Manager Meeting"]);
    setTeamMeetingCount(history.categoryCounts["Team Meeting"]);
  };
  const upcomingdata = async () => {
    const meetingdata = await apifunction({
      url: api.baseurl + api.adminActivityUpcoming,
      method: "get",
      auth: true,
    }).then((res) => {
      return res.data.data as ActivityCardentity[];
    });
    setMeeting(meetingdata);
  };
  const tabSwitch = async (tab: string) => {
    await setCategories(tab);
    setLoading(true);
    setCurrentpage(1);
    setFilterDate("");
    if (tab === "History") {
      await historydata();
    }
    if (tab === "Upcoming") {
      await upcomingdata();
    }
    setLoading(false);
  };
  const handleRangePicker = async (e: any) => {
    if (!e) {
      startDate.current = "";
      endDate.current = "";
    } else {
      startDate.current = Dateformatter(e[0].$d, true);
      endDate.current = Dateformatter(e[1].$d, true);
    }
    await tabSwitch(categories);
  };
  const filterMeeting = Meeting.filter((item) => {
    if (filterdate.length > 0 && filterdate !== "01-01-1970") {
      return item.startDate === filterdate;
    } else {
      return item;
    }
  });
  const mynotification = async (
    type: NotificationType,
  ) => {
    await noti[type]({
      message:
        (type==="success"?"Successfully":"Failed"),
      description:
        "Meeting has been " +
        (type==="success" ? "Cancelled " : "unable to Cancel"),
    });
    tabSwitch(categories);}
  return (
    <div className="adminActivity">
       {contextHolder}
      <header>
        <ActivityHeader
          label={["Upcoming", "History"]}
          defaultLabel={"Upcoming"}
          callback={(e: string) => {
            tabSwitch(e);
          }}
        />
      </header>

      {categories === "History" ? (
        <div className="history">
          <section className="history-row1">
            <RangePicker
              onChange={(e) => {
                handleRangePicker(e);
              }}
              format={"DD/MM/YYYY"}
            />
          </section>
          {loading ? (
            <Spinloading />
          ) : (
            <section className={filterMeeting.length===0?"history-row2 history-nomeeting":"history-row2"}>
              {filterMeeting.length===0?<Nomeeting message="No meeting on this range" />:
              <>
              <section className="history-chart">
                <DoughnutChart
                  clientMeetingData={clientMeetingCount}
                  teamMeetingData={teamMeetingCount}
                  managerMeetingData={managerMeetingCount}
                />
              </section>
              <section className="table">
                <table>
                  <thead>
                    <tr>
                      {tableLable.map(
                        (item, index) => {
                          return <td key={index}>{item}</td>;
                        }
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {filterMeeting
                      .slice(indexOfFirstItem, indexOfLastItem)
                      .map((item, index) => {
                        return (
                          <tr key={index}>
                            <td>{item.startDate}</td>
                            <td>
                              {item.meetingName}({item.meetingCategory})
                            </td>
                            <td>{item.roomName}</td>
                            <td>{item.startTime}-{item.endTime}</td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
                {itemsPerpage < filterMeeting.length ? (
                  <Pagination
                    defaultCurrent={currentpage}
                    current={currentpage}
                    total={filterMeeting.length}
                    pageSize={itemsPerpage}
                    onChange={(event) => setCurrentpage(event)}
                  />
                ) : (
                  <></>
                )}
              </section></>}
            </section>
          )}
        </div>
      ) : loading ? (
        <Spinloading />
      ) : (
        <div className="upcoming-admin">
          <section className="upcoming-row1">
            <DatePicker
              format={"DD/MM/YYYY"}
              minDate={dayjs(new Date())}
              onChange={(e) => {
                setFilterDate(Dateformatter(e, false));
              }}
            />
          </section>
          <section className={filterMeeting.length===0?"meeting nomeeting":"meeting"}>
            {filterMeeting
              .slice(indexOfFirstItem, indexOfLastItem)
              .map((item, index) => {
                return (
                  <Card
                    isedit={false}
                    isview={true}
                    ishost={true}
                    iscancel={true}
                    callback={(e:string,response:Response) => {
                      if(response.status===200){
                        mynotification("success");
                      }
                      else{
                        mynotification("error");
                      }
                      
                    }}
                    data={item}
                    isLoading={(e: boolean) => {
                      setLoading(e);
                    }}
                    key={index}
                  />
                );
              })}
              {filterMeeting.length===0?<Nomeeting message="No Meeting On this day"/>:<></>}
          </section>
          {itemsPerpage < filterMeeting.length ? (
            <Pagination
              defaultCurrent={currentpage}
              current={currentpage}
              total={filterMeeting.length}
              pageSize={itemsPerpage}
              onChange={(event) => setCurrentpage(event)}
            />
          ) : (
            <></>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminActivity;
