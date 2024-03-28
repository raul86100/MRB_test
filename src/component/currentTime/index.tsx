import { useState, useEffect } from 'react';
import "./index.scss";

const DateAndTime= () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {

      setCurrentDateTime(new Date());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const formattedDateTime = `${currentDateTime.toLocaleDateString(undefined, {
    month: 'long',
    day: 'numeric',
  })} | ${currentDateTime.toLocaleTimeString(undefined, {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  })}`;
  const currentDay = currentDateTime.toLocaleDateString(undefined, { weekday: 'long' });
return (
    <div className='time'>
      <p className='currentTime'>{formattedDateTime}</p>
      <p className='currentDay'> {currentDay}</p>
    </div>
  );
};

export default DateAndTime;
