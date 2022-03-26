import { configureStore } from '@reduxjs/toolkit';
import isoReducer from '@/context/iso';
import searchReducer from './search';

export const store = configureStore({
  reducer: {
    search: searchReducer,
    iso: isoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
