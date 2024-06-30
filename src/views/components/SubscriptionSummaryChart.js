import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { isSubscriptionExpired } from "../../lib/utils";

ChartJS.register(ArcElement, Tooltip, Legend);

const SubscriptionSummaryChart = ({ data }) => {
  const activeCounts = { active: 0, expired: 0 };

  data.forEach((subscription) => {
    activeCounts[
      isSubscriptionExpired(subscription.expires_on) ? "expired" : "active"
    ] += 1;
  });

  return (
    <div className="pie-chart-container">
      <div className="chart-area">
        <Pie
          data={{
            labels: ["Active", "Expired"],
            datasets: [
              {
                label: "Count",
                data: [activeCounts.active, activeCounts.expired],
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

export default SubscriptionSummaryChart;
