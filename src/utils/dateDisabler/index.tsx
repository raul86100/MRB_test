import { Dayjs } from "dayjs";

const validateStartTime = (current: Dayjs, date: Dayjs, timerdate: Dayjs) => {
  const currentHour = current.hour();
  const currentMinute = current.minute();

  
  
  if (date && current.isSame(date, "day")) {
    if (timerdate.hour() === currentHour) {
      return {
        disabledHours: () =>
          Array.from(
            {
              length: currentMinute + 10 >= 60 ? currentHour + 1 : currentHour,
            },
            (_, i) => i
          ),
        disabledMinutes: () =>
          Array.from({ length: currentMinute + 10}, (_, i) => i),
      };
    } else {
      if (timerdate.minute() - currentMinute <= 10 && timerdate.hour()===currentHour+1) {
        const differentminutes = currentMinute + 10;
       
        return {
          disabledHours: () => Array.from({ length: currentHour }, (_, i) => i),
          disabledMinutes: () =>
            Array.from({ length: differentminutes>=60?differentminutes % 60:0 }, (_, i) => i),
        };
      } else {
       
        return {
          disabledHours: () => Array.from({ length: currentHour }, (_, i) => i),
          disabledMinutes: () => [],
        };
      }
    }
  } else {
    return {
      disabledHours: () => [],
      disabledMinutes: () => [],
    };
  }
};

const validateEndTime = (startTime: string,pickerdate:Dayjs) => {
  const startHour = parseInt(startTime.split(":")[0]);
  const startMinute = parseInt(startTime.split(":")[1]);

  // Calculate end time based on start time + 30 minutes
  let endHour = startHour;
  let endMinute = startMinute;
  if (endMinute >= 60) {
    endHour += 1;
    endMinute -= 60;
  }

  let disabledHours: number[] = [];
  let disabledMinutes: number[] = [];

  // If the current time is after the calculated end time

  disabledHours.push(...Array.from({ length: endHour }, (_, i) => i));
  if(startHour!==pickerdate.hour() &&  startHour<pickerdate.hour()){
    disabledMinutes=[];
  }else{
    disabledMinutes.push(...Array.from({ length: endMinute }, (_, i) => i));
  }

  return {
    disabledHours: () => disabledHours,
    disabledMinutes: () => disabledMinutes,
  };
};

export { validateStartTime, validateEndTime };