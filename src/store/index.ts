import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from './typings';

import userReducer from './modules/user';
import menuReducer from './modules/menu'

const store = configureStore({
  reducer: {
    userReducer,
    menuReducer
  },
})

export const useAppDispatch: () => AppDispatch = useDispatch;
export { clearAll, updateToken, loginAction, userAction, logoutAction } from './modules/user';
export { menuAction } from './modules/menu';
export default store;