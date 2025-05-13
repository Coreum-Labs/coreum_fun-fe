import React from "react";

const RewardsSection = () => {
  return (
    <div className="w-full mb-8">
      {/* Desktop View */}
      <div className="hidden md:grid grid-cols-2 gap-3">
        <div className="bg-indigo-900/50 p-6 rounded-lg flex flex-col items-center">
          <h3 className="text-gray-300 mb-2 text-lg">Bonus Rewards</h3>
          <p className="text-primary text-3xl font-medium mb-2">$320</p>
          <p className="text-md text-gray-400">2,000 $COREUM</p>
        </div>
        <div className="bg-indigo-900/50 p-6 rounded-lg flex flex-col items-center">
          <h3 className="text-gray-300 mb-2 text-lg">Prize Yield</h3>
          <p className="text-primary text-3xl font-medium mb-2">38%</p>
          <p className="text-md text-gray-400">Network Yield from deposits</p>
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden grid grid-cols-2 gap-3">
        <div className="bg-indigo-900/50 p-4 rounded-lg flex flex-col items-center">
          <h3 className="text-gray-300 mb-1 text-sm">Bonus Rewards</h3>
          <p className="text-primary text-xl font-medium mb-1">$320</p>
          <p className="text-xs text-gray-400">2,000 $COREUM</p>
        </div>
        <div className="bg-indigo-900/50 p-4 rounded-lg flex flex-col items-center">
          <h3 className="text-gray-300 mb-1 text-sm">Prize Yield</h3>
          <p className="text-primary text-xl font-medium mb-1">38%</p>
          <p className="text-xs text-gray-400">Yield on deposits</p>
        </div>
      </div>
    </div>
  );
};

export default RewardsSection;
