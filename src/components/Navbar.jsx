import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import loginface from "../assets/loginface.svg";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const getNavLinkClass = ({ isActive }) => {
    return isActive
      ? "text-white font-medium"
      : "text-text-mid no-underline transition-colors duration-200 hover:text-white";
  };

  return (
    <nav className="bg-dark-primary text-white border-b border-[rgba(50,50,50,0.838)]">
      <div className="flex items-center justify-between py-4 px-6 md:px-8">
        <Link className="text-white font-semibold text-xl no-underline" to="/">
          IV Live
        </Link>

        <button
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span
            className={`block w-6 h-[2px] bg-white rounded transition-all duration-300 ${
              menuOpen ? "rotate-45 translate-y-[6px]" : ""
            }`}
          ></span>
          <span
            className={`block w-6 h-[2px] bg-white rounded my-[4px] transition-all duration-300 ${
              menuOpen ? "opacity-0" : ""
            }`}
          ></span>
          <span
            className={`block w-6 h-[2px] bg-white rounded transition-all duration-300 ${
              menuOpen ? "-rotate-45 -translate-y-[6px]" : ""
            }`}
          ></span>
        </button>

        <div className="hidden md:flex items-center gap-6">
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
          <NavLink to="/login">
            <div className="w-8 h-8 rounded-full overflow-hidden cursor-pointer">
              <img
                src={loginface}
                alt="loginface"
                className="w-full h-full object-cover block bg-text-mid"
              />
            </div>
          </NavLink>
        </div>
      </div>

      <div
        className={`md:hidden flex flex-col items-center gap-4 pb-4 bg-dark-primary transition-all duration-500 overflow-hidden ${
          menuOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <NavLink
          className={getNavLinkClass}
          to="/"
          onClick={() => setMenuOpen(false)}
        >
          Overview
        </NavLink>
        <NavLink
          className={getNavLinkClass}
          to="/schedule"
          onClick={() => setMenuOpen(false)}
        >
          Schedule
        </NavLink>
        <NavLink
          className={getNavLinkClass}
          to="/images"
          onClick={() => setMenuOpen(false)}
        >
          Images
        </NavLink>
        <NavLink
          className={getNavLinkClass}
          to="/coordinators"
          onClick={() => setMenuOpen(false)}
        >
          Co-ordinators
        </NavLink>
        <NavLink to="/auth" onClick={() => setMenuOpen(false)}>
          <div className="w-8 h-8 rounded-full overflow-hidden cursor-pointer">
            <img
              src={loginface}
              alt="loginface"
              className="w-full h-full object-cover block bg-text-mid"
            />
          </div>
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
