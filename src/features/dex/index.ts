import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TokenPair } from '@/shared/types';
import coreumLogo from "../../../public/coreum.svg";
import ticketLogo from "../../../public/ticket.svg";

export interface DexState {
  tokenPair: TokenPair;
}

export const initialDexState: DexState = {
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
