import { useRouteError } from "react-router-dom";

interface RouteError extends Error {
    statusText?: string;
}

export default function ErrorView() {
  const error = useRouteError() as RouteError | undefined;
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error?.statusText || error?.message || 'Page not found.'}</i>
      </p>
    </div>
  );
}