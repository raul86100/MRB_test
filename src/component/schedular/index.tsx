import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Schdulerentity } from "../../type";
import './index.scss';
type Props = {
  events: Schdulerentity[];
  callback: any;
  year: number;
};
interface Myevent {
  title: string;
  start: Date;
  end: Date;
  color: string;
}

const localizer = momentLocalizer(moment);
const Schedulers = (props: Props) => {
  const { events, callback, year } = props;
  const newevent: Myevent[] = [];
  const current=new Date();

  const handleNavigate = (newDate: any) => {
    const newyear = newDate.toString().split(" ");
    if (year !== parseInt(newyear[3])) {
      callback(parseInt(newyear[3]));
    }
  };
const colors=['darkgray','#3174ad']
  if (events.length > 0) {
    events.forEach((item) => {
      const start = new Date(item.start);
      const end = new Date(item.end);

      const title = `${item.title}(${item.roomName})`;
      let color ='';
      if(end>current){
        color=colors[2];
      }
      else{
        color=colors[0];
      }

      newevent.push({ title: title, start: start, end: end ,color:color});
    });
  }
  const eventStyleGetter = (event:Myevent) => {
    const style = {
      backgroundColor: event.color,
      color: 'white',
      border: '0px',
    };
  
    return {
      style: style
    };
  };

  return (
    <div style={{ height: "100vh", padding: "40px" }}>
      <Calendar
        localizer={localizer}
        onNavigate={handleNavigate}
        events={newevent}
        eventPropGetter={eventStyleGetter}
      />
    </div>
  );
};

export default Schedulers;