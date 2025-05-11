import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TokenPair } from '@/shared/types';
import coreumLogo from "../../../public/coreum.svg";
import ticketLogo from "../../../public/ticket.svg";
import { COREUM_TOKEN_TESTNET, TICKET_TOKEN_TESTNET } from '@/constants';

export interface DexState {
  tokenPair: TokenPair;
}

export const initialDexState: DexState = {
  tokenPair: {
    base: {
      symbol: TICKET_TOKEN_TESTNET.symbol,
      denom: TICKET_TOKEN_TESTNET.denom,
      logo: TICKET_TOKEN_TESTNET.logo
    },
    quote: {
      symbol: COREUM_TOKEN_TESTNET.symbol,
      denom: COREUM_TOKEN_TESTNET.denom,
      logo: COREUM_TOKEN_TESTNET.logo
    }
  },
};

const dexSlice = createSlice({
  name: 'dex',
  initialState: initialDexState,
  reducers: {
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
  setTokenPair,
  swapTokenPair,
} = dexSlice.actions;
export const dexReducer = dexSlice.reducer;
export default dexSlice.reducer;
