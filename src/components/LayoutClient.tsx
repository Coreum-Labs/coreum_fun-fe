"use client";

import { useState } from "react";
import Modal from "./Modal";

interface LayoutClientProps {
  children: React.ReactNode;
  dollarSignSrc: string;
  xIconSrc: string;
  telegramIconSrc: string;
  questionIconSrc: string;
}

export default function LayoutClient({
  children,
  dollarSignSrc,
  xIconSrc,
  telegramIconSrc,
  questionIconSrc,
}: LayoutClientProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [isExampleExpanded, setIsExampleExpanded] = useState(false);

  return (
    <>
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        isExampleExpanded={isExampleExpanded}
        setIsExampleExpanded={setIsExampleExpanded}
      />
      <div className="flex items-center justify-center min-h-full p-4 pb-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:flex-row gap-4 w-full max-w-[1000px]">
          {/* Header section */}
          <div className="flex flex-col sm:flex-row items-center justify-between w-full col-span-1 lg:col-span-2 gap-4">
            {/* Logo and title */}
            <div className="flex items-center justify-between w-full sm:w-auto">
              <div className="flex items-center">
                <img
                  src={dollarSignSrc}
                  alt="Prediction Market"
                  className="rounded-lg w-20 sm:w-32 h-20 sm:h-32"
                />
                <span className="text-lg sm:text-xl font-bold text-white mx-2">
                  Coreum.fun
                </span>
              </div>

              {/* Social icons for mobile */}
              <div className="flex sm:hidden gap-2 items-center">
                <div
                  onClick={() => setModalOpen(true)}
                  className="text-white bg-white/20 rounded-lg p-2 h-fit border-white/10 border cursor-pointer"
                >
                  <img
                    src={questionIconSrc}
                    alt="Question Mark"
                    className="w-4 h-4 bg-white rounded-3xl"
                  />
                </div>
                <div className="text-white bg-white/20 rounded-lg p-2 h-fit border-white/10 border">
                  <a
                    href="https://x.com/coreum_labs"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-80 transition-opacity"
                  >
                    <img src={xIconSrc} alt="X (Twitter)" className="w-4 h-4" />
                  </a>
                </div>
                <div className="text-white bg-white/20 rounded-lg p-2 h-fit border-white/10 border">
                  <a
                    href="https://t.me/coreum_labs"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-80 transition-opacity"
                  >
                    <img
                      src={telegramIconSrc}
                      alt="Telegram"
                      className="w-4 h-4"
                    />
                  </a>
                </div>
              </div>
            </div>

            {/* Wallet and desktop social icons */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              {/* Social icons for desktop */}
              <div className="hidden sm:flex gap-2 items-center">
                <div
                  onClick={() => setModalOpen(true)}
                  className="text-white bg-white/20 rounded-lg p-2 sm:p-4 h-fit border-white/10 border cursor-pointer"
                >
                  <img
                    src={questionIconSrc}
                    alt="Question Mark"
                    className="w-4 h-4 sm:w-6 sm:h-6 bg-white rounded-3xl"
                  />
                </div>
                <div className="text-white bg-white/20 rounded-lg p-2 sm:p-4 h-fit border-white/10 border">
                  <a
                    href="https://x.com/coreum_labs"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-80 transition-opacity"
                  >
                    <img
                      src={xIconSrc}
                      alt="X (Twitter)"
                      className="w-4 h-4 sm:w-6 sm:h-6"
                    />
                  </a>
                </div>
                <div className="text-white bg-white/20 rounded-lg p-2 sm:p-4 h-fit border-white/10 border">
                  <a
                    href="https://t.me/coreum_labs"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-80 transition-opacity"
                  >
                    <img
                      src={telegramIconSrc}
                      alt="Telegram"
                      className="w-4 h-4 sm:w-6 sm:h-6"
                    />
                  </a>
                </div>
              </div>

              <button
                className="w-full sm:w-auto text-white bg-white/20 rounded-lg p-4 text-center border-white/10 border hover:bg-white/30 transition-colors"
                // onClick={() => handleConnect()}
              >
                <span className="text-center">Connect Wallet</span>
              </button>
            </div>
          </div>
          {children}
        </div>
      </div>
    </>
  );
}
