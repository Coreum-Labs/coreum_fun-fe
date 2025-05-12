import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { formatOrder } from "../features/dex/queries";
import { useDex } from "@/hooks/useDex";
import { useCancelOrder } from "@/hooks/useCancelOrder";
import { ArrowBottomRightIcon, ArrowTopLeftIcon } from "@radix-ui/react-icons";
import { useAccount } from "graz";
import { useAppDispatch } from "@/store/hooks";
import { setIsTxExecuting } from "@/features/general";
import { Modal } from "./Modal";
import { setSelectedOrder } from "@/features/dex";
import { convertDexPriceToNumber } from "@/utils/convertUnitToSubunit";

export const OpenOrders = () => {
  const { openOrders, isLoading, tokenPair } = useSelector(
    (state: RootState) => state.dex
  );
  const { data: account } = useAccount();
  const { fetchOrders } = useDex();
  const { cancelOrder } = useCancelOrder();
  const dispatch = useAppDispatch();
  const [selected, setSelected] = useState(0);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleCancelOrder = async (orderId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedOrderId(orderId);
    setIsCancelModalOpen(true);
  };

  const handleConfirmCancel = async () => {
    if (!selectedOrderId) return;

    try {
      dispatch(setIsTxExecuting(true));
      await cancelOrder(selectedOrderId);
      setIsCancelModalOpen(false);
      setSelectedOrderId(null);
    } catch (error) {
      console.error("Failed to cancel order:", error);
    } finally {
      dispatch(setIsTxExecuting(false));
    }
  };

  const handleOrderClick = (order: any) => {
    const newOrder = { ...order };
    dispatch(setSelectedOrder(newOrder));
  };

  if (isLoading) {
    return <div>Loading open orders...</div>;
  }

  return (
    <div className="w-full">
      <table className="w-full text-white">
        <thead>
          <tr className="text-left text-white/70 text-sm">
            <th className="py-2 px-4">Side</th>
            <th className="py-2 px-4 text-right">Price</th>
            <th className="py-2 px-4 text-right">Volume</th>
            <th className="py-2 px-4 text-right">Total</th>
            <th className="py-2 px-4 text-right">Remaining</th>
            <th className="py-2 px-4 text-right">Status</th>
            <th className="py-2 px-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {openOrders.length === 0 ? (
            <tr>
              <td colSpan={7} className="py-4 text-center text-white/60">
                No open orders found.
              </td>
            </tr>
          ) : (
            openOrders.map((order, idx) => {
              const formatted = formatOrder(order);
              const isCreator = order.creator === account?.bech32Address;
              return (
                <tr
                  key={order.id + idx}
                  className={`cursor-pointer ${
                    selected === idx ? "bg-white/10 " : ""
                  } rounded-lg`}
                  onClick={() => {
                    setSelected(idx);
                    handleOrderClick(order);
                  }}
                >
                  <td className="py-2 px-4 rounded-l-lg flex items-center gap-2">
                    {formatted.side === "Buy" ? (
                      <ArrowBottomRightIcon className="text-green-400" />
                    ) : (
                      <ArrowTopLeftIcon className="text-red-400" />
                    )}
                    <span>{formatted.side}</span>
                  </td>
                  <td className="py-2 px-4 text-right">
                    {convertDexPriceToNumber(formatted.price)}
                  </td>
                  <td className="py-2 px-4 text-right">
                    {formatted.volume}{" "}
                    <span className="text-white/60">
                      {tokenPair.base.symbol}
                    </span>
                  </td>
                  <td className="py-2 px-4 text-right">
                    {formatted.total}{" "}
                    <span className="text-white/60">
                      {tokenPair.quote.symbol}
                    </span>
                  </td>
                  <td className="py-2 px-4 text-right">
                    {formatted.remainingQuantity}{" "}
                    <span className="text-white/60">
                      {tokenPair.base.symbol}
                    </span>
                  </td>
                  <td className="py-2 px-4 text-right">{formatted.status}</td>
                  <td className="py-2 px-4 rounded-r-lg text-right">
                    {isCreator && (
                      <button
                        className="bg-red-500/20 text-red-400 px-3 py-1 rounded-md hover:bg-red-500/30 transition-colors"
                        onClick={(e) => handleCancelOrder(order.id, e)}
                      >
                        Cancel
                      </button>
                    )}
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
      <div className="flex justify-center mt-4">
        <button
          className="bg-white/10 text-white/50 px-6 py-2 rounded-md cursor-not-allowed"
          disabled
        >
          Show More
        </button>
      </div>

      <Modal
        isOpen={isCancelModalOpen}
        onClose={() => {
          setIsCancelModalOpen(false);
          setSelectedOrderId(null);
        }}
        title="Cancel Order"
      >
        <div className="p-4 text-white w-full max-w-md mx-auto">
          <div className="bg-indigo-900/30 rounded-lg p-6 mb-6">
            <p className="text-lg font-medium mb-2">Confirm Cancellation</p>
            <p className="text-white/80 mb-6">
              Are you sure you want to cancel this order? This action cannot be
              undone.
            </p>
            <div className="flex gap-4">
              <button
                className="flex-1 bg-red-500/20 text-red-400 px-4 py-2 rounded-md hover:bg-red-500/30 transition-colors"
                onClick={handleConfirmCancel}
              >
                Cancel Order
              </button>
              <button
                className="flex-1 bg-white/10 text-white px-4 py-2 rounded-md hover:bg-white/20 transition-colors"
                onClick={() => {
                  setIsCancelModalOpen(false);
                  setSelectedOrderId(null);
                }}
              >
                Keep Order
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default OpenOrders;
