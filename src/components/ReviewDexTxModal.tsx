import React from "react";
import { Modal } from "./Modal";
import { ArrowBottomRightIcon, ArrowTopLeftIcon } from "@radix-ui/react-icons";

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
      <div className="p-2 text-white w-full max-w-md mx-auto">
        <div className="bg-indigo-900/50 rounded-lg p-4 mb-4">
          <div className="flex justify-between mb-2">
            <span className="text-white/70">Pair</span>
            <span>
              {baseSymbol} / {quoteSymbol}
            </span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-white/70">Side</span>
            <span
              className={side === "buy" ? "text-green-400" : "text-red-400"}
            >
              {side === "buy" ? "Buy" : "Sell"}
            </span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-white/70">Amount</span>
            <span>
              {amount} {baseSymbol}
            </span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-white/70">Price</span>
            <span>
              {price} {quoteSymbol}
            </span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-white/70">Total</span>
            <span>
              {total} {quoteSymbol}
            </span>
          </div>
          {estimatedFee && (
            <div className="flex justify-between mb-2">
              <span className="text-white/70">Estimated Fee</span>
              <span>
                {estimatedFee} {quoteSymbol}
              </span>
            </div>
          )}
        </div>
        <div className="flex gap-4 justify-end">
          <button
            className="px-4 py-2 rounded bg-white/10 text-white hover:bg-white/20"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded bg-primary text-black font-semibold hover:bg-primary/80"
            onClick={onConfirm}
            disabled={
              !amount || !price || Number(amount) <= 0 || Number(price) <= 0
            }
          >
            Confirm & Broadcast
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ReviewDexTxModal;
