import { useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <div id="error-page">
      <h1>404</h1>
      <p>你访问的页面不存在</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
