"use client";

import coreum_logo from "../../public/coreum.svg";

import {
  setIsBuyTicketModalOpen,
  setIsConnectModalOpen,
} from "../features/general";
import { useAppDispatch } from "../store/hooks";
import React, { useEffect, useState } from "react";
import { useAccount } from "graz";
import { useDraft } from "../hooks/useDraft";
import { usePriceData } from "../hooks/usePriceData";

const HeroSection = () => {
  const dispatch = useAppDispatch();
  const { isConnected } = useAccount();
  const { numberOfTicketsSold, accumulatedRewards, bonusRewards } = useDraft();
  const { coreumPrice } = usePriceData();
  const isSoldOut = numberOfTicketsSold?.tickets_remaining === "0";

  // Calculate grand prize and USD value (same as StatsCards)
  const grandPrize =
    ((Number(accumulatedRewards?.accumulated_rewards) || 0) +
      (Number(bonusRewards?.bonus_rewards) || 0)) *
    10 ** -6;
  const grandPrizeUSD = grandPrize * (coreumPrice || 0);

  // Animated number state
  const [displayedAmount, setDisplayedAmount] = useState(0);

  useEffect(() => {
    let rafId: number;
    let start = 0;
    const duration = 1200; // ms
    const increment = (grandPrizeUSD || 0) / (duration / 16);

    const animate = () => {
      start += increment;
      if (start < grandPrizeUSD) {
        setDisplayedAmount(Math.floor(start));
        rafId = requestAnimationFrame(animate);
      } else {
        setDisplayedAmount(Math.floor(grandPrizeUSD));
      }
    };

    animate();
    return () => cancelAnimationFrame(rafId);
  }, [grandPrizeUSD]);

  const handleOpenModal = () => {
    if (isSoldOut) return;
    if (isConnected) {
      dispatch(setIsBuyTicketModalOpen(true));
    } else {
      dispatch(setIsConnectModalOpen(true));
    }
  };

  return (
    <section className="relative w-full py-8 sm:py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col items-center space-y-4 sm:space-y-6">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center leading-tight">
            Enter with{" "}
            <span className="inline-flex items-center mx-1.5">
              <img
                src={coreum_logo.src}
                alt="Coreum Logo"
                className="w-6 h-6 sm:w-7 sm:h-7 align-middle"
                style={{ display: "inline-block" }}
              />
            </span>
            to win up to{" "}
            <span
              className="text-primary inline-block"
              style={{
                minWidth: "100px",
                fontVariantNumeric: "tabular-nums",
                fontFamily: "monospace",
              }}
            >
              ${displayedAmount.toLocaleString()}
            </span>
          </h1>

          <p className="text-sm sm:text-base text-gray-300 text-center max-w-xl">
            You can withdraw your full deposit at the end of the Draft
          </p>

          <div className="flex flex-row items-center justify-center gap-3 sm:gap-6 py-2 sm:py-2">
            <div className="flex items-center gap-1.5 sm:gap-1.5">
              <span className="text-primary text-xl sm:text-2xl font-bold">
                {numberOfTicketsSold?.tickets_remaining || 0}
              </span>
              <span className="text-gray-300 text-sm sm:text-base">left</span>
            </div>
            <div className="w-px h-5 sm:h-6 bg-gray-600"></div>
            <div className="flex items-center gap-1.5 sm:gap-1.5">
              <span className="text-secondary text-xl sm:text-2xl font-bold">
                {numberOfTicketsSold?.tickets_sold || 0}
              </span>
              <span className="text-gray-300 text-sm sm:text-base">sold</span>
            </div>
          </div>

          <button
            onClick={handleOpenModal}
            disabled={isSoldOut}
            className={`relative group w-full sm:w-auto min-w-[240px] ${
              isSoldOut ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-secondary via-primary to-[#f6d447] rounded-lg blur-sm group-hover:blur-md transition-all duration-300 animate-background bg-[length:_400%_400%] [animation-duration:_6s]"></div>
            <a
              href="#"
              className={`relative block rounded-lg bg-[#171b5e]/90 px-6 py-3 text-base font-semibold text-white text-center transition-all duration-300 ${
                isSoldOut
                  ? "hover:bg-[#171b5e]/90"
                  : "hover:bg-[#171b5e]/80 hover:scale-[1.02]"
              }`}
            >
              {isSoldOut ? "Tickets Sold Out 🎫" : "BUY Ticket to WIN 🎉"}
            </a>
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
