import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar">
      <Link to="/">
        <h2>InkSphere</h2>
      </Link>

      <div className="nav-links">
        <Link
          to="/"
          className={location.pathname === "/" ? "active" : ""}
        >
          Home
        </Link>

        <Link
          to="/login"
          className={location.pathname === "/login" ? "active" : ""}
        >
          Login
        </Link>

        <Link
          to="/register"
          className={location.pathname === "/register" ? "active" : ""}
        >
          Register
        </Link>

        <Link
          to="/profile"
          className={location.pathname === "/profile" ? "active" : ""}
        >
          Profile
        </Link>

        <Link
          to="/create-blog"
          className={location.pathname === "/create-blog" ? "active" : ""}
        >
          Create Blog
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;