"use client";

import {
  setIsBuyTicketModalOpen,
  setIsConnectModalOpen,
} from "../features/general";
import { useAppDispatch } from "../store/hooks";
import React from "react";
import { useAccount } from "graz";
import { useDraft } from "../hooks/useDraft";

const HeroSection = () => {
  const dispatch = useAppDispatch();
  const { isConnected } = useAccount();
  const { numberOfTicketsSold } = useDraft();
  const isSoldOut = numberOfTicketsSold?.tickets_remaining === "0"; // Assuming 1M is max tickets

  const handleOpenModal = () => {
    if (isSoldOut) return;
    if (isConnected) {
      dispatch(setIsBuyTicketModalOpen(true));
    } else {
      dispatch(setIsConnectModalOpen(true));
    }
  };

  return (
    <div className="flex flex-col items-center mb-8 w-full">
      <h1 className="text-3xl font-bold mb-1">
        Win up to <span className="text-shadow-xs text-primary">$600</span>
      </h1>
      <p className="text-md mb-4 font-semibold">
        <span className="text-primary">
          {numberOfTicketsSold?.tickets_remaining || 0}
        </span>{" "}
        Tickets left <span className="mx-2">|</span>{" "}
        <span className="text-secondary">
          {numberOfTicketsSold?.tickets_sold || 0}
        </span>{" "}
        Tickets Sold
      </p>
      <button
        onClick={handleOpenModal}
        disabled={isSoldOut}
        className={`block animate-background bg-gradient-to-r from-secondary via-primary to-[#f6d447] bg-[length:_400%_400%] p-[1px] [animation-duration:_6s] font-medium rounded-md flex items-center gap-2 mb-8 ${
          isSoldOut ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        <a
          href="#"
          className={`block rounded-md bg-[#171b5e]/80 px-10 py-4 text-lg font-medium text-white ${
            isSoldOut ? "hover:bg-[#171b5e]/80" : "hover:bg-[#171b5e]/70"
          }`}
        >
          {isSoldOut ? "Tickets Sold Out 🎫" : "BUY Ticket to WIN 🎉"}
        </a>
      </button>
    </div>
  );
};

export default HeroSection;
