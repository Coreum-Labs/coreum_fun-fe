"use client";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { COREUM_TOKEN_TESTNET, TICKET_TOKEN_TESTNET } from "@/constants";
import { selectFormattedBalanceByDenom } from "../features/balances";

const UserStats = () => {
  return (
    <div className="w-full flex flex-col gap-4 mb-6 bg-indigo-900/50 p-4 rounded-lg">
      {/* Desktop View */}
      <div className="hidden md:flex justify-between items-center">
        <span className="text-gray-300 font-semibold">Your Balance...</span>
        <div className="flex gap-2">
          <div className="border-2 border-primary/40 text-primary font-semibold py-1 px-4 rounded-full">
            ${(1 * 0.85).toFixed(2)}
          </div>
          <div className="border-2 border-secondary/40 text-secondary font-semibold py-1 px-4 rounded-full">
            1 $TICKET
          </div>
        </div>
      </div>
      <div className="hidden md:flex justify-between items-center">
        <span className="text-gray-300 font-semibold">Your Win Rate...</span>
        <div className="border-2 border-primary/40 py-1 px-4 rounded-full text-primary font-semibold">
          2 in 500 (0.4%)
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <span className="text-gray-300 font-semibold text-sm">
            Your Balance...
          </span>
          <div className="flex flex-col gap-2">
            <div className="border-2 border-primary/40 text-primary font-semibold py-1 px-4 rounded-full text-center">
              ${(1 * 0.85).toFixed(2)}
            </div>
            <div className="border-2 border-secondary/40 text-secondary font-semibold py-1 px-4 rounded-full text-center">
              1 $TICKET
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-gray-300 font-semibold text-sm">
            Your Win Rate...
          </span>
          <div className="border-2 border-primary/40 py-1 px-4 rounded-full text-primary font-semibold text-center">
            2 in 500 (0.4%)
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserStats;
