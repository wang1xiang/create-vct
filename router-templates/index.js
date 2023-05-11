export const packages = {
  'react-router': '^6.11.1',
  'react-router-dom': '^6.11.1',
}

export const App = `import './App.scss';
import routers from './routes/routerConfig';
import { useRoutes } from 'react-router-dom';
import { Suspense } from 'react';
import { Spin } from 'antd';

function App() {
  const elements = useRoutes(routers);
  return <Suspense fallback={<Spin />}>{elements}</Suspense>;
}

export default App;
`

export const Main = `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App';
import { BrowserRouter } from 'react-router-dom';
import './index.scss';
import 'antd/dist/reset.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
`
