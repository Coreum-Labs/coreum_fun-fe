"use client";

import React, { useState, useCallback, useEffect } from "react";
import { Modal } from "./Modal";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  setIsTxExecuting,
  setIsBurnTicketModalOpen,
} from "../features/general";
import Image from "next/image";
import ticketIcon from "../assets/ticket.webp";
import dollorSign from "../../public/dollar_sign.gif";

import {
  CHAIN_ID,
  COREUM_DOT_FUN_CONTRACT_ADDRESS,
  TICKET_TOKEN_TESTNET,
} from "../constants";
import { useAccount } from "graz";
import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { useDraft } from "../hooks/useDraft";
import { useRefetchBalances } from "../hooks/useBalances";
import { toast } from "sonner";
import { CoreumDotFunClient } from "../ts/CoreumDotFun.client";
import { useEstimateTxGasFee } from "../hooks/useEstimateTxGasFee";
import { Coin } from "@cosmjs/amino";

export const BurnTicketModal: React.FC = () => {
  const { data: account } = useAccount({ chainId: CHAIN_ID });
  const { signingClient } = useEstimateTxGasFee();
  const { userTickets, refetchAll } = useDraft();
  const { refetchBalances } = useRefetchBalances();

  const [burnCount, setBurnCount] = useState<number>(1);
  const dispatch = useAppDispatch();
  const isConnected = useAppSelector((state: any) => state.general.isConnected);
  const isBurnTicketModalOpen = useAppSelector(
    (state) => state.general.isBurnTicketModalOpen
  );
  const [isSuccess, setIsSuccess] = useState(false);
  const [lastBurnCount, setLastBurnCount] = useState<number>(1);
  const [lastTxHash, setLastTxHash] = useState<string>();

  const maxBurnable = Number(userTickets?.tickets || 0);

  useEffect(() => {
    if (burnCount > maxBurnable) setBurnCount(maxBurnable);
    if (burnCount < 1) setBurnCount(1);
  }, [maxBurnable]);

  const handleBurnSelect = (count: number) => {
    setBurnCount(count);
  };

  const handleBurnTickets = useCallback(async () => {
    if (!isConnected) {
      return;
    }
    try {
      dispatch(setIsTxExecuting(true));
      toast.loading("Processing your ticket burn...", {
        id: "burn-tickets",
        icon: React.createElement("img", {
          src: ticketIcon.src,
          alt: "ticket icon",
          style: { width: "20px", height: "20px" },
        }),
      });
      if (!signingClient || !account?.bech32Address) {
        throw new Error("Client or account not initialized");
      }

      const fee = {
        amount: [
          {
            denom: "ucore",
            amount: "0.044647239000471281",
          },
        ],
        gas: "1208774",
      };

      const funds: Coin = {
        denom: TICKET_TOKEN_TESTNET.denom,
        amount: (10 ** 6 * burnCount).toString(),
      };

      const coreumDotFunClient = new CoreumDotFunClient(
        signingClient as unknown as SigningCosmWasmClient,
        account.bech32Address,
        COREUM_DOT_FUN_CONTRACT_ADDRESS
      );

      const result = await coreumDotFunClient.burnTickets(
        {
          numberOfTickets: burnCount.toString(),
        },
        fee,
        account.bech32Address,
        [funds]
      );
      if (result.transactionHash) {
        setLastTxHash(result.transactionHash);
      }
      setLastBurnCount(burnCount);
      toast.success("Tickets burned successfully!", {
        id: "burn-tickets",
        icon: React.createElement("img", {
          src: ticketIcon.src,
          alt: "ticket icon",
          style: { width: "20px", height: "20px" },
        }),
      });
      await Promise.all([refetchAll(), refetchBalances()]);
      setIsSuccess(true);
      handleCloseModal();
    } catch (error) {
      console.error("Failed to burn tickets:", error);
      await Promise.all([refetchAll(), refetchBalances()]);
      toast.error("Failed to burn tickets", {
        id: "burn-tickets",
        description: (error as Error).message,
        icon: React.createElement("img", {
          src: ticketIcon.src,
          alt: "ticket icon",
          style: { width: "20px", height: "20px" },
        }),
      });
    } finally {
      dispatch(setIsTxExecuting(false));
    }
  }, [
    burnCount,
    isConnected,
    dispatch,
    signingClient,
    account,
    refetchAll,
    refetchBalances,
  ]);

  const handleCloseModal = () => {
    dispatch(setIsBurnTicketModalOpen(false));
  };

  return (
    <Modal
      isOpen={isBurnTicketModalOpen}
      title={"BURN TICKETS"}
      onClose={handleCloseModal}
      wrapperClassName="w-[480px] bg-gray-700/90"
    >
      <div className="flex flex-col items-center">
        <div className="mb-6">
          <Image
            src={dollorSign.src}
            alt="Ticket"
            width={120}
            height={120}
            className="mx-auto"
          />
        </div>
        <div className="w-full mb-6">
          <div className="flex items-center mb-2">
            <Image
              src={ticketIcon.src}
              alt="Ticket"
              width={24}
              height={24}
              className="mr-2"
            />
            <label className="text-white">Number of tickets to burn</label>
          </div>
          <div className="grid grid-cols-5 gap-2">
            {Array.from(
              { length: Math.min(5, maxBurnable) },
              (_, i) => i + 1
            ).map((num) => (
              <button
                key={num}
                onClick={() => handleBurnSelect(num)}
                className={`py-2 rounded-lg ${
                  burnCount === num
                    ? "bg-primary text-white"
                    : "bg-indigo-700/50 text-gray-300 hover:bg-indigo-600/80 ease-in-out duration-300"
                }`}
                disabled={num > maxBurnable}
              >
                {num}
              </button>
            ))}
          </div>
          <div className="mt-2 text-sm text-gray-400">
            <p>Tickets Owned: {maxBurnable}</p>
          </div>
        </div>
        <button
          onClick={handleBurnTickets}
          disabled={!isConnected || burnCount < 1 || burnCount > maxBurnable}
          className="w-full py-4 bg-primary/80 hover:bg-primary rounded-lg font-medium text-white transition-colors"
        >
          BURN {burnCount} TICKET{burnCount > 1 ? "S" : ""}
        </button>
      </div>
    </Modal>
  );
};

export default BurnTicketModal;
