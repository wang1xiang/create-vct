import ErrorPage from '@/pages/ErrorPage';
import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

// 快速导入工具函数
const lazyLoad = (moduleName: string) =>
  lazy(() => import(`@/pages/${moduleName}/index.tsx`));

const Home = lazyLoad('Home');
const About = lazyLoad('About');

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
];

export default routers;
