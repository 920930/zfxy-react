import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction} from '@reduxjs/toolkit';

const menuSlice = createSlice({
  name: 'menu',
  initialState: {
    list: [],
  },
  reducers: {}
})

export const menuAction = createAsyncThunk('menu/listAction', async () => {
  console.log('menu')
  const ret = await new Promise<string>((resolve, reject) => resolve('token-12312321313'));
  return ret
})

export default menuSlice.reducer;