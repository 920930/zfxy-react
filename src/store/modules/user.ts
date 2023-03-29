import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction} from '@reduxjs/toolkit';
import type { TToken, TUser } from '../typings';
import { getLocalStorage, setLocalStorage, clearStorage } from '../../utils/storage';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    token: getLocalStorage<TToken>('token', ''),
    user: {}
  } as {token: TToken; user: TUser},
  reducers: {
    updateToken(state, { payload }: PayloadAction<TToken>){
      state.token = payload;
      setLocalStorage('token', payload)
    },
    updateUser(state, action: PayloadAction<TUser>){
      state.user = action.payload
    },
    clearAll(state){
      state.token = '';
      clearStorage()
    }
  },
  extraReducers(builder) {
    builder
      // .addCase(loginAction.fulfilled, (state, action) => {
      //   updateToken(action.payload)
      //   setLocalStorage('token', action.payload)
      //   // state.token = action.payload;
      // })
      .addCase(userAction.fulfilled, (state, action) => {
        console.log(action)
        state.user = action.payload;
      })
  },
})

// user/loginAction 仅为辨识符号，用于dispatch('user/loginAction')辨识
export const loginAction = createAsyncThunk('user/loginAction', async (val: {phone: string; password: string}) => {
  const ret: string = await new Promise((resolve, reject) => resolve('token-12312321313'));
  return ret
})

export const userAction = createAsyncThunk('user/userAction', () => {
  return {id: 1}
})

export const { updateToken, updateUser } = userSlice.actions

export default userSlice.reducer;