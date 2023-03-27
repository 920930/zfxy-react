import store from "./index";

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export type TUser = {
  [key: string]: any
}

export type TToken = string
