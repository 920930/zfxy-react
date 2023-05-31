import React from 'react'
import { Navigate, createBrowserRouter, redirect } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'
import { lazy } from 'react'
import store from '../store'
import App from '../App'

declare module 'react-router' {
  interface IndexRouteObject {
    name?: string
    meta?: {
      title: string
      auth: boolean
    }
  }
  interface NonIndexRouteObject {
    name?: string
    meta?: {
      title: string
      auth: boolean
    }
  }
}

// const lazyLoad = (url: string, props?: unknown, children?: React.ReactNode) => React.createElement(lazy(() => import(`../pages/${url}`)), props, children);

export const routes: RouteObject[] = [
  {
    path: '/',
    name: 'app',
    element: <App />,
    errorElement: <Navigate to='/index' />,
    meta: {
      title: 'app首页',
      auth: true,
    },
    children: [
      {
        index: true,
        element: <Navigate to='index' />
      },
      {
        path: 'index',
        name: 'appIndex',
        element: React.createElement(lazy(() => import('../pages/Home'))),
        meta: {
          title: 'appIndex',
          auth: true,
        },
      },
      {
        path: 'user',
        name: 'user',
        element: React.createElement(lazy(() => import('../pages/user'))),
        meta: {
          title: 'user',
          auth: true,
        },
        children: [
          {
            index: true,
            element: <Navigate to='index' />
          },
          {
            path: 'index',
            name: 'userIndex',
            element: React.createElement(lazy(() => import('../pages/user/list'))),
            meta: {
              title: 'userIndex',
              auth: true,
            },
          },
          {
            path: ':id',
            name: 'userShow',
            element: React.createElement(lazy(() => import('../pages/user/show'))),
            meta: {
              title: 'userShow',
              auth: true,
            },
          },
          {
            path: ':id/edit',
            name: 'userEdit',
            element: React.createElement(lazy(() => import('../pages/user/edit'))),
            meta: {
              title: 'userEdit',
              auth: true,
            },
          },
        ]
      },
      {
        path: 'note',
        name: 'note',
        element: React.createElement(lazy(() => import('../pages/note'))),
        meta: {
          title: 'note',
          auth: true,
        }
      },
      {
        path: 'adminer',
        name: 'adminer',
        element: React.createElement(lazy(() => import('../pages/adminer'))),
        meta: {
          title: 'adminer',
          auth: true,
        },
        children: [
          {
            index: true,
            element: <Navigate to='index' />
          },
          {
            path: 'index',
            name: 'adminerIndex',
            element: React.createElement(lazy(() => import('../pages/adminer/list'))),
            meta: {
              title: 'adminerIndex',
              auth: true,
            }
          },
          {
            path: ':id',
            name: 'adminerShow',
            element: React.createElement(lazy(() => import('../pages/adminer/show'))),
            meta: {
              title: 'adminerShow',
              auth: true,
            }
          },
          {
            path: ':id/edit',
            name: 'adminerEdit',
            element: React.createElement(lazy(() => import('../pages/adminer/edit'))),
            meta: {
              title: 'adminerEdit',
              auth: true,
            },
            loader(e){
              const uid = Number.parseInt(e.params.id || '0')
              const me = store.getState().userReducer.user;
              if(me.id === uid) return null
              if(me.roleId === 3) return redirect('/me')
              return null
              // return store.getState().userReducer.user.roleId === 1 ? null : redirect('/index')
            }
          }
        ]
      },
      {
        path: 'me',
        name: 'me',
        element: React.createElement(lazy(() => import('../pages/me'))),
        meta: {
          title: 'me',
          auth: true,
        },
      },
      {
        path: 'trade',
        name: 'trade',
        element: React.createElement(lazy(() => import('../pages/trade'))),
        meta: {
          title: 'trade',
          auth: true,
        },
      },
      {
        path: 'market',
        name: 'market',
        element: React.createElement(lazy(() => import('../pages/market'))),
        meta: {
          title: 'market',
          auth: true,
        },
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    element: React.createElement(lazy(() => import('../pages/auth/login'))),
    loader() {
      // 如果已经登录，还要进入login页面，将被跳转到首页
      return store.getState().userReducer.token ? redirect('/index') : null
    },
  },
  {
    path: '/excel/:code',
    name: 'excel',
    element: React.createElement(lazy(() => import('../pages/excel')))
  },
  {
    path: '*',
    element: <Navigate to='/index' />
  }
]

const router = createBrowserRouter(routes)

export default router
