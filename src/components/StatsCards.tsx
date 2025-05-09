import React from "react";

const StatsCards = () => {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-indigo-900/50 p-6 rounded-lg flex flex-col items-center">
        <h3 className="text-gray-300 mb-2">Total deposited</h3>
        <p className="text-primary text-2xl font-bold mb-1">$16,000</p>
        <p className="text-xs text-gray-400">100,000 COREUM</p>
      </div>
      <div className="bg-indigo-900/50 p-6 rounded-lg flex flex-col items-center">
        <h3 className="text-gray-300 mb-2">Win Chance</h3>
        <p className="text-primary text-2xl font-bold mb-1">0.2% per ticket</p>
        <button className="text-xs text-blue-400">Learn More</button>
      </div>
      <div className="bg-indigo-900/50 p-6 rounded-lg flex flex-col items-center">
        <h3 className="text-gray-300 mb-2">Yield Source</h3>
        <p className="text-primary text-lg font-medium mb-1">
          Coreum Labs Validator
        </p>
        <button className="text-xs text-blue-400">View on Explorer</button>
      </div>
    </div>
  );
};

export default StatsCards;
