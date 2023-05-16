const packages = {
  "react-router": "^6.11.1",
  "react-router-dom": "^6.11.1"
};
const Main = `import React from 'react';
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
`;
const App = `import './App.scss';
import routers from './routes/routerConfig';
import { useRoutes } from 'react-router-dom';
import { Suspense } from 'react';

function App() {
  const elements = useRoutes(routers);
  return <Suspense fallback={<div>loading...</div>}>{elements}</Suspense>;
}

export default App;
`;
const Antd_App = `import './App.scss';
import routers from './routes/routerConfig';
import { useRoutes } from 'react-router-dom';
import { Suspense } from 'react';
import { Spin } from 'antd';

function App() {
  const elements = useRoutes(routers);
  return <Suspense fallback={<Spin />}>{elements}</Suspense>;
}

export default App;
`;
const Antd_Main = `import React from 'react';
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
`;

export { Antd_App, Antd_Main, App, Main, packages };
