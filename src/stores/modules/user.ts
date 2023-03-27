import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { User, Token } from '../typings';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    token: '',
    info: {}
  } as {token: Token, info: User},
  reducers: {
    updateToken(state, action: PayloadAction<Token>){
      state.token = action.payload
    },
    updateInfo(state, action: PayloadAction<User>){
      state.info = action.payload
    },
    clearToken(state){
      state.token = ''
    }
  },
  /* 
    1. 异步操作方法的结果处理，对象和方法皆可，官方推荐方法
    2. 也可以直接在方法后面做.then处理
    二者皆可
  */
  extraReducers(builder) {
    builder
      .addCase(loginAction.fulfilled, (state, { payload }) => {
        state.token = payload
      })
      .addCase(userAction.fulfilled, (state, action) => {
        state.info = action.payload
      })
  },
})

// user/loginAction 仅为辨识符号，用于dispatch('user/loginAction')辨识
export const loginAction = createAsyncThunk<Token, void>('user/loginAction', async (money: any) => {
  console.log(money)
  return await new Promise((resolve, reject) => resolve('heool'))
})
export const userAction = createAsyncThunk<User>('user/userAction', async () => {
  return await new Promise((resolve, reject) => resolve({}))
})

export default userSlice.reducer