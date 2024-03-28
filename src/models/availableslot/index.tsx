import { Modal } from 'antd';
import { useEffect, useState } from 'react';
import { Blockroomdata,AvailableSlotCardtype,freeSlot } from '../../type';
import {AttendeesModelinbookformpage,Loadingstyle } from '../../style/cssproperties'
import './index.scss';

const AvailableSlot = ({ setOpenSlot, OpenSlot, name,availableSlotdata,loading }: AvailableSlotCardtype) => {

  const [freeSlot, setFreeSlot] = useState<freeSlot[]>([]);
  const officeStartTime = '12:00 am';
  const officeEndTime = '11:59 pm';

function convertTimeToMinutes(time: string): number {
    const [hourStr, minuteStr] = time.split(":");
    const hour = parseInt(hourStr, 10);
    const minute = parseInt(minuteStr, 10);

    if (time.toLowerCase().includes("pm") && hour !== 12) {
        return (hour + 12) * 60 + minute;
    } else if (time.toLowerCase().includes("am") && hour === 12) {
        return minute;
    } else {
        return hour * 60 + minute;
    }
}

function convertMinutesToTime(minutes: number): string {
    const hours = Math.floor(minutes / 60) % 12 || 12;
    const ampm = minutes >= 720 ? "pm" : "am";
    const remainingMinutes = minutes % 60;
    return `${hours.toString().padStart(2, "0")}:${remainingMinutes.toString().padStart(2, "0")} ${ampm}`;
}

function findFreeSlots(startTime: string, endTime: string, meetings: Blockroomdata[]): freeSlot[] {
    const startMinutes = convertTimeToMinutes(startTime);
    const endMinutes = convertTimeToMinutes(endTime);

    meetings.sort((a, b) => convertTimeToMinutes(a.startTime) - convertTimeToMinutes(b.startTime));

    const slots: freeSlot[] = [];
    let currentEndTime = startMinutes;

    for (const meeting of meetings) {
        const meetingStart = convertTimeToMinutes(meeting.startTime);
        const meetingEnd = convertTimeToMinutes(meeting.endTime);

        if (meetingStart > currentEndTime) {
            slots.push({ startTime: convertMinutesToTime(currentEndTime), endTime: convertMinutesToTime(meetingStart), status: "Available" });
        }

        slots.push({ startTime: meeting.startTime, endTime: meeting.endTime, status: `Unavailable|${meeting.meetingName}|${meeting.hostName}` });

        currentEndTime = Math.max(currentEndTime, meetingEnd);
    }

    if (currentEndTime < endMinutes) {
        slots.push({ startTime: convertMinutesToTime(currentEndTime), endTime: convertMinutesToTime(endMinutes), status: "Available" });
    }

    return slots;
}


  useEffect(() => {
    const slots = findFreeSlots(officeStartTime, officeEndTime, availableSlotdata);
    setFreeSlot(slots);
      // eslint-disable-next-line
}, [availableSlotdata]); 

  return (
      <Modal
        footer={null}
        centered
        open={OpenSlot}
        onOk={() => setOpenSlot(false)}
        onCancel={() => setOpenSlot(false)}
        width={800}
      > 
           <div style={loading?Loadingstyle:AttendeesModelinbookformpage}>
            {loading? 
                  <div className='loadingavailable'>
                           <section className='loadingsection'></section>
                     </div>:
            <>
            <h1 className='roomname'>Meeting {name}</h1>
            <table className="Table">
                <thead>
                    <tr>
                        <th>From</th>
                        <th>To</th>
                        <th>Availability</th>
                    </tr>
                </thead>
                <tbody>
                
                    {
                      freeSlot.map((slot,index)=>(
                        <tr key={index} 
                         className={slot.status.startsWith('Unavailable') ? 'unavailable' : 'available'}>
                          <td>{slot.startTime}</td>
                          <td>{slot.endTime}</td>
                          <td>{slot.status}</td>
                        </tr>
                      ))   
                    }
                </tbody>
            </table>
            </>
            }
        </div>
      </Modal>
   
  );
};

export default AvailableSlot;