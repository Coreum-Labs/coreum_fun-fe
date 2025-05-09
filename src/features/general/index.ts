import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { chainName } from '@/config/default';

export interface GeneralState {
  network: string;
  account: string;
  isConnected: boolean;
  isTxExecuting: boolean;
  isConnectModalOpen: boolean;
  isManageCurrencyModalOpen: boolean;
  isDisclaimerModalOpen: boolean;
  isBuyTicketModalOpen: boolean;
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
  },
});

export const {
  setIsConnectModalOpen,
  setAccount,
  setIsConnected,
  setIsTxExecuting,
  setIsManageCurrencyModalOpen,
  setIsBuyTicketModalOpen,
} = generalSlice.actions;
export const generalReducer = generalSlice.reducer;
export default generalSlice.reducer;
