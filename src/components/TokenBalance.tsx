import React from "react";

interface TokenBalanceProps {
  ticketBalance: number;
  coreumBalance: number;
}

const TokenBalance = ({
  ticketBalance = 2,
  coreumBalance = 1000,
}: TokenBalanceProps) => {
  return (
    <div className="flex justify-between bg-indigo-900/50 p-4 rounded-lg">
      <div className="flex flex-col">
        <span className="text-primary font-semibold">TICKET balance</span>
        <span className="text-white text-2xl font-bold">{ticketBalance}</span>
      </div>
      <div className="flex flex-col items-end">
        <span className="text-secondary font-semibold">COREUM Balance</span>
        <span className="text-white text-2xl font-bold">{coreumBalance}</span>
      </div>
    </div>
  );
};

export default TokenBalance;
