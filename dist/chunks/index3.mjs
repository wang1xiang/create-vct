const packages = {
  "@reduxjs/toolkit": "^1.9.5",
  "react-redux": "^8.0.5"
};
const Router_Main = `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App';
import { BrowserRouter } from 'react-router-dom';
import './index.scss';
import { Provider } from 'react-redux';
import { store } from './store';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
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
`;
const Antd_Router_Main = `import React from 'react';
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
`;
const Main = `import React from 'react';
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
`;
const App = `import { useState } from 'react';
import ReduxToolkitDemo from '@/pages/ReduxToolkitDemo';
import './App.scss';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
      <br />
      <h2>redux toolkit demo</h2>
      <ReduxToolkitDemo />
    </div>
  );
}

export default App;
`;
const Antd_App = `import { useState } from 'react';
import { Button } from 'antd';
import { Html5TwoTone } from '@ant-design/icons';
import ReduxToolkitDemo from '@/pages/ReduxToolkitDemo';
import './App.scss';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
      <br />
      <Button type="primary" onClick={() => window.alert('antd button')}>
        <Html5TwoTone />
        Button
      </Button>
      <br />
      <br />
      <h2>redux toolkit demo</h2>
      <ReduxToolkitDemo />
    </div>
  );
}

export default App;
`;

export { Antd_App, Antd_Main, Antd_Router_Main, App, Main, Router_Main, packages };
