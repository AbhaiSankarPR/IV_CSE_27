import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import App from "../App";
import ProtectedRoute from "./ProtectedRoute";
import ErrorPage from "../pages/ErrorPage";
import { isStaleBuildError, reloadOnceForStaleBuild } from "../utils/staleBuild";

// Like React.lazy, but if the page file is missing because a newer version was
// deployed, reload once with fresh files instead of showing the error page.
const lazyPage = (load) =>
  lazy(() =>
    load().catch((error) => {
      if (isStaleBuildError(error) && reloadOnceForStaleBuild()) {
        return new Promise(() => {}); // keep showing the loader while reloading
      }
      throw error;
    })
  );

const Home = lazyPage(() => import("../pages/Home"));
const Coordinators = lazyPage(() => import("../pages/Coordinators"));
const Images = lazyPage(() => import("../pages/Images"));
const AuthPage = lazyPage(() => import("../pages/AuthPage"));
const Schedule = lazyPage(() => import("../pages/Schedule"));
const Map = lazyPage(() => import("../pages/LiveMap"));
const Dashboard = lazyPage(() => import("../pages/admin/dashboard"));
const Memories = lazyPage(() => import("../pages/Memories"));
const Credit = lazyPage(() => import("../pages/credit/CreditsRoll"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/coordinators",
        element: <Coordinators />,
      },
      {
        path: "/images",
        element: <Images />,
      },
      {
        path: "/auth",
        element: <AuthPage />,
      },
      {
        path: "/schedule",
        element: <Schedule />,
      },
      {
        path: "/map",
        element: <Map />,
      },
      {
        path: "/dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "/memories",
        element: (
          <ProtectedRoute>
            <Memories />
          </ProtectedRoute>
        ),
      },
      {
        path: "/credits",
        element: <Credit />,
      },
    ],
  },
]);
