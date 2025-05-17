import React from "react";
import { Modal } from "./Modal";
import { ArrowBottomRightIcon, ArrowTopLeftIcon } from "@radix-ui/react-icons";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

interface ReviewDexTxModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  side: "buy" | "sell";
  amount: string;
  price: string;
  baseSymbol: string;
  quoteSymbol: string;
  estimatedFee?: string;
}

export const ReviewDexTxModal: React.FC<ReviewDexTxModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  side,
  amount,
  price,
  baseSymbol,
  quoteSymbol,
  estimatedFee,
}) => {
  const isTxExecuting = useSelector(
    (state: RootState) => state.general.isTxExecuting
  );
  const total = (parseFloat(amount) * parseFloat(price)).toFixed(8);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex items-center gap-2">
          {side === "buy" ? (
            <ArrowBottomRightIcon className="text-green-400 w-6 h-6" />
          ) : (
            <ArrowTopLeftIcon className="text-red-400 w-6 h-6" />
          )}
          <span>Review {side === "buy" ? "Buy" : "Sell"} Order</span>
        </div>
      }
    >
      <div className="p-4 text-white w-full max-w-md mx-auto">
        <div className="bg-indigo-900/30 rounded-lg p-6 mb-6">
          <p className="text-lg font-medium mb-2">Transaction Summary</p>
          <p className="text-white/80 mb-6">
            You are about to {side === "buy" ? "purchase" : "sell"} a quantity
            of {amount} {baseSymbol} (volume) at a rate of {price} {quoteSymbol}{" "}
            per {baseSymbol}. The total value of this transaction will be{" "}
            {total} {quoteSymbol}.
          </p>
        </div>

        <div className="bg-indigo-900/50 rounded-lg p-6 mb-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-white/70">Trading Pair</span>
              <span className="font-medium">
                {baseSymbol} / {quoteSymbol}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/70">Order Type</span>
              <span
                className={`font-medium ${
                  side === "buy" ? "text-green-400" : "text-red-400"
                }`}
              >
                {side === "buy" ? "Buy" : "Sell"}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/70">Quantity</span>
              <span className="font-medium">
                {amount} {baseSymbol}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/70">Price per {baseSymbol}</span>
              <span className="font-medium">
                {price} {quoteSymbol}
              </span>
            </div>
            <div className="flex justify-between items-center border-t border-white/10 pt-4">
              <span className="text-white/70">Total Value</span>
              <span className="font-medium text-lg">
                {total} {quoteSymbol}
              </span>
            </div>
            {estimatedFee && (
              <div className="flex justify-between items-center border-t border-white/10 pt-4">
                <span className="text-white/70">Estimated Fee</span>
                <span className="font-medium">
                  {estimatedFee} {quoteSymbol}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-4 justify-end">
          <button
            className="px-6 py-3 rounded-lg bg-white/10 text-white hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            onClick={onClose}
            disabled={isTxExecuting}
          >
            Cancel
          </button>
          <button
            className="px-6 py-3 rounded-lg bg-primary text-black font-semibold hover:bg-primary/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            onClick={onConfirm}
            disabled={
              isTxExecuting ||
              !amount ||
              !price ||
              Number(amount) <= 0 ||
              Number(price) <= 0
            }
          >
            {isTxExecuting ? "Broadcasting..." : "Confirm & Broadcast"}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ReviewDexTxModal;
