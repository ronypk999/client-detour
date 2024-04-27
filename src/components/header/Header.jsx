import { FaRegUserCircle, FaUserPlus } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import { WiDaySunny } from "react-icons/wi";
import { MdNightsStay } from "react-icons/md";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";

const Header = () => {
  const { user, load, logout } = useContext(AuthContext);
  const [theme, setTheme] = useState(
    JSON.parse(localStorage.getItem("theme")) || false
  );

  const handleThemeChange = () => {
    setTheme(!theme);
  };

  useEffect(() => {
    let newTheme = "light";
    if (theme) {
      newTheme = "dark";
    }

    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", JSON.stringify(theme));
  }, [theme]);

  const navlink = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/all-tourist-spot">All Tourists Spot</NavLink>
      </li>
      {load ? (
        <div className="pl-6 flex flex-col md:flex-row gap-6 items-center">
          <div className="skeleton h-4 w-24"></div>
          <div className="skeleton h-4 w-24"></div>
          <div className="skeleton h-4 w-24"></div>
        </div>
      ) : (
        user && (
          <>
            <li>
              <NavLink to="/profile">Update Profile</NavLink>
            </li>
            <li>
              <NavLink to="/list">My Lists</NavLink>
            </li>
            <li>
              <NavLink to="/add-tourist-spot">Add Tourists Spot</NavLink>
            </li>
          </>
        )
      )}
    </>
  );
  return (
    <>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navlink}
            </ul>
          </div>
          <Link to="/" className="btn btn-ghost text-xl">
            DeTour
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-3">{navlink}</ul>
        </div>
        <div className="navbar-end mr-3 gap-3">
          {load ? (
            <div className="flex flex-col gap-4 ">
              <div className="flex gap-4 items-center">
                <div className="skeleton w-12 h-12 rounded-full shrink-0"></div>
                <div className="flex flex-col gap-4">
                  <div className="skeleton h-4 w-12"></div>
                </div>
              </div>
            </div>
          ) : user ? (
            <>
              <div
                className="tooltip tooltip- tooltip-bottom z-50 tooltip-info"
                data-tip={user?.displayName ? user.displayName : "login please"}
              >
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img
                      alt="User"
                      src={
                        user?.photoURL
                          ? user.photoURL
                          : "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                      }
                    />
                  </div>
                </div>
              </div>
              <button onClick={logout} className="flex items-center gap-2">
                <span>Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="flex items-center gap-2">
                <FaRegUserCircle className="text-2xl"></FaRegUserCircle>
                <span>Login</span>
              </Link>
              <Link to="/signup" className="flex items-center gap-2">
                <FaUserPlus className="text-2xl"></FaUserPlus>
                <span>Register</span>
              </Link>
            </>
          )}

          <div onClick={handleThemeChange} className="text-xl">
            {theme ? <WiDaySunny></WiDaySunny> : <MdNightsStay></MdNightsStay>}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
