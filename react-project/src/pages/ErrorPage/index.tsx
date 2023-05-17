import { useRouteError } from 'react-router-dom';

type ErrorType = { [props: string]: string };
export default function ErrorPage() {
  const error = useRouteError() as ErrorType;

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
