import { createBrowserRouter } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom';
import { lazy } from 'react';

const App = lazy(() => import('../App'));
const Login = lazy(() => import('../pages/auth/Login'));
const Index = lazy(() => import('../pages/Index'));
const Todu = lazy(() => import('../pages/todu/Todu'));

declare module 'react-router'{
  interface IndexRouteObject {
    name?: string;
    meta?: {
      title: string;
      isAuth: boolean;
    }
  }
  interface NonIndexRouteObject{
    name?: string;
    meta?: {
      title: string;
      isAuth: boolean;
    }
  }
}

export const routes: RouteObject[] = [
  {
    path: '/',
    name: 'app',
    element: <App />,
    meta: {
      title: 'app首页',
      isAuth: false,
    },
    children: [
      {
        path: 'index',
        name: 'index',
        element: <Index />,
        meta: {
          title: '首页',
          isAuth: true
        }
      },
      {
        path: 'todu',
        name: 'todu',
        element: <Todu />,
        meta: {
          title: 'todu',
          isAuth: true
        }
      }
    ]
  },
  {
    path: '/login',
    element: <Login />
  }
];

const router = createBrowserRouter(routes)

export default router;