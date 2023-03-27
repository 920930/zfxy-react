<<<<<<< HEAD
import { useSelector } from 'react-redux';
import { RootState } from './store/typings'
type Props = {}

const App = (props: Props) => {
  const token = useSelector((state: RootState) => state.userReducer.token)
  return (
    <div>{token}</div>
  )
}

export default App
=======
import { Link, useLocation, Outlet, matchRoutes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux'
import Header from './components/layouts/Header';
import Footer from './components/layouts/Footer';
import Index from './pages/Index';
import { routes } from './router';
import type { RootState } from './stores/typings';

type Props = {
  children?: React.ReactNode
}
/* 
  用于登录验证
*/
const App: React.FC<Props> = () => {
  const location = useLocation();
  const matchs = matchRoutes(routes, location);
  const token = useSelector((state: RootState) => state.user.token);

  if(Array.isArray(matchs)){
    const meta = matchs.at(-1)?.route.meta
    if(meta?.isAuth && !token) return <Navigate to='/login' />
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
>>>>>>> 25ccda66174cca06cd4ec300b7a3724dc9ef9804
