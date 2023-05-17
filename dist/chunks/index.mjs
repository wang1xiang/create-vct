const t={"@ant-design/icons":"^5.0.1",antd:"^5.4.6",dayjs:"^1.11.7"},o=`import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import { Button } from 'antd';
import { Html5TwoTone } from '@ant-design/icons';
import './App.scss';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
      <Button type="primary" onClick={() => window.alert('antd button')}>
        <Html5TwoTone />
        Button
      </Button>
    </div>
  );
}

export default App;
`,e=`import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App';
import 'antd/dist/reset.css';
import './index.scss';
import zhCN from 'antd/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import { ConfigProvider } from 'antd';

dayjs.locale('zh-cn');

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ConfigProvider locale={zhCN}>
      <App />
    </ConfigProvider>
  </React.StrictMode>
);
`;export{o as App,e as Main,t as packages};
