import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";

function App() {

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}`)
      .then((res) => res.text())
      .then((data) => console.log("Backend awake:", data))
      .catch((err) => console.error("Warm-up failed:", err));
  }, []);

  return (
    <div className="bg-dark-primary text-white min-h-screen font-sans">
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
