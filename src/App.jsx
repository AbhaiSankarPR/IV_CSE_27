import './App.css';
import Navibar from "./components/navibar.jsx";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// example placeholder pages
import Home from './pages/Home';
// import Schedule from './pages/Schedule';
import Coordinators from './pages/coordinators';
// import Images from './pages/Images';

function App() {
  return (
    <Router>
      <Navibar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/schedule" element={<Schedule />} /> */}
        <Route path="/coordinators" element={<Coordinators />} />
        {/* <Route path="/images" element={<Images />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
