import {lazy} from 'react'
import { createBrowserRouter } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom'

const App = lazy(() => import('../App'))
const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />
  }
];

export default createBrowserRouter(routes);