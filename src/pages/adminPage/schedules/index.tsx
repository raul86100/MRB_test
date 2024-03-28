import { useEffect, useState } from "react";
import Schedulers from "../../../component/schedular";
import Spinloading from '../../../models/spinLoading';
import apifunction from "../../../utils/apiCall";
import { api } from "../../../constant/apiConstant";
import { Response } from "../../../type";
import { useNavigate } from "react-router-dom";

const Adminschulder = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [meeting, setMeeting] = useState([]);
  const[spinner,setspinner]=useState<boolean>(true);
  const navigate = useNavigate();

  const eventHandler = async () => {
    const meeting = await apifunction({
      url: api.baseurl + api.adminScheduler + `${year}`,
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

export default Adminschulder;
