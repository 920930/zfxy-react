import axios from "axios";
import type { AxiosRequestConfig, AxiosResponse} from 'axios'
import store from "../store";

const http = axios.create({
  baseURL: 'http://192.168.2.116:7001/api',
  timeout: 5000
})

http.interceptors.request.use(config => {
  const token = store.getState().userReducer.token
  token && (config.headers.Authorization = token)
  return config;
}, function (error) {
  return Promise.reject(error);
});

http.interceptors.response.use(response => {
  if(response.status === 200) {
    return response
  } else {
    return response.data;
  }
}, function (error) {
  return Promise.reject(error);
});

export const get = async <T>(url: string, params?: any, config?: AxiosRequestConfig): Promise<T> => {
  const { data, status } = await http.get<T>(url, {params, ...config});
  return data;
}

export default http;