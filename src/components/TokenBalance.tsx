"use client";

import { useSelector } from "react-redux";
import { RootState } from "../store/store";

interface TokenBalanceProps {
  ticketBalance: number;
  coreumBalance: number;
}

const TokenBalance = ({
  ticketBalance = 2,
  coreumBalance = 1000,
}: TokenBalanceProps) => {
  const { base, quote } = useSelector(
    (state: RootState) => state.dex.tokenPair
  );

  // Map balances to symbols
  const balances: Record<string, number> = {
    TICKET: ticketBalance,
    COREUM: coreumBalance,
  };

  return (
    <div className="flex justify-between bg-indigo-900/50 p-4 rounded-lg">
      {/* Base token (highlighted, always left) */}
      <div className="flex flex-col">
        <span className="text-white font-semibold text-font">
          {base.symbol} balance
        </span>
        <span className="text-primary text-2xl font-bold">
          {balances[base.symbol]}
        </span>
      </div>
      {/* Quote token (dimmed, always right) */}
      <div className="flex flex-col items-end">
        <span className="text-white/60 font-semibold">
          {quote.symbol} Balance
        </span>
        <span className="text-white/60 text-2xl">{balances[quote.symbol]}</span>
      </div>
    </div>
  );
};

export default TokenBalance;
