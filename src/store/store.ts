import { dexReducer } from '@/features/dex';
import { generalReducer } from '@/features/general/index';
import { balancesReducer } from '@/features/balances';
import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import ticketsReducer from '@/features/tickets/ticketsSlice';
export const store = configureStore({
  reducer: {
    general: generalReducer,
    dex: dexReducer,
    balances: balancesReducer,
    tickets: ticketsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
