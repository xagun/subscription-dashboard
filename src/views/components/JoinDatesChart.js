import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const JoinDatesChart = ({ data }) => {
  const joinDates = data.map(
    (user) => new Date(parseInt(user.join_date) * 1000)
  );
  const sortedJoinDates = joinDates.sort((a, b) => a - b);
  const joinDatesLabels = sortedJoinDates.map(
    (date) => date.toISOString().split("T")[0]
  );

  return (
    <div>
      <Line
        data={{
          labels: joinDatesLabels,
          datasets: [
            {
              label: "Join Dates Over Time",
              data: sortedJoinDates.map((_, index) => index + 1),
              backgroundColor: "rgba(153, 102, 255, 0.2)",
              borderColor: "rgba(153, 102, 255, 1)",
              borderWidth: 1,
            },
          ],
        }}
        options={{
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        }}
      />
    </div>
  );
};

export default JoinDatesChart;
