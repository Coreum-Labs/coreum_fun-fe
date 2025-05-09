import React from "react";

const TradingPanel = () => {
  return (
    <div className="bg-indigo-900/50 p-4 rounded-lg">
      <div className="grid grid-cols-2 gap-2 mb-4">
        <div>
          <p className="text-xs text-gray-400">TICKET balance</p>
          <p className="font-medium">2</p>
        </div>
        <div>
          <p className="text-xs text-gray-400">COREUM Balance</p>
          <p className="font-medium">1000</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 mb-4">
        <button className="bg-primary text-black py-2 rounded-md">Buy</button>
        <button className="bg-gray-700 text-white py-2 rounded-md">Sell</button>
      </div>
      <div className="flex justify-between mb-4">
        <button className="bg-transparent hover:bg-indigo-800/50 py-1 px-2 rounded text-sm">
          Market
        </button>
        <button className="bg-transparent hover:bg-indigo-800/50 py-1 px-2 rounded text-sm">
          Limit
        </button>
      </div>
      <div className="mb-4">
        <p className="text-xs text-gray-400 mb-2">Amount</p>
        <div className="flex gap-2 mb-2">
          <button className="bg-gray-700 py-1 px-2 rounded-md text-xs">
            25%
          </button>
          <button className="bg-gray-700 py-1 px-2 rounded-md text-xs">
            50%
          </button>
          <button className="bg-gray-700 py-1 px-2 rounded-md text-xs">
            MAX
          </button>
        </div>
        <div className="bg-indigo-800/50 p-2 rounded-md flex items-center mb-2">
          <div className="flex-shrink-0 w-4 h-4 rounded-full bg-primary mr-2"></div>
          <input
            type="number"
            placeholder="0"
            className="bg-transparent w-full outline-none"
          />
        </div>
        <p className="text-xs text-gray-400">≈ $0.00 USD</p>
      </div>
      <button className="w-full bg-primary text-black py-2 rounded-md mb-4">
        Confirm Order
      </button>
      <div className="flex justify-between">
        <p className="text-xs text-gray-400">Total:</p>
        <p className="text-xs">0.00 COREUM</p>
      </div>
    </div>
  );
};

export default TradingPanel;
