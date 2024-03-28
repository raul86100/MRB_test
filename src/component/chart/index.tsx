import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import "./index.scss";

interface chartDataTypes {
  clientMeetingData:number;
  teamMeetingData:number;
  managerMeetingData:number;
 
}

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart= (props:chartDataTypes) => {
  const {
    clientMeetingData,
    teamMeetingData,
    managerMeetingData,
   
  } = props;
  const total =
    clientMeetingData + teamMeetingData + managerMeetingData;
  const data = {
    labels: ["Client Meeting", "Manager meeting", "Team meeting"],
    datasets: [
      {
        data: [
          (clientMeetingData / total) * 100,
          (managerMeetingData / total) * 100,
          (teamMeetingData / total) * 100,
        ],
        backgroundColor: ["#963852", "#D26E5D", "#C3B696", "#D6D9C1"],
      },
    ],
  };

  const options: any = {
    cutout: "40%",
    plugins: {
      legend: {
        display: false,
      },
    },
  };
  const legend=[
    { colour: "#963852", meetingName: "Client Meeting" },
    { colour: "#D26E5D", meetingName: "Manager Meeting" },
    { colour: "#C3B696", meetingName: "Team Meeting" },
  ]


  return (
    <div className="chart">
      <Doughnut data={data} options={options} />
      <div className="legendContainer">
        {legend.map((item,index) => (
          <div className="legendItem" key={index}>
            <div
              style={{ backgroundColor: item.colour }}
              className="legendColour"
            >
              {" "}
            </div>
            <p>{item.meetingName}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoughnutChart;
