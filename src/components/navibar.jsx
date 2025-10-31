// components/Navibar.jsx
import './navibar.css';

import { Link } from 'react-router-dom';
import loginface from '../assets/loginface.svg';

function Navibar() {
  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link className="logo" to="/">IV Live</Link>
      </div>

      <div className="nav-right">
        <Link to="/">Overview</Link>
        <Link to="/schedule">Schedule</Link>
        <Link to="/coordinators">Co-ordinators</Link>
        <Link to="/images">Images</Link>

        <div className="avatar">
          <img src={loginface} alt="loginface" />
        </div>
      </div>
    </nav>
  );
}

export default Navibar;
