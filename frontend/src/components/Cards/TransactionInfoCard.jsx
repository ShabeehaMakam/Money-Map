import React from "react";
import { LuUtensils, LuTrendingUp, LuTrendingDown, LuTrash2 } from "react-icons/lu";

const TransactionInfoCard = ({
  title,
  date,
  icon,
  amount,
  type,
  onDelete,
  hideDeleteBtn,
}) => {
  const getAmountStyles = () =>
    type === "income" ? "bg-green-50 text-green-500" : "bg-red-50 text-red-500";

  return (
    <div className="flex-1 flex items-center justify-between p-2 border-b border-gray-200">
      <div className="flex-1 flex items-center gap-4">
        {icon ? (
          <img src={icon} alt={title} className="w-6 h-6" />
        ) : (
          <LuUtensils size={24} className="text-gray-400" />
        )}
        <div>
          <p className="text-sm text-gray-700 font-medium">{title}</p>
          <p className="text-xs text-gray-400 mt-1">{date}</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {!hideDeleteBtn && (
          <button
            className="text-gray-400 hover:text-red-500 opacity-80"
            onClick={onDelete}
            aria-label={`Delete ${title}`}
          >
            <LuTrash2 size={18} />
          </button>
        )}

        <div
          className={`flex items-center gap-2 px-3 py-1.5 rounded ${getAmountStyles()}`}
        >
          <h6 className="text-xs font-medium">
            {type === "income" ? "+" : "-"} ${amount}
          </h6>
          {type === "income" ? (
            <LuTrendingUp className="text-green-500" />
          ) : (
            <LuTrendingDown className="text-red-500" />
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionInfoCard;
