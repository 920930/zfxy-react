import React from 'react';
import { createBrowserRouter, redirect } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom';
import { lazy } from 'react';
import store from '../store';

declare module 'react-router'{
  interface IndexRouteObject {
    name?: string;
    meta?: {
      title: string;
      auth: boolean;
    }
  }
  interface NonIndexRouteObject{
    name?: string;
    meta?: {
      title: string;
      auth: boolean;
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
        path: 'todu',
        name: 'todu',
        element: React.createElement(lazy(() => import('../pages/todu'))),
        meta: {
          title: 'todu',
          auth: true
        }
      },
      {
        path: 'me',
        name: 'me',
        element: React.createElement(lazy(() => import('../pages/me'))),
        meta: {
          title: 'me',
          auth: true
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    element: React.createElement(lazy(() => import('../pages/auth/login'))),
    loader(){
      // 如果已经登录，还要进入login页面，将被跳转到首页
      return store.getState().userReducer.token ? redirect('/') : null;
    }
  }
];

const router = createBrowserRouter(routes)

export default router;