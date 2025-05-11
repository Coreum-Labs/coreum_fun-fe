import { dexReducer } from '@/features/dex';
import { generalReducer } from '@/features/general/index';
import { balancesReducer } from '@/features/balances';
import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    general: generalReducer,
    dex: dexReducer,
    balances: balancesReducer,
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
