import { useCallback } from 'react';
import { useCoreum } from '@/providers/CoreumProvider';
import { useAccount } from 'graz';
import { OrderType, Side, TimeInForce } from 'coreum-js-nightly/dist/main/coreum/dex/v1/order';
import { useDex } from './useDex';
import { DEX } from 'coreum-js-nightly';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useEstimateTxGasFee } from './useEstimateTxGasFee';
import { COREUM_TOKEN_TESTNET, TICKET_TOKEN_TESTNET } from '@/constants';
import { convertUnitToSubunit } from '@/utils/convertUnitToSubunit';
import { toast } from 'sonner';

const generateOrderId = (side: string, baseSymbol: string, quoteSymbol: string): string => {
  const timestamp = Date.now();
  const randomStr = Math.random().toString(36).substring(2, 8);
  return `${side}-${baseSymbol}-${quoteSymbol}-${timestamp}-${randomStr}`.toLowerCase();
};

export const useCreateOrder = () => {
  const { client } = useCoreum();
  const { data: account } = useAccount();
  const { signingClient, getTxFee } = useEstimateTxGasFee();
  const { fetchOrders } = useDex();
  const { base, quote } = useSelector((state: RootState) => state.dex.tokenPair);

  const createOrder = useCallback(async (
    side: 'buy' | 'sell',
    amount: string,
    price: string,
    baseDenom: string,
    quoteDenom: string,
    orderType: 'market' | 'limit',
    timeInForce: string = 'Good till Cancel',
    execution: 'standard' | 'passive' = 'standard'
  ) => {
    if (!client || !account?.bech32Address || !signingClient) {
      throw new Error('Client, account, or signing client not initialized');
    }

    try {
      // Get precision from token constants
      const basePrecision = base.denom === COREUM_TOKEN_TESTNET.denom 
        ? COREUM_TOKEN_TESTNET.precision 
        : TICKET_TOKEN_TESTNET.precision;
      
      const quotePrecision = quote.denom === COREUM_TOKEN_TESTNET.denom 
        ? COREUM_TOKEN_TESTNET.precision 
        : TICKET_TOKEN_TESTNET.precision;
      
      console.log('basePrecision', basePrecision);
      console.log('quotePrecision', quotePrecision);
      console.log("price", price);
      
      const quantityInSubunit = convertUnitToSubunit({ amount, precision: basePrecision as number });
      const priceInSubunit = convertUnitToSubunit({ amount: price, precision: quotePrecision as number });
      
      console.log("quantityInSubunit", quantityInSubunit);
      console.log("priceInSubunit", priceInSubunit);

      const orderId = generateOrderId(side, base.symbol, quote.symbol);

      // 1. Create the order message
      const orderMsg = DEX.PlaceOrder({
        sender: account.bech32Address,
        side: side === 'buy' ? Side.SIDE_BUY : Side.SIDE_SELL,
        quantity: quantityInSubunit,
        price: priceInSubunit,
        baseDenom: baseDenom,
        quoteDenom,
        // TODO use the right time param coming from the UI
        timeInForce: TimeInForce.TIME_IN_FORCE_GTC,
        goodTil: undefined,
        type: orderType === 'market' ? OrderType.ORDER_TYPE_MARKET : OrderType.ORDER_TYPE_LIMIT,
        id: orderId,
      });
        
      // 2. Calculate transaction fee
      const calculatedTxFee = await getTxFee([orderMsg]);

      // 3. Send the transaction using the signing client
      const response = await signingClient.signAndBroadcast(
        account.bech32Address,
        [orderMsg],
        calculatedTxFee ? calculatedTxFee.fee : 'auto'
      );

      // 4. Refresh orders after successful creation
      await fetchOrders();

      toast.success(`${side === 'buy' ? 'Buy' : 'Sell'} order created successfully!`, {
        description: `Order ID: ${orderId}`,
      });

      return response;
    } catch (error) {
      console.error('Error creating order:', error);
      toast.error('Failed to create order', {
        description: error instanceof Error ? error.message : 'Unknown error occurred',
      });
      throw error;
    }
  }, [client, account?.bech32Address, signingClient, fetchOrders, base.denom, quote.denom, getTxFee]);

  return { createOrder };
}; 
