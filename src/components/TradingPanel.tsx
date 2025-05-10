"use client";

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const TradingPanel = () => {
  const { base, quote } = useSelector(
    (state: RootState) => state.general.tokenPair
  );

  // State for buy/sell and order type
  const [side, setSide] = useState<"buy" | "sell">("buy");
  const [orderType, setOrderType] = useState<"market" | "limit">("market");
  const [percent, setPercent] = useState<number | null>(null);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [timeInForce, setTimeInForce] = useState("Good till Cancel");
  const [execution, setExecution] = useState<"standard" | "passive">(
    "standard"
  );

  // Placeholder balances (replace with real balances as needed)
  const balances: Record<string, number> = {
    [base.symbol]: 0.0004,
    [quote.symbol]: 0,
  };

  return (
    <div className="bg-indigo-900/50 p-4 rounded-lg">
      {/* Balances row */}
      <div className="flex justify-between mb-4">
        <div>
          <span className="text-xs text-white/60 mr-2">
            {base.symbol} Available
          </span>
          <span className="text-xs text-white font-mono">
            {balances[base.symbol]}
          </span>
        </div>
        <div>
          <span className="text-xs text-white/60 mr-2">
            {quote.symbol} Available
          </span>
          <span className="text-xs text-white font-mono">
            {balances[quote.symbol]}
          </span>
        </div>
      </div>
      {/* Buy/Sell buttons */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        <button
          className={`py-2 rounded-md font-semibold ${
            side === "buy"
              ? "bg-primary text-black"
              : "bg-primary/40 text-white"
          }`}
          onClick={() => setSide("buy")}
        >
          Buy
        </button>
        <button
          className={`py-2 rounded-md font-semibold ${
            side === "sell"
              ? "bg-secondary text-black"
              : "bg-secondary/40 text-white"
          }`}
          onClick={() => setSide("sell")}
        >
          Sell
        </button>
      </div>
      {/* Market/Limit buttons */}
      <div className="flex justify-between mb-4">
        <button
          className={`py-1 px-2 rounded text-sm ${
            orderType === "market"
              ? "bg-primary text-black"
              : "bg-transparent hover:bg-indigo-800/50 text-white"
          }`}
          onClick={() => setOrderType("market")}
        >
          Market
        </button>
        <button
          className={`py-1 px-2 rounded text-sm ${
            orderType === "limit"
              ? "bg-primary text-black"
              : "bg-transparent hover:bg-indigo-800/50 text-white"
          }`}
          onClick={() => setOrderType("limit")}
        >
          Limit
        </button>
      </div>
      <div className="mb-4">
        <p className="text-xs text-gray-400 mb-2">Amount</p>
        <div className="flex gap-2 mb-2">
          {[25, 50, 100].map((p) => (
            <button
              key={p}
              className={`py-1 px-2 rounded-md text-xs font-semibold ${
                percent === p
                  ? "bg-secondary/40 text-whiteee"
                  : "border-secondary/50 border text-white"
              }`}
              onClick={() => setPercent(p)}
            >
              {p === 100 ? "MAX" : `${p}%`}
            </button>
          ))}
        </div>
        {/* Limit price input if limit order */}
        {orderType === "limit" && (
          <>
            {/* Amount (base token) */}
            <div className="bg-indigo-800/50 p-2 rounded-md flex items-center mb-2">
              <input
                type="number"
                placeholder={`Enter Amount`}
                className="bg-transparent w-full outline-none text-white"
              />
              <span className="ml-2 text-white font-semibold">
                {base.symbol}
              </span>
            </div>
            {/* Price (quote token) */}
            <div className="bg-indigo-800/50 p-2 rounded-md flex items-center mb-2">
              <input
                type="number"
                placeholder={`Enter Price`}
                className="bg-transparent w-full outline-none text-white"
              />
              <span className="ml-2 text-white font-semibold">
                {quote.symbol}
              </span>
            </div>
          </>
        )}
        {/* Market order: only amount input for base token */}
        {orderType === "market" && (
          <div className="bg-indigo-800/50 p-2 rounded-md flex items-center mb-2">
            <div className="flex-shrink-0 w-4 h-4 rounded-full bg-primary mr-2"></div>
            <input
              type="number"
              placeholder="Enter Amount"
              className="bg-transparent w-full outline-none text-white"
            />
            <span className="ml-2 text-white font-semibold">{base.symbol}</span>
          </div>
        )}
        <p className="text-xs text-gray-400">≈ $0.00 USD</p>
      </div>
      {/* Advanced Settings for Limit Orders */}
      {orderType === "limit" && (
        <div className="mb-4">
          <button
            className="flex items-center text-white/80 font-semibold mb-2 focus:outline-none"
            onClick={() => setShowAdvanced((v) => !v)}
            aria-expanded={showAdvanced}
          >
            Advanced Settings
            <span
              className={`ml-2 transition-transform ${
                showAdvanced ? "rotate-180" : ""
              }`}
            >
              ▼
            </span>
          </button>
          {showAdvanced && (
            <div className="space-y-4">
              {/* Time in Force Policy */}
              <div>
                <label className="block text-xs text-white/60 mb-1">
                  Time in Force Policy
                </label>
                <select
                  className="w-full bg-indigo-800/50 text-white p-2 rounded-md"
                  value={timeInForce}
                  onChange={(e) => setTimeInForce(e.target.value)}
                >
                  <option>Good till Cancel</option>
                  <option>Immediate or Cancel</option>
                  <option>Fill or Kill</option>
                </select>
              </div>
              {/* Execution */}
              <div>
                <label className="block text-xs text-white/60 mb-1">
                  Execution
                </label>
                <div className="flex gap-2">
                  <button
                    className={`flex-1 py-2 rounded-md font-semibold ${
                      execution === "standard"
                        ? "bg-primary text-black"
                        : "bg-gray-700 text-white"
                    }`}
                    onClick={() => setExecution("standard")}
                  >
                    Standard
                  </button>
                  <button
                    className={`flex-1 py-2 rounded-md font-semibold ${
                      execution === "passive"
                        ? "bg-primary text-black"
                        : "bg-gray-700 text-white"
                    }`}
                    onClick={() => setExecution("passive")}
                  >
                    Passive
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      <button className="w-full bg-primary text-black py-2 rounded-md mb-4 font-semibold">
        Review {side === "buy" ? "Buy" : "Sell"} Order
      </button>
      <div className="flex justify-between">
        <p className="text-xs text-gray-400">Total:</p>
        <p className="text-xs">0.00 {quote.symbol}</p>
      </div>
    </div>
  );
};

export default TradingPanel;
