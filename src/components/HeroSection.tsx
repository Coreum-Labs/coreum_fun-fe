"use client";

import {
  setIsBuyTicketModalOpen,
  setIsConnectModalOpen,
} from "@/features/general";
import { useAppDispatch } from "@/store/hooks";
import React from "react";
import { useAccount } from "graz";

const HeroSection = () => {
  const dispatch = useAppDispatch();
  const { isConnected } = useAccount();

  const handleOpenModal = () => {
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
        <span className="text-primary">100</span> Ticket left
      </p>
      <button
        onClick={handleOpenModal}
        className="block animate-background bg-gradient-to-r from-secondary via-primary to-[#f6d447] bg-[length:_400%_400%] p-[1px] [animation-duration:_6s] font-medium  rounded-md flex items-center gap-2 mb-8"
      >
        <a
          href="#"
          className="block rounded-md bg-[#171b5e]/80 px-10 py-4 text-lg font-medium text-white hover:bg-[#171b5e]/70"
        >
          BUY Ticket to WIN 🎉
        </a>
      </button>
    </div>
  );
};

export default HeroSection;
