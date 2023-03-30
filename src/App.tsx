import { lazy, useEffect, useState } from 'react';
import { Link, useLocation, Outlet, matchRoutes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { routes } from './router';
import { useAppDispatch, userAction, menuAction } from './store';
import type { RootState } from './store/typings';

import Header from './components/layouts/Header';
import Footer from './components/layouts/Footer';
const Home = lazy(() => import('./pages/Home'));

/* 
  用于登录验证
*/
const App: React.FC<{children?: React.ReactNode}> = () => {
  const location = useLocation();
  const appDispatch = useAppDispatch();
  const matchs = matchRoutes(routes, location);
  const token = useSelector((state: RootState) => state.userReducer.token);
  const user = useSelector((state: RootState) => state.userReducer.user);
  const [title, setTitle] = useState('')

  if(Array.isArray(matchs)){
    const route = matchs.at(-1)?.route
    if(route?.meta?.auth && !Object.keys(user).length) {
      if(token) {
        // 获取用户信息 - 获取菜单列表信息
        appDispatch(userAction()).then(() => appDispatch(menuAction()))
      } else {
        return <Navigate to='/login' />
      }
    }
    useEffect(() => setTitle(route?.meta?.title ?? ''), [route?.meta?.title])
  }
  return (
    <>
      <Header show={location.pathname === '/' ? false : true } title={title} />
      {location.pathname === '/' ? <Home /> : <Outlet />}
      <Link to='/login'>login</Link>
      <Footer />
    </>
  )
}

export default App
