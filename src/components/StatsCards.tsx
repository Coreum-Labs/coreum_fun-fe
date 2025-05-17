"use client";
import React from "react";
import { useDraft } from "../hooks/useDraft";
import { usePriceData } from "../hooks/usePriceData";

const StatsCards = () => {
  const { draftTVL, numberOfTicketsSold } = useDraft();
  const { coreumPrice } = usePriceData();

  // Calculate total deposited in USD
  const totalDepositedUSD = draftTVL?.tvl
    ? (Number(draftTVL?.tvl) * 10 ** -6 * (coreumPrice || 0)).toFixed(2)
    : "0.00";

  // Calculate win chance per ticket
  const calculateWinChance = () => {
    if (!numberOfTicketsSold?.total_tickets) return "0";
    const totalTickets = parseFloat(numberOfTicketsSold.total_tickets);
    if (totalTickets === 0) return "0";
    return (100 / totalTickets).toFixed(2);
  };

  const winChance = calculateWinChance();

  return (
    <div className="w-full mb-3">
      {/* Desktop View */}
      <div className="hidden md:grid grid-cols-3 gap-3">
        <div className="bg-indigo-900/50 p-6 rounded-lg flex flex-col items-center">
          <h3 className="text-gray-300 mb-2 text-lg">Total deposited</h3>
          <p className="text-primary text-3xl mb-2">${totalDepositedUSD}</p>
          <p className="text-md text-gray-400">
            {Number(draftTVL?.tvl) * 10 ** -6 || "0"} $COREUM
          </p>
        </div>
        <div className="bg-indigo-900/50 p-6 rounded-lg flex flex-col items-center">
          <h3 className="text-gray-300 mb-2 text-lg">Win Chance</h3>
          <p className="text-primary text-3xl mb-2">{winChance}% per ticket</p>
          <button className="text-md text-blue-400">Learn More</button>
        </div>
        <div className="bg-indigo-900/50 p-6 rounded-lg flex flex-col items-center">
          <h3 className="text-gray-300 mb-2 text-lg">Yield Source</h3>
          <p className="text-primary text-3xl  mb-2">Coreum Labs</p>
          <button className="text-md text-blue-400">38% Network Yield</button>
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden grid grid-cols-2 gap-2">
        <div className="bg-indigo-900/50 p-3 rounded-lg flex flex-col items-center">
          <h3 className="text-gray-300 mb-1 text-sm">Total deposited</h3>
          <p className="text-primary text-lg font-medium mb-1">
            ${totalDepositedUSD}
          </p>
          <p className="text-xs text-gray-400">
            {draftTVL?.tvl || "0"} $COREUM
          </p>
        </div>
        <div className="bg-indigo-900/50 p-3 rounded-lg flex flex-col items-center">
          <h3 className="text-gray-300 mb-1 text-sm">Win Chance</h3>
          <p className="text-primary text-lg font-medium mb-1">
            {winChance}% per ticket
          </p>
          <button className="text-xs text-blue-400">Learn More</button>
        </div>
        <div className="bg-indigo-900/50 p-3 rounded-lg flex flex-col items-center col-span-2">
          <h3 className="text-gray-300 mb-1 text-sm">Yield Source</h3>
          <p className="text-primary text-lg font-medium mb-1">Coreum Labs</p>
          <button className="text-xs text-blue-400">38% Network Yield</button>
        </div>
      </div>
    </div>
  );
};

export default StatsCards;
