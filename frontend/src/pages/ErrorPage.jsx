import { useState } from "react";
import { useRouteError, Link } from "react-router-dom";
import { isStaleBuildError, hardReload } from "../utils/staleBuild";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  const staleBuild = isStaleBuildError(error);
  const [reloading, setReloading] = useState(false);

  const reload = async () => {
    setReloading(true);
    await hardReload();
  };

  if (staleBuild) {
    return (
      <div className="bg-dark-primary text-white min-h-screen font-sans flex flex-col items-center justify-center text-center p-8">
        <h1 className="text-4xl font-bold mb-4">A new version is available</h1>
        <p className="text-lg text-text-mid mb-8 max-w-md">
          The app was updated since you last opened it. Reload to get the
          latest version.
        </p>
        <button
          onClick={reload}
          disabled={reloading}
          className="px-6 py-2 bg-brand-blue text-white rounded-lg font-semibold transition-transform hover:scale-105 disabled:opacity-60 cursor-pointer"
        >
          {reloading ? "Reloading..." : "Reload"}
        </button>
      </div>
    );
  }

  return (
    <div className="bg-dark-primary text-white min-h-screen font-sans flex flex-col items-center justify-center text-center p-8">
      <h1 className="text-6xl font-bold text-red-500 mb-4">Oops!</h1>
      <p className="text-2xl text-text-mid mb-2">
        Sorry, an unexpected error has occurred.
      </p>
      <p className="text-lg text-gray-500 mb-8">
        <i>{error?.statusText || error?.message}</i>
      </p>
      <Link
        to="/"
        className="px-6 py-2 bg-brand-blue text-white rounded-lg font-semibold no-underline transition-transform hover:scale-105"
      >
        Go Back to Home
      </Link>
    </div>
  );
}
