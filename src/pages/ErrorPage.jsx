import { useRouteError, Link } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="bg-dark-primary text-white min-h-screen font-sans flex flex-col items-center justify-center text-center p-8">
      <h1 className="text-6xl font-bold text-red-500 mb-4">Oops!</h1>
      <p className="text-2xl text-text-mid mb-2">
        Sorry, an unexpected error has occurred.
      </p>
      <p className="text-lg text-gray-500 mb-8">
        <i>{error.statusText || error.message}</i>
      </p>
      <Link
        to="/"
        className="px-6 py-2 bg-brand-blue text-white rounded-lg font-semibold no-underline transition-transform hover:scale-105"
      >
        Go Back Home
      </Link>
    </div>
  );
}
