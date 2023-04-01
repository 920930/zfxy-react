import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction} from '@reduxjs/toolkit';
import type { TToken, TUser } from '../typings';
import { getLocalStorage, setLocalStorage, clearStorage } from '@/utils/storage';
import http from '@/utils/http';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    token: getLocalStorage<TToken>('token', ''),
    user: {}
  } as {token: TToken; user: TUser},
  reducers: {
    updateToken(state, { payload }: PayloadAction<TToken>){
      console.log('update token redux')
      state.token = payload;
      setLocalStorage('token', payload)
    },
    updateUser(state, action: PayloadAction<TUser>){
      state.user = action.payload
    },
    clearAll(state){
      state.token = '';
      state.user = {}
      clearStorage()
    }
  },
  extraReducers(builder) {
    builder
      .addCase(loginAction.fulfilled, (state, action) => {
        state.token = action.payload;
        setLocalStorage('token', action.payload)
      })
      .addCase(userAction.fulfilled, (state, action) => {
        state.user = action.payload;
      })
  },
})

// user/loginAction 仅为辨识符号，用于dispatch('user/loginAction')辨识
export const loginAction = createAsyncThunk('user/loginAction', async (val: {phone: string; password: string; code: string}) => {
  const ret = await http.post<{token: string}>('/login', val);
  return ret.token
})

export const userAction = createAsyncThunk('user/userAction', () => {
  console.log('user')
  return {id: 1}
})

export const { clearAll, updateToken } = userSlice.actions

export default userSlice.reducer;