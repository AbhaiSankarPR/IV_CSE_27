import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { AuthProvider } from "./pages/AuthPage/AuthContext"; // ✅ import the provider
import "./index.css";
import "leaflet/dist/leaflet.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>   {/* ✅ wrap the entire app here */}
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
