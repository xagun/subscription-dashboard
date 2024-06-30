import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const ActiveInactiveUsersChart = ({ data }) => {
  const activeCounts = { active: 0, inactive: 0 };

  data.forEach((user) => {
    activeCounts[user.active === "1" ? "active" : "inactive"] += 1;
  });

  return (
    <div className="pie-chart-container">
      <div className="chart-area">
        <Pie
          data={{
            labels: ["Active", "Inactive"],
            datasets: [
              {
                label: "User count",
                data: [activeCounts.active, activeCounts.inactive],
                backgroundColor: [
                  "rgba(75, 192, 192, 0.2)",
                  "rgba(255, 99, 132, 0.2)",
                ],
                borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)"],
                borderWidth: 1,
              },
            ],
          }}
        />
      </div>
    </div>
  );
};

export default ActiveInactiveUsersChart;
