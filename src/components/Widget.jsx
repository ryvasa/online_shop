import React from "react";

const Widget = () => {
  return (
    <div className="py-2 pl-2 flex-1">
      <div className="stats shadow-lg mr-4  mb-4 bg-blue-700  text-white">
        <div className="stat ">
          <div className="stat-title text-white font-semibold">
            Active Users
          </div>
          <div className="stat-value text-white">89,400</div>
          <div className="stat-desc text-white font-medium">
            21% more than last month
          </div>
        </div>
      </div>
      <div className="stats shadow-lg mr-4  mb-4 bg-purple-500  text-white">
        <div className="stat">
          <div className="stat-title text-white font-semibold">Orders</div>
          <div className="stat-value text-white">89,400</div>
          <div className="stat-desc text-white font-medium">
            21% more than last month
          </div>
        </div>
      </div>
      <div className="stats shadow-lg mr-4  mb-4 bg-gray-400  text-white">
        <div className="stat">
          <div className="stat-title text-white font-semibold">Sold</div>
          <div className="stat-value text-white">89,400</div>
          <div className="stat-desc text-white font-medium">
            21% more than last month
          </div>
        </div>
      </div>
    </div>
  );
};

export default Widget;
