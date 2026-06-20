import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaSearch, FaPlus } from "react-icons/fa";
import { useState } from "react";

function Navbar({
  searchTerm,
  setSearchTerm,
  isLoggedIn,
  setIsLoggedIn,
}) {
  const location = useLocation();
  const navigate = useNavigate();

  const [showSearch, setShowSearch] =
    useState(false);

  function handleLogout() {
    const confirmLogout = window.confirm(
      "Are you sure you want to logout?"
    );

    if (confirmLogout) {
      localStorage.removeItem(
        "isLoggedIn"
      );

      setIsLoggedIn(false);

      navigate("/");
    }
  }

  return (
    <nav className="navbar">
      <Link
        to="/"
        className="logo-link"
      >
        <h2>InkSphere</h2>
      </Link>

      <div className="nav-links">
        <Link
          to="/"
          className={
            location.pathname === "/"
              ? "active"
              : ""
          }
        >
          Home
        </Link>

        {!isLoggedIn && (
          <>
            <Link
              to="/login"
              className={
                location.pathname ===
                "/login"
                  ? "active"
                  : ""
              }
            >
              Login
            </Link>

            <Link
              to="/register"
              className={
                location.pathname ===
                "/register"
                  ? "active"
                  : ""
              }
            >
              Register
            </Link>
          </>
        )}

        <Link
          to="/profile"
          className={
            location.pathname ===
            "/profile"
              ? "active"
              : ""
          }
        >
          Profile
        </Link>

        {isLoggedIn && (
          <span
            className="nav-logout"
            onClick={handleLogout}
          >
            Logout
          </span>
        )}

        <div className="search-wrapper">
          <FaSearch
            className="nav-icon"
            onClick={() =>
              setShowSearch(
                !showSearch
              )
            }
          />

          {showSearch && (
            <div className="search-dropdown">
              <input
                type="text"
                placeholder="Search blogs..."
                className="nav-search"
                value={searchTerm}
                onChange={(e) =>
                  setSearchTerm(
                    e.target.value
                  )
                }
                autoFocus
              />
            </div>
          )}
        </div>

        <FaPlus
          className="nav-icon"
          onClick={() =>
            navigate(
              "/create-blog"
            )
          }
        />
      </div>
    </nav>
  );
}

export default Navbar;