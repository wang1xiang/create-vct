const t={"react-router":"^6.11.1","react-router-dom":"^6.11.1"},e=`import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

export default function AppLayout() {
  const location = useLocation()
  const router = useNavigate()
  useEffect(() => {
    location.pathname === '/' ? router('/home') : null
  }, [location.pathname])

  return (
    <div style={{ display: 'flex' }}>
      <section style={{ marginRight: 20 }}>sider</section>
      <section>
        <Outlet />
      </section>
    </div>
  )
}
`,o=`import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App';
import { BrowserRouter } from 'react-router-dom';
import './index.scss';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
`,r=`import './App.scss';
import routers from './routes/routerConfig';
import { useRoutes } from 'react-router-dom';
import { Suspense } from 'react';

function App() {
  const elements = useRoutes(routers);
  return <Suspense fallback={<div>loading...</div>}>{elements}</Suspense>;
}

export default App;
`,s=`import './App.scss';
import routers from './routes/routerConfig';
import { useRoutes } from 'react-router-dom';
import { Suspense } from 'react';
import { Spin } from 'antd';

function App() {
  const elements = useRoutes(routers);
  return <Suspense fallback={<Spin />}>{elements}</Suspense>;
}

export default App;
`,p=`import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App';
import './index.scss';
import 'antd/dist/reset.css';
import zhCN from 'antd/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import { ConfigProvider } from 'antd';
import { BrowserRouter } from 'react-router-dom';

dayjs.locale('zh-cn');

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ConfigProvider locale={zhCN}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ConfigProvider>
  </React.StrictMode>
);
`;export{s as Antd_App,p as Antd_Main,r as App,e as AppLayout,o as Main,t as packages};
