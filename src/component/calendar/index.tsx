import { useState } from "react";
import "./index.scss";
type Props = {
  onclick:boolean;
  callback?:any;
  
};

function Calender(props: Props): JSX.Element {
  const { callback ,onclick} = props;
  const currentDate = new Date();
 const [today,setToday]=useState(currentDate.getDate());
  const currentMonth =currentDate.getMonth();
  const currentYear: number = currentDate.getFullYear();
  const Month: string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "Octember",
    "November",
    "December",
  ];

  // Create a function to generate a calendar for a specific month and year
  function generateCalendar(
    month: number,
    year: number
  ): (number | string)[][] {
    const firstDayOfMonth: Date = new Date(year, month, 1);
    const lastDayOfMonth: Date = new Date(year, month + 1, 0);
    const daysInMonth: number = lastDayOfMonth.getDate();

    const calendar: (number | string)[][] = [];

    // Fill in the days of the week for the header
    const daysOfWeek: string[] = [
      "SUN",
      "MON",
      "TUE",
      "WED",
      "THE",
      "FRI",
      "SAT",
    ];
    calendar.push(daysOfWeek);

    for (let day = 1; day <= daysInMonth; day++) {
      const date: Date = new Date(year, month, day);
      const dayOfWeek: number = date.getDay();
      const weekIndex: number = Math.floor(
        (day + firstDayOfMonth.getDay() - 1) / 7
      );

      if (!calendar[weekIndex + 1]) {
        calendar[weekIndex + 1] = [];
      }

      calendar[weekIndex + 1][dayOfWeek] = day;
    }

    return calendar;
  }

  const calendar: (number | string)[][] = generateCalendar(
    currentMonth,
    currentYear
  );

  // Padding the zero in calendar
  function addToBeginning(
    arr: (number | string)[][],
    valueToAdd: number | string
  ): void {
    const newArray: (number | string)[] = Array.from(
      { length: arr[1].length },
      (_, index) => (arr[1][index] !== undefined ? arr[1][index] : valueToAdd)
    );
    arr[1] = newArray;
  }

  addToBeginning(calendar," ");

  return (
    <div className="callayout">
      <span>{currentDate.getFullYear()}</span>
      <span className="month">{Month[currentMonth]}</span>
      <table>
        <tbody>
          {calendar.map((item, index) => (
            <tr key={index}>
              {item.map((date, ind) => (
                <td
                  key={ind}
                  className={
                    date === today ? "blue" : (date===currentDate.getDate()?"today":"nonblue")
                  }
                  onClick={() => {
                    if (typeof date !== "string" && onclick ) {
                      if (date!== 0)
                      setToday(date);
                        callback(
                          "" +
                            currentYear +
                            "-" +
                            (currentMonth + 1) +
                            "-" +
                            date
                        );
                    }
                  }}
                >
                  {date === 0 ? " " : date}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Calender;
