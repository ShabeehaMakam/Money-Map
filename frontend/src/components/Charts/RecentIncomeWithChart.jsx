import React, { useEffect, useState } from "react";
import CustomPieChart from "../Charts/CustomPieChart";

const COLORS = [
  "#4caf50", // green
  "#2196f3", // blue
  "#ff9800", // orange
  "#f44336", // red
  "#9c27b0", // purple
  "#00bcd4", // cyan
  "#ffc107", // amber
];

const RecentIncomeWithChart = ({ data = [], totalIncome = 0 }) => {
  const [chartData, setChartData] = useState([]);

  const prepareChartData = () => {
    const dataArr = data.map((item) => ({
      name: item?.source || "Unknown",
      amount: Number(item?.amount) || 0,
    }));

    setChartData(dataArr);
  };

  useEffect(() => {
    prepareChartData();
  }, [data]);

  return (
    <div className="card p-4">
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-lg font-semibold">Last 60 Days Income</h5>
      </div>

      <CustomPieChart
        data={chartData}
        label="Total Income"
        totalAmount={`$${totalIncome}`}
        showTextAnchor
        colors={COLORS}
      />
    </div>
  );
};

export default RecentIncomeWithChart;
