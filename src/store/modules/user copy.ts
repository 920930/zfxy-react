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
    
  },
})

export const loginAction = createAsyncThunk('user/loginAction', (val: {phone: string; password: string}) => {

})
export const userAction = createAsyncThunk('user/loginAction', (val: {phone: string; password: string}) => {
  
})

export const { updateToken, updateUser } = userSlice.actions

export default userSlice.reducer;