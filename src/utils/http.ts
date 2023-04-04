import axios from "axios";
import type { AxiosRequestConfig } from 'axios'
import store, {updateToken} from "../store";
import { Toast } from 'antd-mobile';

const instance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_HOST + '/api',
  timeout: 5000
})

instance.interceptors.request.use(config => {
  const token = store.getState().userReducer.token
  token && config.headers.setAuthorization(token)
  return config;
}, function (error) {
  return Promise.reject(error);
});


instance.interceptors.response.use(response => {
  if(response.headers['authorization']){
    store.dispatch(updateToken(response.headers['authorization']))
  }
  return response.data
}, (err) => {
  Toast.show({
    content: err.response.status === 401 ? '登录超时 跳转登录页面...' : err.response.data.message,
    position: 'top',
  })
  if(err.response.status === 401){
    localStorage.clear()
    setTimeout(() => {
      globalThis.location.href = import.meta.env.VITE_CLIENT_HOST + '/login'
    }, 2000)
  }
  return Promise.reject(err.response.data);
});

type TMethod = 'get' | 'post' | 'put' | 'delete';

const http = <T>(method: TMethod, {url, body, config}: {url: string, body?: any, config?: AxiosRequestConfig}) => {
  return new Promise<T>(async (resolve, reject) => {
    try {
      if(method === 'get'){
        const { data } = await instance[method]<T>(url, {params: body, ...config});
        resolve(data)
      } else if (method === 'delete') {
        const { data } = await instance[method]<T>(url, config);
        resolve(data)
      } else {
        const { data } = await instance[method]<T>(url, body, config);
        resolve(data)
      }
    } catch (err) {
      // reject(err)
    }
  })
}

http.get = <T>(url: string, params?: any, config?: AxiosRequestConfig) => {
  return http<T>('get', {url, body: params, config});
}

http.post = <T>(url: string, body?: any, config?: AxiosRequestConfig) => {
  return http<T>('post', {url, body, config});
}

http.put = <T>(url: string, body?: any, config?: AxiosRequestConfig) => {
  return http<T>('put', {url, body, config});
}

http.del = <T>(url: string, config?: AxiosRequestConfig) => {
  return http<T>('delete', {url, config});
}

export default http;