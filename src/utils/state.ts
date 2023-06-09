import { Toast } from "antd-mobile";

export const userState = [
  { title: '已失效', class: 'bg-red-500' },
  { title: '跟单中', class: 'bg-orange-500' },
  { title: '已签约', class: 'bg-green-500' },
]

export const size = 10;

// 防抖
export const debounce = (fn: (val?: any) => void, detail: number = 1000) => {
  let timer: number | null = null;
  return (v?: any) => {
    Toast.show('请等待')
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => fn(v), detail)
  }
}