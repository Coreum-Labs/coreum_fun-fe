import React from "react";

const StatsCards = () => {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
      <div className="bg-indigo-900/50 p-6 rounded-lg flex flex-col items-center">
        <h3 className="text-gray-300 mb-2 text-lg">Total deposited</h3>
        <p className="text-primary text-3xl font-medium mb-2">$16,000</p>
        <p className="text-md text-gray-400">100,000 $COREUM</p>
      </div>
      <div className="bg-indigo-900/50 p-6 rounded-lg flex flex-col items-center">
        <h3 className="text-gray-300 mb-2 text-lg">Win Chance</h3>
        <p className="text-primary text-3xl font-medium mb-2">
          0.2% per ticket
        </p>
        <button className="text-md text-blue-400">Learn More</button>
      </div>
      <div className="bg-indigo-900/50 p-6 rounded-lg flex flex-col items-center">
        <h3 className="text-gray-300 mb-2 text-lg">Yield Source</h3>
        <p className="text-primary text-3xl font-medium mb-2">Coreum Labs</p>
        <button className="text-md text-blue-400">View on Explorer</button>
      </div>
    </div>
  );
};

export default StatsCards;
