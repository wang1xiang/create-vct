import ErrorPage from '@/pages/ErrorPage';
import { lazy } from 'react';

// 快速导入工具函数
const lazyLoad = (moduleName) =>
  lazy(() => import(`@/pages/${moduleName}/index.jsx`));

const Home = lazyLoad('Home');
const ReduxToolkitDemo = lazyLoad('ReduxToolkitDemo');
const ReactQueryDemo = lazyLoad('ReactQueryDemo');

const routers = [
  {
    path: '/',
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: 'home',
    element: <Home />,
  },
  {
    path: 'toolkit',
    element: <ReduxToolkitDemo />,
  },
  {
    path: 'query',
    element: <ReactQueryDemo />,
  },
];

export default routers;
