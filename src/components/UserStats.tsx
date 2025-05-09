import React from "react";

const UserStats = () => {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 bg-indigo-900/50 p-4 rounded-lg">
      <div className="flex justify-between items-center">
        <span className="text-gray-300">Your Balance...</span>
        <div className="bg-primary/80 text-black py-1 px-4 rounded-md">$60</div>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-gray-300">Your Win Rate...</span>
        <div className="bg-gray-500/60 py-1 px-4 rounded-md">
          2 in 500 (0.4%)
        </div>
      </div>
    </div>
  );
};

export default UserStats;
