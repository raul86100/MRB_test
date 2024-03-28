import  { Dayjs } from "dayjs";

export const formatDate = (date: Dayjs | null) => {
  if (!date) return "";
  return date.format("MMMM D, ");
};

export const formatDay = (date: Dayjs | null) => {
  if (!date) return "";
  return date.format(" dddd");
};

export const formatTime = (time: string) => {
  const [hours, minutes] = time.split(':');
  let period: string = 'AM';
  let formattedHours: number = parseInt(hours, 10);
  if (formattedHours >= 12) {
    period = 'PM';
    if (formattedHours > 12) {
      formattedHours -= 12;
    }
  }

  const formattedHoursString: string = formattedHours.toString().padStart(2, '0');
  const formattedMinutes: string = minutes.padStart(2, '0'); 
  return `${formattedHoursString}:${formattedMinutes} ${period}`;
}

export const formatDateToISO = (date: Dayjs): string => {
  return date.format('YYYY-MM-DD');
};

export const formatTimeTo24Hours = (time: Dayjs): string => {
  return time.format('HH:mm:ss');
};

export const Dateformatter = (dateString: any,isreverse:boolean) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  const formattedDate = (isreverse?`${year}-${month}-${day}`:`${day}-${month}-${year}`);
 return formattedDate

};