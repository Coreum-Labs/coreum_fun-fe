"use client";
import React, { useState } from "react";
import Holders from "./Holders";
import OpenOrders from "./OpenOrders";
import OrderHistory from "./OrderHistory";

const TradingTabs = () => {
  const [activeTab, setActiveTab] = useState<
    "holders" | "openOrders" | "orderHistory"
  >("holders");

  return (
    <div className="w-full">
      <div className="flex gap-4 mb-4">
        <button
          className={`px-4 py-2 rounded-md font-semibold ${
            activeTab === "holders"
              ? "bg-primary text-black"
              : "bg-indigo-900/50 text-white"
          }`}
          onClick={() => setActiveTab("holders")}
        >
          Holders
        </button>
        <button
          className={`px-4 py-2 rounded-md font-semibold ${
            activeTab === "openOrders"
              ? "bg-primary text-black"
              : "bg-indigo-900/50 text-white"
          }`}
          onClick={() => setActiveTab("openOrders")}
        >
          Open Orders
        </button>
        <button
          className={`px-4 py-2 rounded-md font-semibold ${
            activeTab === "orderHistory"
              ? "bg-primary text-black"
              : "bg-indigo-900/50 text-white"
          }`}
          onClick={() => setActiveTab("orderHistory")}
        >
          Order History
        </button>
      </div>
      <div className="bg-indigo-900/50 rounded-b-lg p-4">
        {activeTab === "holders" && <Holders />}
        {activeTab === "openOrders" && <OpenOrders />}
        {activeTab === "orderHistory" && <OrderHistory />}
      </div>
    </div>
  );
};

export default TradingTabs;
