import { useEffect, Suspense } from "react";
import { Outlet } from "react-router-dom";
import FaviconSetter from "./FaviconSetter.jsx";
import Navbar from "./components/Navbar.jsx";
import Snowfalls from "./components/Snowfall.jsx";
import { Analytics } from "@vercel/analytics/react";
import Loading from "./components/Loading.jsx";

function App() {
  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}`)
      .then((res) => res.text())
      .then((data) => console.log("Backend awake:", data))
      .catch((err) => console.error("Warm-up failed:", err));
  }, []);

  return (
    <>
      <Snowfalls style={{ zIndex: 0 }} numFlakes={40} wind={0.1} />
      <Analytics />
      <FaviconSetter />
      <div className="bg-dark-primary text-white w-screen h-screen overflow-x-hidden font-sans flex flex-col">
        <Navbar />
        <main className="flex-1 overflow-y-auto">
          <Suspense fallback={<Loading />}>
            <Outlet />
          </Suspense>
        </main>
      </div>
    </>
  );
}

export default App;
