/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APPID: string;
  readonly VITE_SERVER_HOST: string;
  readonly VITE_CLIENT_HOST: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}