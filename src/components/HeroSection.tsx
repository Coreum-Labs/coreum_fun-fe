"use client";

import { setIsBuyTicketModalOpen } from "@/features/general";
import { useAppDispatch } from "@/store/hooks";
import React from "react";

const HeroSection = () => {
  const dispatch = useAppDispatch();

  const handleOpenModal = () => {
    dispatch(setIsBuyTicketModalOpen(true));
  };

  return (
    <div className="flex flex-col items-center mb-8 w-full">
      <h1 className="text-3xl font-bold mb-1">
        Win up to <span className="text-primary">$600</span>
      </h1>
      <p className="text-md mb-4 font-semibold">
        <span className="text-primary">100</span> Ticket left
      </p>
      <button
        onClick={handleOpenModal}
        className="bg-primary hover:bg-primary/80 text-black font-medium py-3 px-8 rounded-md flex items-center gap-2 mb-8"
      >
        BUY Ticket to WIN 🎉
      </button>
    </div>
  );
};

export default HeroSection;
