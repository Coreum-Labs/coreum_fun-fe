import React from "react";

const Chart = () => {
  return (
    <div className="bg-indigo-900/50 p-4 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-1">
          <div className="w-6 h-6 bg-secondary rounded-full"></div>
          <div className="w-6 h-6 bg-primary rounded-full -ml-2"></div>
          <span className="ml-2 font-medium">TICKET / COREUM</span>
        </div>
        <button className="bg-transparent border border-gray-600 p-1 rounded">
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
            <path d="M7 7h10v10" />
            <path d="M7 17 17 7" />
          </svg>
        </button>
      </div>
      <div className="h-48 bg-indigo-900/30 rounded p-3 relative">
        {/* Price labels */}
        <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-400 py-2">
          <div>90.00</div>
          <div>80.00</div>
          <div>70.00</div>
          <div>60.00</div>
          <div>50.00</div>
          <div>40.00</div>
          <div>30.00</div>
          <div>20.00</div>
          <div>10.00</div>
        </div>

        {/* Chart SVG */}
        <div className="absolute inset-0 mt-2 ml-8 mr-2 mb-4">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 200 100"
            preserveAspectRatio="none"
          >
            {/* Grid lines */}
            <line
              x1="0"
              y1="10"
              x2="200"
              y2="10"
              stroke="#444"
              strokeWidth="0.5"
              strokeDasharray="2,2"
            />
            <line
              x1="0"
              y1="20"
              x2="200"
              y2="20"
              stroke="#444"
              strokeWidth="0.5"
              strokeDasharray="2,2"
            />
            <line
              x1="0"
              y1="30"
              x2="200"
              y2="30"
              stroke="#444"
              strokeWidth="0.5"
              strokeDasharray="2,2"
            />
            <line
              x1="0"
              y1="40"
              x2="200"
              y2="40"
              stroke="#444"
              strokeWidth="0.5"
              strokeDasharray="2,2"
            />
            <line
              x1="0"
              y1="50"
              x2="200"
              y2="50"
              stroke="#444"
              strokeWidth="0.5"
              strokeDasharray="2,2"
            />
            <line
              x1="0"
              y1="60"
              x2="200"
              y2="60"
              stroke="#444"
              strokeWidth="0.5"
              strokeDasharray="2,2"
            />
            <line
              x1="0"
              y1="70"
              x2="200"
              y2="70"
              stroke="#444"
              strokeWidth="0.5"
              strokeDasharray="2,2"
            />
            <line
              x1="0"
              y1="80"
              x2="200"
              y2="80"
              stroke="#444"
              strokeWidth="0.5"
              strokeDasharray="2,2"
            />
            <line
              x1="0"
              y1="90"
              x2="200"
              y2="90"
              stroke="#444"
              strokeWidth="0.5"
              strokeDasharray="2,2"
            />

            {/* Price chart path */}
            <path
              d="M0,80 C5,78 10,75 15,70 C20,65 25,60 30,55 C35,58 40,63 45,62 C50,61 55,56 60,58 C65,60 70,64 75,68 C80,72 85,75 90,73 C95,71 100,65 105,62 C110,59 115,56 120,50 C125,44 130,35 135,30 C140,25 145,22 150,20 C155,18 160,15 165,20 C170,25 175,35 180,30 C185,25 190,15 195,12 L200,10"
              fill="none"
              stroke="var(--color-primary)"
              strokeWidth="2"
            />

            {/* Area under the line */}
            <linearGradient
              id="chartGradient"
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop
                offset="0%"
                stopColor="var(--color-primary)"
                stopOpacity="0.5"
              />
              <stop
                offset="100%"
                stopColor="var(--color-primary)"
                stopOpacity="0.1"
              />
            </linearGradient>
            <path
              d="M0,80 C5,78 10,75 15,70 C20,65 25,60 30,55 C35,58 40,63 45,62 C50,61 55,56 60,58 C65,60 70,64 75,68 C80,72 85,75 90,73 C95,71 100,65 105,62 C110,59 115,56 120,50 C125,44 130,35 135,30 C140,25 145,22 150,20 C155,18 160,15 165,20 C170,25 175,35 180,30 C185,25 190,15 195,12 L200,10 V100 H0 Z"
              fill="url(#chartGradient)"
            />

            {/* Current price indicator */}
            <circle cx="195" cy="12" r="3" fill="var(--color-primary)" />
          </svg>
        </div>

        {/* Time labels */}
        <div className="absolute bottom-0 left-8 right-2 flex justify-between text-xs text-gray-400">
          <div>10</div>
          <div>11</div>
          <div>12</div>
          <div>13</div>
          <div>21:04</div>
        </div>

        {/* Highlighted price badge */}
        <div className="absolute right-6 bottom-10 bg-red-500 text-white text-xs px-1 py-0.5 rounded">
          23.36
        </div>
      </div>
    </div>
  );
};

export default Chart;
