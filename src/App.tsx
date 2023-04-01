import { lazy, useEffect } from 'react'
import {
  Link,
  useLocation,
  Outlet,
  matchRoutes,
  Navigate,
} from 'react-router-dom'
import { useSelector } from 'react-redux'
import { routes } from './router'
import http from './utils/http'
import { useAppDispatch, userAction, menuAction, clearAll } from './store'
import type { RootState } from './store/typings'

import Footer from './components/layouts/Footer'
const Home = lazy(() => import('./pages/Home'))

/* 
  用于登录验证
*/
const App: React.FC<{ children?: React.ReactNode }> = () => {
  const location = useLocation()
  const appDispatch = useAppDispatch()
  const matchs = matchRoutes(routes, location)
  const token = useSelector((state: RootState) => state.userReducer.token)
  const user = useSelector((state: RootState) => state.userReducer.user)
  if (Array.isArray(matchs)) {
    const route = matchs[matchs.length - 1]?.route
    if (route?.meta?.auth && !Object.keys(user).length) {
      if (token) {
        // 获取用户信息 - 获取菜单列表信息
        appDispatch(userAction()).then(() => appDispatch(menuAction()))
      } else {
        return <Navigate to="/login" />
      }
    }
  }
  useEffect(() => {
    let pathSearch = location.pathname + location.search
    http
      .post<{ signature: string; noncestr: string; timestamp: number }>(
        '/init',
        { url: pathSearch }
      )
      .then((data) => {
        wx.config({
          debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: import.meta.env.VITE_APPID, // 必填，公众号的唯一标识
          timestamp: data.timestamp, // 必填，生成签名的时间戳
          nonceStr: data.noncestr, // 必填，生成签名的随机串
          signature: data.signature, // 必填，签名，见附录1
          jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData'], // 必填，需要使用的 JS 接口列表
          openTagList: ['wx-open-launch-app'],
        })
      })
    // globalThis.location.origin http://192.168.2.116:5173/
    wx.ready(() => {
      console.log('微信jssdk已经准备就绪')
    })
  }, [])

  return (
    <>
      {location.pathname === '/' ? <Home /> : <Outlet />}
      <Link to="/login">login</Link>
      <Footer />
    </>
  )
}

export default App
