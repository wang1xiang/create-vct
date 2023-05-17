import './App.scss';
import routers from './routes/routerConfig';
import { useRoutes } from 'react-router-dom';
import { Suspense } from 'react';
import { Spin } from 'antd';

function App() {
  const elements = useRoutes(routers);
  return <Suspense fallback={<Spin />}>{elements}</Suspense>;
}

export default App;
