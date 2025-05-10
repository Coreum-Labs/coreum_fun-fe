import React from "react";

const orderHistoryData = [
  { side: "Buy", price: 1.22, volume: 80, total: 97.6 },
  { side: "Sell", price: 1.3, volume: 40, total: 52 },
  { side: "Buy", price: 1.18, volume: 150, total: 177 },
];

const OrderHistory = () => (
  <div className="w-full">
    <table className="w-full text-white">
      <thead>
        <tr className="text-left text-white/70 text-sm">
          <th className="py-2 px-4">Side</th>
          <th className="py-2 px-4 text-right">Price</th>
          <th className="py-2 px-4 text-right">Volume</th>
          <th className="py-2 px-4 text-right">Total</th>
        </tr>
      </thead>
      <tbody>
        {orderHistoryData.map((row, idx) => (
          <tr key={idx} className="rounded-lg">
            <td className="py-2 px-4 font-semibold">
              <span
                className={
                  row.side === "Buy" ? "text-primary" : "text-secondary"
                }
              >
                {row.side}
              </span>
            </td>
            <td className="py-2 px-4 text-right">{row.price}</td>
            <td className="py-2 px-4 text-right">{row.volume}</td>
            <td className="py-2 px-4 text-right">{row.total}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default OrderHistory;
