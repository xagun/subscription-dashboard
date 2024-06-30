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

const UsersByPlanChart = ({ data }) => {
  const planCounts = {};

  data.forEach((user) => {
    planCounts[user.package] = (planCounts[user.package] || 0) + 1;
  });

  const plans = Object.keys(planCounts);
  const planData = Object.values(planCounts);

  return (
    <div>
      <Bar
        data={{
          labels: plans,
          datasets: [
            {
              label: "Number of Users",
              data: planData,
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
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

export default UsersByPlanChart;
