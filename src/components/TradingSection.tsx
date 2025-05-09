import React from "react";
import Chart from "./Chart";
import TradingPanel from "./TradingPanel";

const TradingSection = () => {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <Chart />
      <TradingPanel />
    </div>
  );
};

export default TradingSection;
