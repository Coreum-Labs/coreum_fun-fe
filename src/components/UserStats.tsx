"use client";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { COREUM_TOKEN_TESTNET, TICKET_TOKEN_TESTNET } from "@/constants";
import { selectFormattedBalanceByDenom } from "../features/balances";

const UserStats = () => {
  const ticketBalance = useSelector(
    selectFormattedBalanceByDenom(TICKET_TOKEN_TESTNET.denom)
  );
  const coreumBalance = useSelector(
    selectFormattedBalanceByDenom(COREUM_TOKEN_TESTNET.denom)
  );

  return (
    <div className="w-full flex flex-col gap-4 mb-6 bg-indigo-900/50 p-4 rounded-lg">
      <div className="flex justify-between items-center">
        <span className="text-gray-300 font-semibold">Your Balance...</span>
        <div className="flex gap-2">
          <div className="border-2 border-primary/40 text-primary font-semibold py-1 px-4 rounded-full">
            ${(parseFloat(coreumBalance) * 0.85).toFixed(2)}
          </div>
          <div className="border-2 border-secondary/40 text-secondary font-semibold py-1 px-4 rounded-full">
            {ticketBalance} $TICKET
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-gray-300 font-semibold">Your Win Rate...</span>
        <div className="border-2 border-primary/40 py-1 px-4 rounded-full text-primary font-semibold">
          2 in 500 (0.4%)
        </div>
      </div>
    </div>
  );
};

export default UserStats;
