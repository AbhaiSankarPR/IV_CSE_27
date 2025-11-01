import { createBrowserRouter } from "react-router-dom";
import App from "../App";

import Home from "../pages/Home";
import Coordinators from "../pages/Coordinators";
import Images from "../pages/Images";
import ErrorPage from "../pages/ErrorPage";
import Login from "../pages/Login";

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
        path: "/login",
        element: <Login />,
      },
      {
        path: "/schedule",
        element: <div>Schedule Page Coming Soon...</div>,
      },
    ],
  },
]);
