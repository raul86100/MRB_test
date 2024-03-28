import { useEffect, useState } from "react";
import "./index.scss";
import { DatePicker, Pagination } from "antd";
import dayjs, { Dayjs } from "dayjs";
import RequestAdmin from "../../../component/adminRequests";
import apifunction from "../../../utils/apiCall";
import { api } from "../../../constant/apiConstant";
import { ActivityCardentity, Response } from "../../../type";
import Spinloading from "../../../models/spinLoading";
import { Dateformatter } from "../../../utils/function";
import Model from "../../../models/confirmationPopup";
import RejectPopUp from "../../../models/rejectPopup";
const Request = () => {
  const dateFormat = "DD/MM/YYYY";
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());
  const [currentpage, setCurrentpage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [popup, setPopup] = useState(false);
  const [rejectPopup, setRejectPopup] = useState(false);
  const [requestData, setRequestData] = useState<ActivityCardentity[]>([]);
  const [date, setDate] = useState("");
  const [status, setStatus] = useState({ visiblity: false, message: "" });
  const [rejectid, setRejectid] = useState<number>();

  const formatCurrentDate = (date: Dayjs | null) => {
    if (!date) return "";
    return date.format("dddd, MMMM D");
  };
  const onChange = (dateString: any | string[]) => {
    setCurrentpage(1);
    if (dateString !== null) {
      setSelectedDate(dayjs(dateString.$d));
      setDate(Dateformatter(dateString.$d, false));
    } else {
      setSelectedDate(dayjs(new Date()));
      setDate("");
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await apifunction({
      url: api.baseurl + api.requestPagedata,
      method: "get",
      auth: true,
    }).then((res) => {
      return res as Response;
    });
    if (response.status === 200) {
      await setRequestData(
        response.data?.data === null ? [] : response.data?.data
      );
      await setLoading(false);
    }
  };
  const itemsPerpage = 7;
  const indexOfLastItem = currentpage * itemsPerpage;
  const indexOfFirstItem = indexOfLastItem - itemsPerpage;
  const filterdata = requestData.filter((item) => {
    if (date.length > 0 && date !== "01-01-1970") {
      return item.startDate === date;
    } else {
      return item;
    }
  });

  const getAccept = async (id: number) => {
    const response = await apifunction({
      url: `${api.baseurl}${api.requestAccepturl}${id}`,
      method: "put",
      auth: true,
    }).then((res) => {
      return res as Response;
    });
    // if (
    //   response.status === 200 &&
    //   response.data?.message === "Meeting is Already Present in this Timing"
    // ) {
    //   await setStatus({
    //     visiblity: false,
    //     message: response.data?.message as string,
    //   });
    // } else 
    if (response.status === 200) {
       setStatus({
        visiblity: true,
        message: response.data?.message as string,
      });
    }
    else {
       setStatus({
        visiblity: false,
        message: response.data?.message as string,
      });
    }
    await setPopup(true);
  };

  const getReject = async (id: number, message: string) => {
    await setRejectPopup(false);
    await setLoading(true);
    const response = await apifunction({
      url: api.baseurl + api.requestPageRejectedurl + id,
      method: "put",
      auth: true,
      payload: { reason: message },
    }).then((res) => {
      return res as Response;
    });
    if (response.status === 200) {
      await setStatus({
        visiblity: true,
        message: response.data?.message as string,
      });
    } else {
      await setStatus({
        visiblity: false,
        message: response.data?.message as string,
      });
    }
    await setPopup(true);
  };
  return (
    <>
      <div className="requests-page">
        <div className="requests-header">
          <h2>Request</h2>
          <DatePicker
            onChange={onChange}
            format={dateFormat}
            minDate={dayjs(new Date())}
          />
        </div>
        <div className="day-time">
          <h3>{formatCurrentDate(selectedDate)}</h3>
        </div>
        <section
          className={
            filterdata.length === 0 ? "no-requestdata" : "request-data"
          }
        >
          {loading ? (
            <Spinloading />
          ) : (
            <RequestAdmin
              data={filterdata}
              indexOfFirstItem={indexOfFirstItem}
              indexOfLastItem={indexOfLastItem}
              setLoading={setLoading}
              getAccept={(id: number) => {
                getAccept(id);
              }}
              onReject={async (id: number) => {
                await setRejectid(id);
                await setRejectPopup(true);
              }}
            />
          )}
        </section>
        {filterdata.length > itemsPerpage ? (
          <Pagination
            defaultCurrent={1}
            current={currentpage}
            total={filterdata.length}
            pageSize={itemsPerpage}
            onChange={(event) => setCurrentpage(event)}
            className="anti-pagination"
          />
        ) : (
          <></>
        )}
      </div>

      {popup && (
        <Model
          onclose={async () => {
            await setPopup(false);
            await getData();
          }}
          status={status}
        />
      )}
      <RejectPopUp
        id={rejectid as any as number}
        onclose={() => {
          setRejectPopup(false);
        }}
        onReject={(id: number, message: string) => {
          getReject(id, message);
        }}
        isopen={rejectPopup}
      />
    </>
  );
};

export default Request;
