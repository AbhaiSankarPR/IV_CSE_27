import { Outlet } from "react-router-dom"; // Import Outlet
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
