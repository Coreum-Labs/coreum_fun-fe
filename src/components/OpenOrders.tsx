import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { formatOrder } from "../features/dex/queries";
import { useDex } from "@/hooks/useDex";
import { ArrowBottomRightIcon, ArrowTopLeftIcon } from "@radix-ui/react-icons";
export const OpenOrders = () => {
  const { openOrders, isLoading } = useSelector(
    (state: RootState) => state.dex
  );
  const { fetchOrders } = useDex();
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

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
          </tr>
        </thead>
        <tbody>
          {openOrders.length === 0 ? (
            <tr>
              <td colSpan={6} className="py-4 text-center text-white/60">
                No open orders found.
              </td>
            </tr>
          ) : (
            openOrders.map((order, idx) => {
              const formatted = formatOrder(order);
              return (
                <tr
                  key={order.id + idx}
                  className={`cursor-pointer ${
                    selected === idx ? "bg-white/10" : ""
                  } rounded-lg`}
                  onClick={() => setSelected(idx)}
                >
                  <td className="py-2 px-4 rounded-l-lg flex items-center gap-2">
                    {formatted.side === "Buy" ? (
                      <ArrowBottomRightIcon className="text-green-400" />
                    ) : (
                      <ArrowTopLeftIcon className="text-red-400" />
                    )}
                    <span>{formatted.side}</span>
                  </td>
                  <td className="py-2 px-4 text-right">{formatted.price}</td>
                  <td className="py-2 px-4 text-right">{formatted.volume}</td>
                  <td className="py-2 px-4 text-right">{formatted.total}</td>
                  <td className="py-2 px-4 text-right">
                    {formatted.remainingQuantity}
                  </td>
                  <td className="py-2 px-4 rounded-r-lg text-right">
                    {formatted.status}
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
    </div>
  );
};

export default OpenOrders;
