import { configureStore } from '@reduxjs/toolkit';
import { bookSlice } from './bookSlice';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: {
    books: bookSlice.reducer
  },
});

export type RootState = ReturnType<typeof store.getState>; 
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>()