import { useEffect, useState } from "react";
import Schedulers from "../../../component/schedular";
import { api } from "../../../constant/apiConstant";
import apifunction from "../../../utils/apiCall";
import { Response } from "../../../type";
import { useNavigate } from "react-router-dom";
import Spinloading from '../../../models/spinLoading';

const Userschedulers = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const[spinner,setspinner]=useState<boolean>(true);

  const eventHandler = async () => {
    const meeting = await apifunction({
      url: api.baseurl + api.userscheduler + `${year}`,
      method: "get",
      auth: true,
    }).then((res) => {
      return res as Response;
    });
    if (meeting.status === 403) {
      navigate("/");
    } else {
      setMeeting(meeting.data?.data);
    }
    setspinner(false);
  };
  useEffect(() => {
    eventHandler();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [year]);

  const [meeting, setMeeting] = useState([]);
  const navigate = useNavigate();

  return (
    spinner?<Spinloading/>:
    <>
      <Schedulers
        events={meeting ? meeting : []}
        callback={(e: number) => {
          setYear(e);
        }}
        year={year}
      />
    </>
  );
};

export default Userschedulers;
