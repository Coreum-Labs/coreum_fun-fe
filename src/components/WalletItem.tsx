import { WalletIcon } from "../assets/WalletIcon";
import { WalletType } from "../types/Wallet";
import { FC } from "react";

interface WalletItemProps {
  type: WalletType;
  label: string;
  onClick: (type: WalletType) => void;
}

export const WalletItem: FC<WalletItemProps> = ({ type, label, onClick }) => {
  return (
    <div
      className="flex flex-col w-full items-center text-center px-5 pt-6 pb-5 gap-3 text-sm text-white font-noto-sans font-normal bg-white/20 hover:bg-white/30 rounded-xl cursor-pointer"
      onClick={() => onClick(type)}
    >
      <WalletIcon type={type} />
      {label}
    </div>
  );
};
