"use client";

import { Cross1Icon } from "@radix-ui/react-icons";

const InfoModal = ({
  isOpen,
  onClose,
  isExampleExpanded = false,
  setIsExampleExpanded = () => {},
}: {
  isOpen: boolean;
  onClose: () => void;
  isExampleExpanded?: boolean;
  setIsExampleExpanded?: (expanded: boolean) => void;
}) => {
  if (!isOpen) return null;

  return (
    <div className="flex flex-col items-center p-1 sm:p-10 md:p-20 w-full h-screen max-w-full absolute left-0 right-0 top-0 bottom-0 bg-[#1e1a78]/75 backdrop-blur-[2px] z-50 items-center justify-center">
      <div className="flex flex-col w-[640px] max-w-full max-h-full overflow-y-auto p-8 bg-white/40 border-white/10 border rounded-2xl backdrop-blur-sm gap-4">
        <div className="flex justify-between w-full text-lg font-space-grotesk text-white font-medium">
          <h2>No Loss Draft</h2>
          <div
            className="flex flex-col items-center justify-center !cursor-pointer text-white"
            onClick={onClose}
          >
            <Cross1Icon />
          </div>
        </div>
        <div className="flex flex-col w-full text-white">
          <div className="flex flex-col gap-4">
            <p className="text-sm md:text-base">
              The Coreum No Loss Draft is a unique opportunity where
              participants can win without risking their principal investment.
            </p>

            <div className="space-y-2">
              <h3 className="font-bold">How It Works:</h3>
              <ul className="list-disc pl-5 space-y-2 text-sm md:text-base">
                <li>500 tickets are available at a price of 200 COREUM each</li>
                <li>
                  If you miss the initial buy-in, you can still purchase tickets
                  on the DEX (if someone is willing to sell)
                </li>
                <li>Maximum 3 tickets per wallet</li>
                <li>
                  For each ticket bought, you receive an equal amount of $TICKET
                  tokens (e.g., 2 tickets = 2 $TICKET)
                </li>
                <li>
                  Your COREUM is automatically staked to the Coreum Labs
                  validator
                </li>
                <li>Staking rewards are pooled together as the Draft prize</li>
                <li>
                  The Coreum Foundation and Coreum Labs will add bonus rewards
                  on top!
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <h3 className="font-bold">$TICKET Tokens:</h3>
              <ul className="list-disc pl-5 space-y-2 text-sm md:text-base">
                <li>
                  $TICKET tokens can be traded on the Coreum Native Orderbook
                  DEX at your desired price
                </li>
                <li>
                  At the end of the draft, you can burn your $TICKET to reclaim
                  your COREUM (7-day undelegation process)
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <h3 className="font-bold">Important Notes:</h3>
              <ul className="list-disc pl-5 space-y-2 text-sm md:text-base">
                <li>
                  This is a no-loss draft - you can always reclaim your
                  principal investment
                </li>
                <li>
                  The exact date of the draw will be announced on the Coreum
                  Labs X account
                </li>
                <li>
                  The prize pool consists of staking rewards plus bonus
                  contributions
                </li>
              </ul>
            </div>

            {/* Example Section */}
            <div className="mt-4">
              <button
                onClick={() => setIsExampleExpanded(!isExampleExpanded)}
                className="flex items-center gap-2 text-white hover:text-white/80 transition-colors"
              >
                <span>{isExampleExpanded ? "Hide" : "Show"} Example</span>
                <svg
                  className={`w-4 h-4 transition-transform ${
                    isExampleExpanded ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {isExampleExpanded && (
                <div className="mt-4 p-4 bg-black/20 rounded-lg">
                  <h3 className="font-bold mb-4">No Loss Draft Example:</h3>
                  <div className="space-y-2 mb-4">
                    <div className="p-2 bg-black/20 rounded-lg">
                      You purchase 2 tickets for 400 COREUM total
                    </div>
                    <div className="p-2 bg-black/20 rounded-lg">
                      You receive 2 $TICKET tokens
                    </div>
                    <div className="p-2 bg-black/20 rounded-lg">
                      Your 400 COREUM is staked to the Coreum Labs validator
                    </div>
                    <div className="p-2 bg-black/20 rounded-lg">
                      Options after purchase:
                    </div>
                    <ul className="space-y-1 pl-4">
                      <li>
                        • Wait for the draft and potentially win the prize pool
                      </li>
                      <li>• Trade your $TICKET tokens on the DEX</li>
                      <li>
                        • After the draft, burn your $TICKET tokens to reclaim
                        your 400 COREUM
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-8">
            <button onClick={onClose} className="w-full">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
