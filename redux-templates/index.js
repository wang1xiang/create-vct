export const packages = {
  '@reduxjs/toolkit': '^1.9.5',
  'react-redux': '^8.0.5',
}

export const Router_Main = `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App';
import { BrowserRouter } from 'react-router-dom';
import './index.scss';
import { Provider } from 'react-redux';
import { store } from './store';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
`

export const Antd_Main = `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App';
import './index.scss';
import 'antd/dist/reset.css';
import zhCN from 'antd/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import { ConfigProvider } from 'antd';
import { Provider } from 'react-redux';
import { store } from './store';

dayjs.locale('zh-cn');

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ConfigProvider locale={zhCN}>
      <Provider store={store}>
        <App />
      </Provider>
    </ConfigProvider>
  </React.StrictMode>
);
`
export const Antd_Router_Main = `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App';
import './index.scss';
import 'antd/dist/reset.css';
import zhCN from 'antd/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import { ConfigProvider } from 'antd';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';

dayjs.locale('zh-cn');

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ConfigProvider locale={zhCN}>
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </ConfigProvider>
  </React.StrictMode>
);
`
export const Main = `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App';
import './index.scss';
import { Provider } from 'react-redux';
import { store } from './store';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
        <App />
    </Provider>
  </React.StrictMode>
);
`
