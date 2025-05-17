"use client";
import React from "react";
import { useDraft } from "../hooks/useDraft";
import { UpdateIcon } from "@radix-ui/react-icons";
import { usePriceData } from "../hooks/usePriceData";

const RewardsSection = () => {
  const { bonusRewards, accumulatedRewards, refetchAll } = useDraft();
  const { coreumPrice } = usePriceData();

  // Calculate total deposited in USD
  const rewardAmount = bonusRewards?.bonus_rewards
    ? new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(
        Number(bonusRewards?.bonus_rewards) * 10 ** -6 * (coreumPrice || 0)
      )
    : "$0.00";

  // Calculate prize yield in USD
  const prizeYieldUSD = accumulatedRewards?.accumulated_rewards
    ? new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(
        Number(accumulatedRewards?.accumulated_rewards) *
          10 ** -6 *
          (coreumPrice || 0)
      )
    : "$0.00";

  const handleRefresh = () => {
    refetchAll();
  };

  // Format COREUM amount with 2 decimal places for bonus rewards
  const formatBonusAmount = (value: string | undefined) => {
    if (!value) return "0.00";
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(Number(value) * 10 ** -6);
  };

  // Format COREUM amount with 6 decimal places for prize yield
  const formatPrizeAmount = (value: string | undefined) => {
    if (!value) return "0.000000";
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 6,
      maximumFractionDigits: 6,
    }).format(Number(value) * 10 ** -6);
  };

  return (
    <div className="w-full mb-8">
      {/* Desktop View */}
      <div className="hidden md:grid grid-cols-2 gap-3">
        <div className="bg-indigo-900/50 p-6 rounded-lg flex flex-col items-center">
          <h3 className="text-gray-300 mb-2 text-lg">Bonus Rewards</h3>
          <p className="text-primary text-3xl mb-2">{rewardAmount}</p>
          <p className="text-md text-gray-400">
            {formatBonusAmount(bonusRewards?.bonus_rewards)} $COREUM
          </p>
        </div>
        <div className="bg-indigo-900/50 p-6 rounded-lg flex flex-col items-center relative">
          <button
            onClick={handleRefresh}
            className="absolute top-2 right-2 p-1 hover:bg-indigo-800/50 rounded-full transition-colors"
            title="Refresh rewards"
          >
            <UpdateIcon className="w-4 h-4 text-gray-400 hover:text-gray-200" />
          </button>
          <h3 className="text-gray-300 mb-2 text-lg">Prize Yield</h3>
          <p className="text-primary text-3xl mb-2">{prizeYieldUSD}</p>
          <p className="text-md text-gray-400">
            {formatPrizeAmount(accumulatedRewards?.accumulated_rewards)} $COREUM
          </p>
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden grid grid-cols-2 gap-3">
        <div className="bg-indigo-900/50 p-4 rounded-lg flex flex-col items-center">
          <h3 className="text-gray-300 mb-1 text-sm">Bonus Rewards</h3>
          <p className="text-primary text-xl font-medium mb-1">
            {rewardAmount}
          </p>
          <p className="text-xs text-gray-400">
            {formatBonusAmount(bonusRewards?.bonus_rewards)} $COREUM
          </p>
        </div>
        <div className="bg-indigo-900/50 p-4 rounded-lg flex flex-col items-center relative">
          <button
            onClick={handleRefresh}
            className="absolute top-1 right-1 p-1 hover:bg-indigo-800/50 rounded-full transition-colors"
            title="Refresh rewards"
          >
            <UpdateIcon className="w-3 h-3 text-gray-400 hover:text-gray-200" />
          </button>
          <h3 className="text-gray-300 mb-1 text-sm">Prize Yield</h3>
          <p className="text-primary text-xl font-medium mb-1">
            {prizeYieldUSD}
          </p>
          <p className="text-xs text-gray-400">
            {formatPrizeAmount(accumulatedRewards?.accumulated_rewards)} $COREUM
          </p>
        </div>
      </div>
    </div>
  );
};

export default RewardsSection;
