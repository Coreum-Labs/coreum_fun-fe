"use client";

import { useCallback } from "react";
import { Modal } from "./Modal";
import { WalletType } from "@/types/Wallet";
import { chainName, WalletOption } from "@/config/default";
import { WalletItem } from "./WalletItem";
import { CONNECT_WALLET_OPTIONS } from "@/config/default";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setIsConnectModalOpen } from "@/features/general/index";
import {
  WalletType as GrazWalletType,
  useDisconnect,
  useSuggestChainAndConnect,
  useConnect,
} from "graz";
import { coreumtestnet } from "@/providers/WalletProvider";

export const ConnectWalletModal = () => {
  const { suggestAndConnectAsync } = useSuggestChainAndConnect();
  const { disconnectAsync } = useDisconnect();

  const isConnectWalletModalOpen = useAppSelector(
    (state: any) => state.general.isConnectModalOpen
  );

  const dispatch = useAppDispatch();

  const handleCloseConnectWalletModal = useCallback(() => {
    dispatch(setIsConnectModalOpen(false));
  }, []);

  const handleWalletClick = useCallback(
    async (type: WalletType) => {
      try {
        // await disconnectAsync();
        await suggestAndConnectAsync({
          // @ts-ignore
          chainInfo: coreumtestnet,
          walletType: type as unknown as GrazWalletType,
        });
        dispatch(setIsConnectModalOpen(false));
      } catch (error) {
        console.error(error);
      }
    },
    [disconnectAsync, dispatch, suggestAndConnectAsync]
  );

  return (
    <Modal
      isOpen={isConnectWalletModalOpen}
      title="Connect Wallet"
      onClose={handleCloseConnectWalletModal}
      wrapperClassName="w-[480px]"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {CONNECT_WALLET_OPTIONS.map((walletOption: WalletOption) => {
          return (
            <WalletItem
              key={walletOption.type}
              // @ts-ignore
              type={walletOption.type}
              label={walletOption.label}
              onClick={handleWalletClick}
            />
          );
        })}
      </div>
    </Modal>
  );
};
