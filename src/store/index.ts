import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from './typings';

import userReducer from './modules/user';

const store = configureStore({
  reducer: {
    userReducer
  },
})

export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;