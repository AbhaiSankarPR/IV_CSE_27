import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";

function App() {
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
