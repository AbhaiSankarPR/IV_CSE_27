import { Link, NavLink } from "react-router-dom";
import loginface from "../assets/loginface.svg";

function Navbar() {
  const getNavLinkClass = ({ isActive }) => {
    return isActive
      ? "text-white font-medium"
      : "text-text-mid no-underline transition-colors duration-200 hover:text-white";
  };

  return (
    <nav className="bg-dark-primary text-white flex items-center justify-between py-4 px-8 border-b border-[rgba(50,50,50,0.838)]">
      <div className="nav-left">
        <Link className="text-white font-semibold text-xl no-underline" to="/">
          IV Live
        </Link>
      </div>

      <div className="flex items-center gap-6">
        <NavLink className={getNavLinkClass} to="/">
          Overview
        </NavLink>
        <NavLink className={getNavLinkClass} to="/schedule">
          Schedule
        </NavLink>
        <NavLink className={getNavLinkClass} to="/images">
          Images
        </NavLink>
        <NavLink className={getNavLinkClass} to="/coordinators">
          Co-ordinators
        </NavLink>
        <div className="w-8 h-8 rounded-full overflow-hidden cursor-pointer">
          <img
            src={loginface}
            alt="loginface"
            className="w-full h-full object-cover block bg-text-mid"
          />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
