import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from 'react-redux';
import type { AppDispatch } from "./typings";
import userReducer from './modules/user';

const store = configureStore({
  reducer: {
    user: userReducer
  }
})

export const useAppDispatch: () => AppDispatch = useDispatch;
export { loginAction, userAction } from './modules/user';
export default store;