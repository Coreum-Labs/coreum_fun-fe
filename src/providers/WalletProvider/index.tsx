import { FC } from "react";
import {
  ConfigureGrazArgs,
  defineChainInfo,
  GrazProvider,
  WalletType,
} from "graz";

interface WalletProviderProps {
  children: React.ReactNode;
}

export const coreumtestnet = defineChainInfo({
  chainId: "coreum-testnet-1",
  currencies: [
    {
      coinDenom: "testcore",
      coinMinimalDenom: "utestcore",
      coinDecimals: 6,
      coinGeckoId: "coreum",
    },
  ],
  rest: "https://coreum-testnet-api.ibs.team",
  rpc: "https://coreum-testnet-rpc.ibs.team",
  bech32Config: {
    bech32PrefixAccAddr: "testcore",
    bech32PrefixAccPub: "testcorepub",
    bech32PrefixValAddr: "testcorevaloper",
    bech32PrefixValPub: "testcorevaloperpub",
    bech32PrefixConsAddr: "testcorevalcons",
    bech32PrefixConsPub: "testcorevalconspub",
  },
  chainName: "coreumtestnet",
  feeCurrencies: [
    {
      coinDenom: "testcore",
      coinMinimalDenom: "utestcore",
      coinDecimals: 6,
      coinGeckoId: "coreum",
      gasPriceStep: {
        low: 0.0625,
        average: 0.0625,
        high: 62.5,
      },
    },
  ],
  stakeCurrency: {
    coinDenom: "testcore",
    coinMinimalDenom: "utestcore",
    coinDecimals: 6,
    coinGeckoId: "coreum",
  },
  bip44: {
    coinType: 990,
  },
});

export const WalletProvider: FC<WalletProviderProps> = ({ children }) => {
  const grazOptions: ConfigureGrazArgs = {
    chains: [coreumtestnet],
    autoReconnect: true,
    defaultWallet: WalletType.KEPLR,
  };

  return <GrazProvider grazOptions={grazOptions}>{children}</GrazProvider>;
};
