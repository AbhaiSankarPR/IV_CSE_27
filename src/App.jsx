import { Outlet } from "react-router-dom"; // Import Outlet
import Navibar from "./components/Navbar.jsx";

function App() {
  return (
    <div className="bg-dark-primary text-white min-h-screen font-sans">
      <Navibar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
