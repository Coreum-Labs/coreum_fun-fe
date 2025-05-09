import React from "react";

const TicketsTable = () => {
  return (
    <div className="w-full bg-indigo-900/50 p-4 rounded-lg mb-8">
      <div className="flex gap-4 mb-4">
        <button className="bg-indigo-800/80 py-1 px-3 rounded-md text-sm">
          Tickets
        </button>
        <button className="bg-transparent hover:bg-indigo-800/50 py-1 px-3 rounded-md text-sm">
          Open Orders
        </button>
        <button className="bg-transparent hover:bg-indigo-800/50 py-1 px-3 rounded-md text-sm">
          Order History
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr className="text-left text-sm text-gray-400">
              <th className="pb-2">Address</th>
              <th className="pb-2">Tickets</th>
              <th className="pb-2">USD</th>
              <th className="pb-2">COREUM</th>
              <th className="pb-2"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2">core...e7075ysyxz</td>
              <td>5</td>
              <td>107.35</td>
              <td>1.19</td>
              <td>
                <button>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </button>
              </td>
            </tr>
            <tr>
              <td className="py-2">core...w3gvp9ovyxz</td>
              <td>1</td>
              <td>0.68</td>
              <td>0.88</td>
              <td>
                <button>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </button>
              </td>
            </tr>
            <tr>
              <td className="py-2">core...wd3gvp8ovyxz</td>
              <td>1</td>
              <td>1.19</td>
              <td>1.19</td>
              <td>
                <button>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </button>
              </td>
            </tr>
            <tr>
              <td className="py-2">core...zpcsqpcdyxz</td>
              <td>4</td>
              <td>3290.49</td>
              <td>1.19</td>
              <td>
                <button>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </button>
              </td>
            </tr>
            <tr>
              <td className="py-2">core...zpcsqpcdyxz</td>
              <td>5</td>
              <td>547.25</td>
              <td>1.19</td>
              <td>
                <button>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-4">
        <button className="bg-indigo-800/80 py-1 px-4 rounded-md text-sm">
          Show More
        </button>
      </div>
    </div>
  );
};

export default TicketsTable;
