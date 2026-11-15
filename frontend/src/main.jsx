import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { AuthProvider } from "./context/auth/Provider";
import "./index.css";
import "leaflet/dist/leaflet.css";
import { reloadOnceForStaleBuild } from "./utils/staleBuild";

// Vite fires this when a page file or its CSS fails to preload, which happens
// when this copy of the app is older than the deployed one.
window.addEventListener("vite:preloadError", (event) => {
  if (reloadOnceForStaleBuild()) event.preventDefault();
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
