import React, { useState } from "react";

const holdersData = [
  {
    address: "core...a9SzO75xyz",
    tickets: 5,
    winRate: 102.35,
    deposit: 0,
  },
  {
    address: "core...w40g9pxxyz",
    tickets: 1,
    winRate: 0.68,
    deposit: 0.68,
  },
  {
    address: "core...w40g9pxxyz",
    tickets: 2,
    winRate: 1.19,
    deposit: 1.19,
  },
  {
    address: "core...zqcepjcdyz",
    tickets: 4,
    winRate: 3290.49,
    deposit: 1.19,
  },
  {
    address: "core...zqcepjcdyz",
    tickets: 3,
    winRate: 547.25,
    deposit: 1.19,
  },
];

function getEmoji(tickets: number) {
  if (tickets >= 5) return "🦈";
  if (tickets === 4) return "🐋";
  if (tickets === 3) return "🐡";
  if (tickets === 2) return "🐠";
  return "🦐";
}

const Holders = () => {
  const [selected, setSelected] = useState(0);

  return (
    <div className="w-full">
      <table className="w-full text-white">
        <thead>
          <tr className="text-left text-white/70 text-sm">
            <th className="py-2 px-4">Address</th>
            <th className="py-2 px-4 text-right">Tickets</th>
            <th className="py-2 px-4 text-right">Win Rate</th>
            <th className="py-2 px-4 text-right">Deposit</th>
            <th className="py-2 px-4"></th>
          </tr>
        </thead>
        <tbody>
          {holdersData.map((row, idx) => (
            <tr
              key={row.address + idx}
              className={`cursor-pointer ${
                selected === idx ? "bg-white/10" : ""
              } rounded-lg`}
              onClick={() => setSelected(idx)}
            >
              <td className="py-2 px-4 rounded-l-lg">{row.address}</td>
              <td className="py-2 px-4 text-right">{row.tickets}</td>
              <td className="py-2 px-4 text-right">{row.winRate}</td>
              <td className="py-2 px-4 text-right">{row.deposit}</td>
              <td className="py-2 px-4 rounded-r-lg text-right">
                {getEmoji(row.tickets)}
              </td>
            </tr>
          ))}
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

export default Holders;
