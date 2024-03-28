import { useState } from "react";
import "./index.scss";
import { ActivityCardentity } from "../../type";
import Viewcard from "../../models/activityViewdetails";
import Nomeeting from "../noMeetingcard";
import { EyeTwoTone } from "@ant-design/icons";

type Props = {
  indexOfLastItem: number;
  indexOfFirstItem: number;
  data: ActivityCardentity[];
  getAccept: (id: number) => void;
  setLoading: (item: boolean) => void;
  onReject: (id: number) => void;
};

const RequestAdmin = (props: Props) => {
  const {
    indexOfFirstItem,
    indexOfLastItem,
    data,
    getAccept,
    setLoading,
    onReject,
  } = props;
  const [view, setView] = useState(false);
  const [carddata, setCarddata] = useState<ActivityCardentity>();
  const headerlabel = ["Meeting", "Venue", "Date", "Time", "View", "Option"];
  return (
    <>
      {data.length > 0 ? (
        <div className="request-table">
          <table>
            <thead>
              <tr>
                {headerlabel.map((item, index) => {
                  return <td key={index}>{item}</td>;
                })}
              </tr>
            </thead>
            <tbody>
              {data
                .slice(indexOfFirstItem, indexOfLastItem)
                .map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        {item.meetingName}({item.meetingCategory})
                      </td>
                      <td>{item.roomName}</td>
                      <td>{item.startDate}</td>
                      <td>
                        {item.startTime}-{item.endTime}
                      </td>
                      <td>
                        <EyeTwoTone
                          onClick={async () => {
                            setCarddata(item);
                            setView(true);
                          }}
                          className="eye-btn"
                          size={25}
                        />
                      </td>
                      <td className="option">
                        <button
                          className="accept-btn"
                          onClick={async () => {
                            await setLoading(true);
                            await getAccept(item.id as number);
                          }}
                        >
                          Accept
                        </button>
                        <button
                          className="reject-btn"
                          onClick={() => onReject(item.id as number)}
                        >
                          Reject
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      ) : (
        <Nomeeting message="No Meeting Found" />
      )}
      {view && (
        <Viewcard
          data={carddata as ActivityCardentity}
          callback={() => setView(false)}
          isopen={view}
        />
      )}
    </>
  );
};

export default RequestAdmin;
