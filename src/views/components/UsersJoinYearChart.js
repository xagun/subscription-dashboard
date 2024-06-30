import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const UsersByJoinYearChart = ({ data }) => {
  const joinYearCounts = {};

  data.forEach((user) => {
    const joinYear = new Date(parseInt(user.join_date) * 1000).getFullYear();
    joinYearCounts[joinYear] = (joinYearCounts[joinYear] || 0) + 1;
  });

  const years = Object.keys(joinYearCounts);
  const yearData = Object.values(joinYearCounts);

  return (
    <div>
      <Bar
        data={{
          labels: years,
          datasets: [
            {
              label: "Number of Users",
              data: yearData,
              backgroundColor: "rgba(255, 206, 86, 0.2)",
              borderColor: "rgba(255, 206, 86, 1)",
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

export default UsersByJoinYearChart;
