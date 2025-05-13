import React from "react";

const StatsCards = () => {
  return (
    <div className="w-full mb-3">
      {/* Desktop View */}
      <div className="hidden md:grid grid-cols-3 gap-3">
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

      {/* Mobile View */}
      <div className="md:hidden grid grid-cols-2 gap-2">
        <div className="bg-indigo-900/50 p-3 rounded-lg flex flex-col items-center">
          <h3 className="text-gray-300 mb-1 text-sm">Total deposited</h3>
          <p className="text-primary text-lg font-medium mb-1">$16,000</p>
          <p className="text-xs text-gray-400">100,000 $COREUM</p>
        </div>
        <div className="bg-indigo-900/50 p-3 rounded-lg flex flex-col items-center">
          <h3 className="text-gray-300 mb-1 text-sm">Win Chance</h3>
          <p className="text-primary text-lg font-medium mb-1">
            0.2% per ticket
          </p>
          <button className="text-xs text-blue-400">Learn More</button>
        </div>
        <div className="bg-indigo-900/50 p-3 rounded-lg flex flex-col items-center col-span-2">
          <h3 className="text-gray-300 mb-1 text-sm">Yield Source</h3>
          <p className="text-primary text-lg font-medium mb-1">Coreum Labs</p>
          <button className="text-xs text-blue-400">View on Explorer</button>
        </div>
      </div>
    </div>
  );
};

export default StatsCards;
