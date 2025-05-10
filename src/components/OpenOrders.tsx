import React from "react";

const openOrdersData = [
  { side: "Buy", price: 1.23, volume: 100, total: 123 },
  { side: "Sell", price: 1.25, volume: 50, total: 62.5 },
  { side: "Buy", price: 1.2, volume: 200, total: 240 },
];

const OpenOrders = () => (
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
        {openOrdersData.map((row, idx) => (
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

export default OpenOrders;
