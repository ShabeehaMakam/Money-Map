import React from "react";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white shadow-md rounded-lg p-2 border border-gray-300">
        <div className="text-xl font-semibold text-purple-800 mb-1">
          {payload[0].name /* or any label you want to display */}
        </div>
        <p className="text-sm text-gray-600">
          Amount:{" "}
          <span className="text-sm font-medium text-gray-900">
            ${payload[0].value}
          </span>
        </p>
      </div>
    );
  }
  return null;
};

export default CustomTooltip;
