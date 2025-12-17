import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import App from "../App";
import ProtectedRoute from "./ProtectedRoute";
import ErrorPage from "../pages/ErrorPage";

const Home = lazy(() => import("../pages/Home"));
const Coordinators = lazy(() => import("../pages/Coordinators"));
const Images = lazy(() => import("../pages/Images"));
const AuthPage = lazy(() => import("../pages/AuthPage"));
const Schedule = lazy(() => import("../pages/Schedule"));
const Map = lazy(() => import("../pages/LiveMap"));
const Dashboard = lazy(() => import("../pages/admin/dashboard"));
const Memories = lazy(() => import("../pages/Memories"));
const Credit = lazy(() => import("../pages/credit/CreditsRoll"));

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
