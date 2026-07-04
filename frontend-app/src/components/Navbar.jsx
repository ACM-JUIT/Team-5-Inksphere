import { useState, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";

function Navbar({ searchTerm, setSearchTerm }) {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn") === "true");
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthChange = () => {
      setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
    };

    window.addEventListener("authChange", handleAuthChange);
    return () => window.removeEventListener("authChange", handleAuthChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    window.dispatchEvent(new Event("authChange"));
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo-link">
        <h2>InkSphere</h2>
      </Link>

      <div className="nav-links">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/trending">Trending</NavLink>

        {isLoggedIn ? (
          <div style={{ display: "flex", alignItems: "center", gap: "20px", marginLeft: "10px" }}>
            <NavLink to="/profile" style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none" }}>
              <span style={{ fontSize: "14px", fontWeight: "500" }}>Profile</span>
            </NavLink>
            <span className="nav-logout" onClick={handleLogout} style={{ cursor: "pointer", fontSize: "14px", color: "rgba(255,255,255,0.6)" }}>
              Logout
            </span>
          </div>
        ) : (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
          </>
        )}

        <div className="search-wrapper" style={{ display: "flex", alignItems: "center", position: "relative", marginLeft: "10px" }}>
          <span className="nav-icon" onClick={() => setShowSearch(!showSearch)} style={{ cursor: "pointer", display: "flex", alignItems: "center" }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </span>

          {showSearch && (
            <div className="search-dropdown">
              <input
                type="text"
                className="nav-search"
                placeholder="Search blogs..."
                value={searchTerm || ""}
                onChange={(e) => setSearchTerm && setSearchTerm(e.target.value)}
                autoFocus
              />
            </div>
          )}
        </div>

        <NavLink to="/create-blog" className="create-nav-btn" style={{ marginLeft: "10px" }}>+ Create Blog</NavLink>
      </div>
    </nav>
  );
}

export default Navbar;