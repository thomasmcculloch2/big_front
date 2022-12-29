import React from "react";

interface StatusProps {
    label: string;
}

function colors(status: string) {
    if (status == "pending") {
      return "bg-blue-100 text-blue-800";
    } else if (status == "in_progress") {
      return "bg-green-100 text-green-800";
    } else if (status == "done") {
      return "bg-gray-100 text-gray-800";
    }
  }
  
  function status(status: string) {
    if (status == "pending") {
      return "Pending";
    } else if (status == "in_progress") {
      return "In Progress";
    } else if (status == "done") {
      return "Done";
    }
  }

const StatusBadge: React.FC<StatusProps> = ({label}) => {
  return (
    <span
      className={`inline-flex rounded-full ${colors(
        label
      )} px-2 text-xs font-semibold leading-5`}
    >
      {status(label)}
    </span>
  );
};

export default StatusBadge;
