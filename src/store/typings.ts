import store from "./index";

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export type TUser = {
  id: number;
  name: string;
  phone: string;
  avatar: string;
  ruleId: number;
  [key: string]: any
}

export type TToken = string
