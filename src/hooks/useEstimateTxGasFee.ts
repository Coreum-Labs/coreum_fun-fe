import { useAppSelector } from "../store/hooks";
import { EncodeObject, Registry } from "@cosmjs/proto-signing";
import { useCosmWasmSigningClient, useTendermintClient, useOfflineSigners } from "graz";
import { useMemo } from "react";
import {
  GasPrice,
  QueryClient,
  calculateFee,
  createProtobufRpcClient,
  decodeCosmosSdkDecFromProto,
  defaultRegistryTypes,
} from "@cosmjs/stargate";
import { QueryClientImpl as FeeModelClient } from "../lib/query";
import Big from "big.js";
import { coreumRegistry, cosmwasmRegistry } from "coreum-js-nightly";
import { CHAIN_ID } from "../constants";
import { Comet38Client } from "@cosmjs/tendermint-rpc";

const registryTypes = [
  ...defaultRegistryTypes,
  ...coreumRegistry,
  ...cosmwasmRegistry,
];
const registry = new Registry(registryTypes);

export const useEstimateTxGasFee = () => {
  const account = useAppSelector(state => state.general.account);

  const { data: tendermintClient } = useTendermintClient({
    chainId: CHAIN_ID,
    rpcUrl: "https://coreum-testnet-rpc.ibs.team",
    type: "tm34",
  }) as { data: Comet38Client | undefined };
  
  const { data: signingClient } = useCosmWasmSigningClient({
    chainId: CHAIN_ID,
    opts: {
      registry: registry,
    },
  });

  const feeModel = useMemo(() => {
    if (!tendermintClient) {
      return null;
    }

    const queryClient = new QueryClient(tendermintClient);
    const rpcClient = createProtobufRpcClient(queryClient);

    return new FeeModelClient(rpcClient);
  }, [tendermintClient]);

  const getGasPrice = async () => {
    if (!feeModel) {
      return "";
    }

    const feeModelParams = await feeModel.Params({});
    const minGasPriceRes = await feeModel.MinGasPrice({});

    const initialGasPrice = decodeCosmosSdkDecFromProto(
      feeModelParams.params?.model?.initialGasPrice || ""
    ).toFloatApproximation();

    return GasPrice.fromString(
      `${initialGasPrice}${minGasPriceRes.minGasPrice?.denom || ""}`
    );
  };

  const getTxFee = async (
    msgs: readonly EncodeObject[],
  ) => {
    if (!signingClient || !feeModel || !account) {
      return null;
    }

    const gasPrice = await getGasPrice();
    const gasWanted = await signingClient.simulate(
      account,
      msgs,
      ""
    );
    const totalGasWanted = new Big(gasWanted).mul(1.2).toFixed(0);

    return {
      fee: calculateFee(+totalGasWanted, gasPrice),
    };
  };

  return {
    getTxFee,
    signingClient,
  };
};
