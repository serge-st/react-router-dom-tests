import { useRouteError, isRouteErrorResponse } from "react-router-dom";

// https://github.com/remix-run/react-router/discussions/9628#discussioncomment-4385092

export default function ErrorPage() {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    error.data.message
  }

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        {isRouteErrorResponse(error)
            ? <i>{error.statusText}</i>
            : <pre>{JSON.stringify(error)}</pre>
        }
      </p>
    </div>
  );
}
