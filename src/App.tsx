import { lazy, useEffect, useState } from 'react'
import {
  Link,
  useLocation,
  Outlet,
  matchRoutes,
  Navigate,
} from 'react-router-dom'
import { useSelector } from 'react-redux'
import { routes } from './router'
import { useAppDispatch, userAction, menuAction } from './store'
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
  const [title, setTitle] = useState('')

  if (Array.isArray(matchs)) {
    const route = matchs.at(-1)?.route
    if (route?.meta?.auth && !Object.keys(user).length) {
      if (token) {
        // 获取用户信息 - 获取菜单列表信息
        appDispatch(userAction()).then(() => appDispatch(menuAction()))
      } else {
        return <Navigate to="/login" />
      }
    }
    useEffect(() => setTitle(route?.meta?.title ?? ''), [route?.meta?.title])
  }

  useEffect(() => {
    wx.config({
      debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: 'wx7e998d6d465a5e90', // 必填，公众号的唯一标识
      timestamp: 411212, // 必填，生成签名的时间戳
      nonceStr: 'string', // 必填，生成签名的随机串
      signature: 'string', // 必填，签名，见附录1
      jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData'], // 必填，需要使用的 JS 接口列表
      openTagList: ['wx-open-launch-app'],
    })

    wx.ready(() => {
      console.log(123)
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
