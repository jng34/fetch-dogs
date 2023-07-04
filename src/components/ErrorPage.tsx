import { useRouteError } from "react-router-dom";

function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  function isError(error: any): error is { statusText: string, message: string } {
    return "Error" in error;
  }

  return (
    <div>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      {isError(error) &&
      <p>
        <i>{error.statusText || error.message}</i>
      </p>}
    </div>
  );
}

export default ErrorPage;