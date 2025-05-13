import React, { useState } from "react";
import { useTicketHolders } from "@/hooks/useTicketHolders";

function getEmoji(tickets: number) {
  if (tickets >= 5) return "🦈";
  if (tickets === 4) return "🐋";
  if (tickets === 3) return "🐡";
  if (tickets === 2) return "🐠";
  return "🦐";
}

const Holders = () => {
  const [selected, setSelected] = useState(0);
  const { holders, isLoading } = useTicketHolders();

  // Transform holders data to match the existing UI format
  const holdersData = holders.map((holder) => ({
    address: holder.address.slice(0, 4) + "..." + holder.address.slice(-4),
    tickets: parseInt(holder.balance.amount) / 1000000, // Convert from subunit to unit
    winRate: 0, // These values would need to be calculated or fetched from another source
    deposit: 0, // These values would need to be calculated or fetched from another source
  }));

  if (isLoading) {
    return <div className="text-white/70">Loading holders...</div>;
  }

  return (
    <div className="w-full">
      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-white min-w-[600px]">
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
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden grid grid-cols-2 gap-4">
        {holdersData.map((row, idx) => (
          <div
            key={row.address + idx}
            className={`bg-white/5 rounded-lg p-4 cursor-pointer ${
              selected === idx ? "bg-white/10" : ""
            }`}
            onClick={() => setSelected(idx)}
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-white/70">{row.address}</span>
              <span className="text-xl">{getEmoji(row.tickets)}</span>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-white/70">Tickets</span>
                <span>{row.tickets}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/70">Win Rate</span>
                <span>{row.winRate}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/70">Deposit</span>
                <span>{row.deposit}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

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
