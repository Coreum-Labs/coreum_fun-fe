"use client";

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import Image from "next/image";
import { selectFormattedBalanceByDenom } from "../features/balances";
import ReviewDexTxModal from "./ReviewDexTxModal";
import { useCreateOrder } from "@/hooks/useCreateOrder";
import { useAppDispatch } from "@/store/hooks";
import { setIsTxExecuting } from "@/features/general";

const TradingPanel = () => {
  const { base, quote } = useSelector(
    (state: RootState) => state.dex.tokenPair
  );
  const dispatch = useAppDispatch();
  const { createOrder } = useCreateOrder();

  const baseBalance = useSelector(selectFormattedBalanceByDenom(base.denom));
  const quoteBalance = useSelector(selectFormattedBalanceByDenom(quote.denom));

  // State for buy/sell and order type
  const [side, setSide] = useState<"buy" | "sell">("buy");
  const [orderType, setOrderType] = useState<"market" | "limit">("market");
  const [percent, setPercent] = useState<number | null>(null);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [timeInForce, setTimeInForce] = useState("Good till Cancel");
  const [execution, setExecution] = useState<"standard" | "passive">(
    "standard"
  );
  const [amount, setAmount] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  // Update amount when percent changes
  useEffect(() => {
    if (percent === null) return;

    if (side === "buy") {
      // For buy, need price to calculate how much base token can be bought
      const quote = parseFloat(quoteBalance);
      const p = percent;
      const priceNum = parseFloat(price);
      if (isNaN(quote) || quote === 0 || isNaN(priceNum) || priceNum === 0) {
        setAmount("");
        return;
      }
      // (quoteBalance * percent / 100) / price
      const maxSpend = (quote * p) / 100;
      const newAmount = maxSpend / priceNum;
      setAmount(newAmount > 0 ? newAmount.toString() : "");
    } else {
      // For sell, just use base balance
      const base = parseFloat(baseBalance);
      const p = percent;
      if (isNaN(base) || base === 0) {
        setAmount("");
        return;
      }
      const newAmount = (base * p) / 100;
      setAmount(newAmount > 0 ? newAmount.toString() : "");
    }
  }, [percent, side, baseBalance, quoteBalance, price]);

  // Calculate total value for limit orders
  const calculateTotal = () => {
    if (!amount || !price) return 0;
    const total = parseFloat(amount) * parseFloat(price);
    return isNaN(total) ? 0 : total;
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
    setPercent(null); // Clear percentage when manually entering amount
  };

  const handleConfirmOrder = async () => {
    try {
      dispatch(setIsTxExecuting(true));
      await createOrder(
        side,
        amount,
        price,
        base.denom,
        quote.denom,
        orderType,
        timeInForce,
        execution
      );
      setIsReviewModalOpen(false);
    } catch (error) {
      console.error("Failed to create order:", error);
      // You might want to show an error message to the user here
    } finally {
      dispatch(setIsTxExecuting(false));
    }
  };

  return (
    <div className="bg-indigo-900/50 p-4 rounded-lg">
      {/* Balances row */}
      <div className="flex justify-between mb-4">
        <div>
          <span className="text-xs text-white/60 mr-2">
            {base.symbol} Available
          </span>
          <span className="text-xs text-white font-mono">{baseBalance}</span>
        </div>
        <div>
          <span className="text-xs text-white/60 mr-2">
            {quote.symbol} Available
          </span>
          <span className="text-xs text-white font-mono">{quoteBalance}</span>
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
                  ? "bg-secondary/40 text-white"
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
              <div className="relative w-11 h-11 z-10 mr-2">
                <Image src={base.logo} alt={`${base.symbol} Logo`} fill />
              </div>
              <input
                type="number"
                placeholder={`Enter Amount`}
                className="bg-transparent w-full outline-none text-white"
                value={amount}
                onChange={handleAmountChange}
              />
              <span className="ml-2 text-white font-semibold">
                {base.symbol}
              </span>
            </div>
            {/* Price (quote token) */}
            <div className="bg-indigo-800/50 p-2 rounded-md flex items-center mb-2">
              <div className="relative w-11 h-11 z-10 mr-2">
                <Image src={quote.logo} alt={`${quote.symbol} Logo`} fill />
              </div>
              <input
                type="number"
                placeholder={`Enter Price`}
                className="bg-transparent w-full outline-none text-white"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
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
            <div className="relative w-11 h-11 z-10 mr-2">
              <Image src={base.logo} alt={`${base.symbol} Logo`} fill />
            </div>
            <input
              type="number"
              placeholder="Enter Amount"
              className="bg-transparent w-full outline-none text-white"
              value={amount}
              onChange={handleAmountChange}
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
      <button
        className="w-full bg-primary text-black py-2 rounded-md mb-4 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => setIsReviewModalOpen(true)}
        disabled={
          !amount ||
          Number(amount) <= 0 ||
          (orderType === "limit" && (!price || Number(price) <= 0))
        }
      >
        Review {side === "buy" ? "Buy" : "Sell"} Order
      </button>
      <ReviewDexTxModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        onConfirm={handleConfirmOrder}
        side={side}
        amount={amount}
        price={price}
        baseSymbol={base.symbol}
        quoteSymbol={quote.symbol}
      />
      <div className="flex justify-between">
        <p className="text-xs text-gray-400">Total:</p>
        <p className="text-xs">
          {calculateTotal().toFixed(8)} {quote.symbol}
        </p>
      </div>
    </div>
  );
};

export default TradingPanel;
