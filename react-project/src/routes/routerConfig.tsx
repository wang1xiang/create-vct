import ErrorPage from '@/pages/ErrorPage';
import AppLayout from '@/layout/AppLayout';
import { lazy } from 'react';
import { MetaMenu, AuthRouteObject } from './interface';

// 快速导入工具函数
const lazyLoad = (moduleName: string) =>
  lazy(() => import(`@/pages/${moduleName}/index.tsx`));

const Home = lazyLoad('Home');
const ReduxToolkitDemo = lazyLoad('ReduxToolkitDemo');
const ReactQueryDemo = lazyLoad('ReactQueryDemo');

const routers: AuthRouteObject<MetaMenu>[] = [
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    meta: {
      title: '',
    },
    children: [
      {
        path: 'home',
        element: <Home />,
        meta: {
          title: 'Home',
        },
      },
      {
        path: 'toolkit',
        element: <ReduxToolkitDemo />,
        meta: {
          title: 'React Toolkit',
        },
      },
      {
        path: 'query',
        element: <ReactQueryDemo />,
        meta: {
          title: 'React Query',
        },
      },
    ],
  },
];

export default routers;
