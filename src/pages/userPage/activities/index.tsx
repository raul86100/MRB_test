import { useEffect, useRef, useState } from "react";
import ActivityHeader from "../../../component/acitvityHeader";
import "./index.scss";
import { DatePicker } from "antd";
import locale from "antd/es/date-picker/locale/en_GB";
import dayjs from "dayjs";
import { Input, Space, notification } from "antd";
import Card from "../../../component/activityCard";
import { api } from "../../../constant/apiConstant";
import { Pagination } from "antd";
import { ActivityCardentity, Userslice } from "../../../type";
import Spinloading from "../../../models/spinLoading";
import { useDispatch, useSelector } from "react-redux";
import { Dateformatter } from "../../../utils/function";
import { fetchactivity, updateMeeting } from "../../../store/userActivityslice";
import { AppDispatch, store } from "../../../store/store";
import Nomeeting from "../../../component/noMeetingcard";
import FeedbackModel from "../../../models/feedBack";

const { Search } = Input;
type NotificationType = "success" | "info" | "warning" | "error";

const Activity = () => {
  const [status, setStatus] = useState("Pending");
  const dispatch = useDispatch<AppDispatch>();
  const [search, setSearch] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentpage, setCurrentpage] = useState(1);
  const role = useRef("Attendee");
  const [feetback, setFeedback] = useState({ vibilty: false, meetingId: 0 });
  const userdata = useSelector((state: any) => state.userReducer as Userslice);
  const usermeeting: ActivityCardentity[] = useSelector(
    (state: any) => state.userActivityReducer.data
  );
  const isLoading = useSelector(
    (state: any) => state.userActivityReducer.isLoading as boolean
  );

  const [noti, contextHolder] = notification.useNotification();
  const itemsPerpage = 5;
  const indexOfLastItem = currentpage * itemsPerpage;
  const indexOfFirstItem = indexOfLastItem - itemsPerpage;

  useEffect(() => {
    setCurrentpage(1);
    if (status === "History") {
      completed();
    }
    if (status === "Upcoming") {
      currentmeeting("ACCEPTED");
    }
    if (status === "Pending") {
      role.current = "Host";
      currentmeeting("PENDING");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, role.current]);
  const completed = async () => {
    await dispatch(
      fetchactivity({
        url: api.baseurl + api.userActivitycompleted,
        method: "get",
        auth: true,
      })
    );
    if (role.current === "Host" && role.current.length !== 0) {
      await Filter();
    }
    setLoading(false);
  };
  const mynotification = async (
    type: NotificationType,
    categeroies: string
  ) => {
    noti[type]({
      message:
        "Successfully " +
        (categeroies === "ACCEPTED" ? "Cancelled" : "Withdrawn"),
      description:
        "Your meeting has been " +
        (categeroies === "ACCEPTED" ? "Cancelled " : "Withdrawn") +
        " Successfully",
    });
    if (categeroies === "ACCEPTED") {
      await currentmeeting(categeroies);
    } else {
      await currentmeeting(categeroies);
    }
  };
  const currentmeeting = async (status: string) => {
    await dispatch(
      fetchactivity({
        url: api.baseurl + api.userActivitystatus + status,
        method: "get",
        auth: true,
      })
    );
    if (status === "ACCEPTED") {
      if (role.current === "Host" && role.current.length !== 0) {
        await Filter();
      }
    }
    setLoading(false);
  };
  const Filter = async () => {
    const mydata = await store.getState().userActivityReducer.data;

    const data = await mydata.filter((item) => {
      return item.hostEmail === userdata.data.email;
    });
    await dispatch(updateMeeting(data));
  };
  const dataconverter = (datestring: any) => {
    setDate(Dateformatter(datestring, false));
  };
  const filterdata = usermeeting?.filter((item) => {
      if (date.length > 0 && date !== "01-01-1970") {
        return item.startDate === date;
      } else {
        return item;
      }
    })
    .filter((item) => {
      if (search.length > 0) {
        return (
          item.meetingName.toLowerCase().includes(search.toLowerCase()) ||
          item.hostName.toLowerCase().includes(search.toLowerCase()) ||
          item.meetingCategory.toLowerCase().includes(search.toLowerCase())
        );
      } else {
        return item;
      }
    });

  const handlefilterchange = (e: any) => {
    role.current = e.target.value;
    if (status === "Upcoming") {
      currentmeeting("ACCEPTED");
    }
    if (status === "History") {
      completed();
    }
    if (
      (status === "History" || status === "Upcoming") &&
      role.current === "Host"
    ) {
      Filter();
    }
  };
  return (
    <div className="activitypage">
      {contextHolder}
      <ActivityHeader
        label={["Pending", "Upcoming", "History"]}
        defaultLabel={"Pending"}
        callback={(data: any) => {
          setStatus(data);
          if (status === "Pending") {
            role.current = "Attendee";
          }
        }}
      />
      <header className="activivty-row2">
        <select onChange={handlefilterchange}>
          {status === "Pending" ? (
            <>
              <option>Host</option>
            </>
          ) : (
            <>
              <option>Attendee</option>
              <option>Host</option>
            </>
          )}
        </select>

        <section>
          <DatePicker
            locale={locale}
            format={"DD/MM/YYYY"}
            onChange={(e) => {
              dataconverter(e);
            }}
            minDate={
              status === "Pending" || status === "Upcoming"
                ? dayjs(new Date())
                : dayjs(new Date(2000, 0, 1))
            }
            placement="bottomLeft"
          />
          <Space direction="vertical">
            <Search
              placeholder="search by meeting,host"
              onSearch={(e) => {
                setSearch(e);
                setCurrentpage(1);
              }}
              onChange={async (e) => {
                if (e.target.value.length === 0) {
                  await setCurrentpage(1);
                  setSearch("");
                }
              }}
              size="large"
              enterButton
            />
          </Space>
        </section>
      </header>
      <section
        className={
          filterdata.length === 0
            ? "activity-row3 new-activity-row3"
            : "activity-row3"
        }
      >
        {loading === true || isLoading === true ? (
          <Spinloading />
        ) : (
          <>
            {filterdata.length > 0 ? (
              <>
                {filterdata
                  .slice(indexOfFirstItem, indexOfLastItem)
                  .map((item: ActivityCardentity, index: any) => {
                    return (
                      <Card
                        isedit={status === "Pending" ? true : false}
                        isview={true}
                        data={item}
                        divison={status}
                        iscancel={
                          status === "History" || role.current === "Attendee"
                            ? false
                            : true
                        }
                        ishost={status === "Pending" ? false : true}
                        callback={(e: string) => {
                          e === "reloadPending"
                            ? mynotification("success", "PENDING")
                            : mynotification("success", "ACCEPTED");
                        }}
                        key={index}
                        isLoading={(e: boolean) => {
                          setLoading(e);
                        }}
                        feedback={(e: number) => {
                          setFeedback({ vibilty: true, meetingId: e });
                        }}
                      />
                    );
                  })}
              </>
            ) : (
              <Nomeeting message={"No meeting found"} />
            )}
          </>
        )}{" "}
      </section>
      <Pagination
        defaultCurrent={1}
        current={currentpage}
        total={filterdata.length}
        pageSize={itemsPerpage}
        onChange={(event) => setCurrentpage(event)}
      />
      {feetback.vibilty && (
        <FeedbackModel
          meetingId={feetback.meetingId}
          callback={(bool: boolean) => {
            setFeedback((prevData) => ({
              ...prevData,
              vibilty: false,
            }));
            if (bool) {
              completed();
            }
          }}
          isopen={feetback.vibilty}
        />
      )}
    </div>
  );
};
export default Activity;
