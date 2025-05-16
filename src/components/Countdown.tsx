"use client";
import React from "react";
import { useDraft } from "@/hooks/useDraft";

const Countdown = () => {
  const { draftState } = useDraft();

  const getStateMessage = () => {
    switch (draftState?.state) {
      case "TicketSalesOpen":
        return "Ticket sales are open!";
      case "TicketsSoldOutAccumulationInProgress":
        return "Tickets sold out! Accumulating rewards...";
      case "WinnerSelectedUndelegationInProcess":
        return "Winner selected! Undelegation in progress...";
      case "UndelegationCompletedTokensCanBeBurned":
        return "Undelegation completed! Tokens can be burned.";
      case "DrawFinished":
        return "Draw finished!";
      default:
        return "Loading draft state...";
    }
  };

  return (
    <div className="w-full text-center mb-8 text-lg font-medium">
      <p className="text-gray-300">
        Draft Status:{" "}
        <span className="text-secondary">{getStateMessage()}</span>
      </p>
    </div>
  );
};

export default Countdown;
