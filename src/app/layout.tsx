import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import dollar_sign from "../../public/dollar_sign.gif";
import xIcon from "../../public/x.svg";
import telegramIcon from "../../public/telegram.svg";
import questionIcon from "../../public/question-mark.svg";
import ClientModalWrapper from "../components/ClientModalWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Coreum.fun",
  description: "The 'No-Loss' Crypto Draft on Coreum",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable}  min-h-screen bg-gradient-to-bl from-[#0f172a] via-[#1e1a78] to-[#0f172a]`}
      >
        <div className="flex items-center justify-center min-h-full p-4 pb-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:flex-row gap-4 w-full max-w-[1000px]">
            {/* Header section */}
            <div className="flex flex-col sm:flex-row items-center justify-between w-full col-span-1 lg:col-span-2 gap-4">
              {/* Logo and title */}
              <div className="flex items-center justify-between w-full sm:w-auto">
                <div className="flex items-center">
                  <img
                    src={dollar_sign.src}
                    alt="Prediction Market"
                    className="rounded-lg w-20 sm:w-32 h-20 sm:h-32"
                  />
                  <span className="text-lg sm:text-xl font-bold text-white mx-2">
                    Coreum.fun
                  </span>
                  {/* <span className="text-lg sm:text-xl font-bold text-white mx-2">
                    <span className="text-2xl sm:text-3xl">ℂ</span>ore
                    <span className="text-2xl sm:text-3xl">ℂ</span>ast
                  </span> */}
                </div>

                {/* Social icons for mobile */}
                <div className="flex sm:hidden gap-2 items-center">
                  <ClientModalWrapper
                    questionIconSrc={questionIcon.src}
                    isMobile={true}
                  />
                  <div className="text-white bg-white/20 rounded-lg p-2 h-fit border-white/10 border">
                    <a
                      href="https://x.com/coreum_labs"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:opacity-80 transition-opacity"
                    >
                      <img
                        src={xIcon.src}
                        alt="X (Twitter)"
                        className="w-4 h-4"
                      />
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
                        src={telegramIcon.src}
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
                  <ClientModalWrapper
                    questionIconSrc={questionIcon.src}
                    isMobile={false}
                  />
                  <div className="text-white bg-white/20 rounded-lg p-2 sm:p-4 h-fit border-white/10 border">
                    <a
                      href="https://x.com/coreum_labs"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:opacity-80 transition-opacity"
                    >
                      <img
                        src={xIcon.src}
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
                        src={telegramIcon.src}
                        alt="Telegram"
                        className="w-4 h-4 sm:w-6 sm:h-6"
                      />
                    </a>
                  </div>
                </div>

                <button
                  className="sm:w-auto text-white bg-white/20 rounded-lg p-4 text-center border-white/10 border hover:bg-white/30 transition-colors"
                  // onClick={() => handleConnect()}
                >
                  <span className="text-center">Connect Wallet</span>
                </button>
              </div>
            </div>
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
