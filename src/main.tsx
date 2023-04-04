import React from 'react'
import ReactDOM from 'react-dom/client'
import './main.css'
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom'
import store from './store';
import router from './router'
import { DotLoading } from 'antd-mobile'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
    <React.Suspense fallback={<DotLoading />}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </React.Suspense>
  // </React.StrictMode>
)
