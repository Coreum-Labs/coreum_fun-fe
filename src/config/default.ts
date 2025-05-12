import { WalletType } from "graz";

export const chainId = 'coreum-testnet-1';
export const chainName = 'coreumtestnet';
export const contractAddress ='TBD';

export const blockTime = 1;

export const rpcUrl = 'https://coreum-testnet-rpc.ibs.team';

export interface WalletOption {
  type: WalletType,
  label: string;
}

export const CONNECT_WALLET_OPTIONS: WalletOption[] = [
  {
    type: WalletType.COSMOSTATION,
    label: 'Cosmostation',
  },
  // {
  //   type: WalletType.CosmostationMobile,
  //   label: 'Cosmostation Mobile',
  // },
  {
    type: WalletType.KEPLR,
    label: 'Keplr',
  },
  // {
  //   type: WalletType.KeplrMobile,
  //   label: 'Keplr Mobile',
  // },
  {
    type: WalletType.LEAP,
    label: 'Leap',
  },
  // {
  //   type: WalletType.LeapMobile,
  //   label: 'Leap Mobile',
  // },
];
