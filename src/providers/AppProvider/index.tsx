import { useAccountBalances } from "@/hooks/useBalances";

import { FC } from "react";

interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider: FC<AppProviderProps> = ({ children }) => {
  useAccountBalances();
  return children;
};
