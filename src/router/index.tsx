import React from 'react'
import { Navigate, createBrowserRouter, redirect } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'
import { lazy } from 'react'
import store from '../store'

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
    element: React.createElement(lazy(() => import('../App'))),
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
              title: 'note',
              auth: true,
            }
          },
          {
            path: ':id',
            name: 'adminerShow',
            element: React.createElement(lazy(() => import('../pages/adminer/show'))),
            meta: {
              title: 'note',
              auth: true,
            }
          }
        ]
      },
      {
        path: 'me',
        name: 'me',
        element: React.createElement(lazy(() => import('../pages/auth/me'))),
        meta: {
          title: 'me',
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
      return store.getState().userReducer.token ? redirect('/') : null
    },
  },
  {
    path: '*',
    element: <Navigate to='/' />
  }
]

const router = createBrowserRouter(routes)

export default router
