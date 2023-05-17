const e={axios:"^1.4.0","react-query":"^3.39.3"},t=`import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App';
import './index.scss';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import client from './api/query/query.client';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      {/* \u6DFB\u52A0devtools */}
      {process.env.NODE_ENV === 'development' ? (
        <ReactQueryDevtools
          initialIsOpen={false}
          position="bottom-right"
        />
      ) : (
        ''
      )}
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
`,r=`import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App';
import './index.scss';
import 'antd/dist/reset.css';
import zhCN from 'antd/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import { ConfigProvider } from 'antd';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import client from './api/query/query.client';

dayjs.locale('zh-cn');

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ConfigProvider locale={zhCN}>
      <QueryClientProvider client={client}>
        {/* \u6DFB\u52A0devtools */}
        {process.env.NODE_ENV === 'development' ? (
          <ReactQueryDevtools
            initialIsOpen={false}
            position="bottom-right"
          />
        ) : (
          ''
        )}
        <App />
      </QueryClientProvider>
    </ConfigProvider>
  </React.StrictMode>
);
`,o=`import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App';
import { BrowserRouter } from 'react-router-dom';
import './index.scss';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import client from './api/query/query.client';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={client}>
        {/* \u6DFB\u52A0devtools */}
        {process.env.NODE_ENV === 'development' ? (
          <ReactQueryDevtools
            initialIsOpen={false}
            position="bottom-right"
          />
        ) : (
          ''
        )}
        <App />
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
`,i=`import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App';
import './index.scss';
import 'antd/dist/reset.css';
import zhCN from 'antd/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import { ConfigProvider } from 'antd';
import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import client from './api/query/query.client';

dayjs.locale('zh-cn');

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ConfigProvider locale={zhCN}>
      <BrowserRouter>
        <QueryClientProvider client={client}>
          {/* \u6DFB\u52A0devtools */}
          {process.env.NODE_ENV === 'development' ? (
            <ReactQueryDevtools
              initialIsOpen={false}
              position="bottom-right"
            />
          ) : (
            ''
          )}
          <App />
        </QueryClientProvider>
      </BrowserRouter>
    </ConfigProvider>
  </React.StrictMode>
);
`,c=`import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App';
import './index.scss';
import { Provider } from 'react-redux';
import { store } from './store';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import client from './api/query/query.client';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={client}>
        {/* \u6DFB\u52A0devtools */}
        {process.env.NODE_ENV === 'development' ? (
          <ReactQueryDevtools
            initialIsOpen={false}
            position="bottom-right"
          />
        ) : (
          ''
        )}
        <App />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);
`,m=`import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App';
import { BrowserRouter } from 'react-router-dom';
import './index.scss';
import { Provider } from 'react-redux';
import { store } from './store';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import client from './api/query/query.client';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <QueryClientProvider client={client}>
          {/* \u6DFB\u52A0devtools */}
          {process.env.NODE_ENV === 'development' ? (
            <ReactQueryDevtools
              initialIsOpen={false}
              position="bottom-right"
            />
          ) : (
            ''
          )}
          <App />
        </QueryClientProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
`,n=`import React from 'react';
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
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import client from './api/query/query.client';

dayjs.locale('zh-cn');

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ConfigProvider locale={zhCN}>
      <Provider store={store}>
        <QueryClientProvider client={client}>
          {/* \u6DFB\u52A0devtools */}
          {process.env.NODE_ENV === 'development' ? (
            <ReactQueryDevtools
              initialIsOpen={false}
              position="bottom-right"
            />
          ) : (
            ''
          )}
          <App />
        </QueryClientProvider>
      </Provider>
    </ConfigProvider>
  </React.StrictMode>
);
`,a=`import React from 'react';
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
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import client from './api/query/query.client';

dayjs.locale('zh-cn');

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ConfigProvider locale={zhCN}>
      <BrowserRouter>
        <Provider store={store}>
          <QueryClientProvider client={client}>
            {/* \u6DFB\u52A0devtools */}
            {process.env.NODE_ENV === 'development' ? (
              <ReactQueryDevtools
                initialIsOpen={false}
                position="bottom-right"
              />
            ) : (
              ''
            )}
            <App />
          </QueryClientProvider>
        </Provider>
      </BrowserRouter>
    </ConfigProvider>
  </React.StrictMode>
);
`,p=`import { useState } from 'react';
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
      <ReactQueryDemo />
    </div>
  );
}

export default App;
`,d=`import { useState } from 'react';
import { Button } from 'antd';
import { Html5TwoTone } from '@ant-design/icons';
import ReactQueryDemo from '@/pages/ReactQueryDemo';
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
      <h2>react-query Demo</h2>
      <ReactQueryDemo />
    </div>
  );
}

export default App;
`,s=`import { useState } from 'react';
import ReduxToolkitDemo from '@/pages/ReduxToolkitDemo';
import ReactQueryDemo from '@/pages/ReactQueryDemo';
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
      <br />
      <h2>react-query Demo</h2>
      <ReactQueryDemo />
    </div>
  );
}

export default App;
`;export{d as Antd_App,r as Antd_Main,i as Antd_Router_Main,p as App,t as Main,n as Redux_Antd_Main,a as Redux_Antd_Router_Main,s as Redux_App,c as Redux_Main,m as Redux_Router_Main,o as Router_Main,e as packages};
