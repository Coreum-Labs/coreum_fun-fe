import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { chainName } from '@/config/default';
import coreumLogo from "../../../public/coreum.svg";
import ticketLogo from "../../../public/ticket.svg";

export interface Token {
  symbol: 'TICKET' | 'COREUM';
  denom: string;
  logo: string;
}

//Base token is the token the user is buying or selling.
// Quote token is the token used to price the base token. It's the currency used to buy or sell the base token.
// See Concept Of 
export interface TokenPair {
  base: Token;
  quote: Token;
}

export interface GeneralState {
  network: string;
  account: string;
  isConnected: boolean;
  isTxExecuting: boolean;
  isConnectModalOpen: boolean;
  isManageCurrencyModalOpen: boolean;
  isDisclaimerModalOpen: boolean;
  isBuyTicketModalOpen: boolean;
  tokenPair: TokenPair;
}

export const initialGeneralState: GeneralState = {
  network: chainName,
  account: '',
  isConnected: false,
  isTxExecuting: false,
  isConnectModalOpen: false,
  isManageCurrencyModalOpen: false,
  isDisclaimerModalOpen: true,
  isBuyTicketModalOpen: false,
  tokenPair: {
    base: {
      symbol: 'TICKET',
      denom: 'lone-testcore1zgdprlr3hz5hhke9ght8mq723a8wlnzqcepjcd',
      logo: ticketLogo
    },
    quote: {
      symbol: 'COREUM',
      denom: 'utestcore',
      logo: coreumLogo
    }
  },
};

const generalSlice = createSlice({
  name: 'general',
  initialState: initialGeneralState,
  reducers: {
    setIsConnectModalOpen(state, action: PayloadAction<boolean>) {
      state.isConnectModalOpen = action.payload;
    },

    setAccount(state, action: PayloadAction<string>) {
      state.account = action.payload;
    },
    setIsConnected(state, action: PayloadAction<boolean>) {
      state.isConnected = action.payload;
    },
 
    setIsTxExecuting(state, action: PayloadAction<boolean>) {
      state.isTxExecuting = action.payload;
    },
    setIsManageCurrencyModalOpen(state, action: PayloadAction<boolean>) {
      state.isManageCurrencyModalOpen = action.payload;
    },
    setIsBuyTicketModalOpen(state, action: PayloadAction<boolean>) {
      state.isBuyTicketModalOpen = action.payload;
    },
    setTokenPair(state, action: PayloadAction<TokenPair>) {
      state.tokenPair = action.payload;
    },
    swapTokenPair(state) {
      const { base, quote } = state.tokenPair;
      state.tokenPair = {
        base: quote,
        quote: base
      };
    },
  },
});

export const {
  setIsConnectModalOpen,
  setAccount,
  setIsConnected,
  setIsTxExecuting,
  setIsManageCurrencyModalOpen,
  setIsBuyTicketModalOpen,
  setTokenPair,
  swapTokenPair,
} = generalSlice.actions;
export const generalReducer = generalSlice.reducer;
export default generalSlice.reducer;
