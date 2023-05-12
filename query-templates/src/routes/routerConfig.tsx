import ErrorPage from '@/pages/ErrorPage';
import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

// 快速导入工具函数
const lazyLoad = (moduleName: string) =>
  lazy(() => import(`@/pages/${moduleName}/index.tsx`));

const Home = lazyLoad('Home');
const About = lazyLoad('About');
const QueryDemo = lazyLoad('QueryDemo');

const routers: RouteObject[] = [
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
    path: 'about',
    element: <About />,
  },
  {
    path: 'queryDemo',
    element: <QueryDemo />,
  },
];

export default routers;
