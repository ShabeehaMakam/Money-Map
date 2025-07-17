import React from "react";
import CustomPieChart from "../Charts/CustomPieChart"; // Make sure this path is correct

const COLORS = ["#875cf5", "#fa2cfs", "#ff6900"]; // Fixed typo and added # to all hex codes

const FinanceOverView = ({ totalIncome, totalExpense, totalBalance }) => {
  const balanceData = [
    { name: "Total Balance", amount: totalBalance },
    { name: "Total Income", amount: totalIncome },
    { name: "Total Expense", amount: totalExpense },
  ];

  return (
    <div className="card">
      <div className="flex items-center justify-between p-4">
        <h5 className="text-lg font-semibold">Finance Overview</h5>
      </div>
      <CustomPieChart
        data={balanceData}
        label="Total Balance"
        totalAmount={`$${totalBalance}`}
        colors={COLORS}
        showTextAnchor
      />
    </div>
  );
};

export default FinanceOverView;
