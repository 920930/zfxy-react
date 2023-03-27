import { lazy } from 'react';
import { Link, useLocation, Outlet, matchRoutes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { routes } from './router';
import { useAppDispatch, userAction } from './store';
import type { RootState } from './store/typings';

import Header from './components/layouts/Header';
import Footer from './components/layouts/Footer';
const Index = lazy(() => import('./pages/Index'));

/* 
  用于登录验证
*/
const App: React.FC<{children?: React.ReactNode}> = () => {
  const location = useLocation();
  const appDispatch = useAppDispatch();
  const matchs = matchRoutes(routes, location);
  const token = useSelector((state: RootState) => state.userReducer.token);
  const user = useSelector((state: RootState) => state.userReducer.user);

  if(Array.isArray(matchs)){
    const meta = matchs.at(-1)?.route.meta
    if(meta?.isAuth && !Object.keys(user).length) {
      if(token) {
        appDispatch(userAction())
      } else {
        return <Navigate to='/login' />
      }
    }
  }
  return (
    <>
      <Header show={false} />
      {location.pathname === '/' ? <Index /> : <Outlet />}
      <Link to='/login'>login</Link>
      <Footer />
    </>
  )
}

export default App
