import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import router from './router'
import store from './store'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <React.Suspense fallback={<div>loading...</div>}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </React.Suspense>
  </React.StrictMode>,
)
