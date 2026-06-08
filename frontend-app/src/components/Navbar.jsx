import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <h2>InkSphere</h2>

      <div>
        <Link to="/">Home</Link>

        {" | "}

        <Link to="/login">Login</Link>

        {" | "}

        <Link to="/register">Register</Link>

        {" | "}

        <Link to="/profile">Profile</Link>

        {" | "}

        <Link to="/create-blog">Create Blog</Link>
      </div>
    </nav>
  );
}

export default Navbar;