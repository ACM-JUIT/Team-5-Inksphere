import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="not-found">
      <h1 style={{ fontFamily: "'Playfair Display', serif", background: "linear-gradient(135deg, #1d4ed8, #3b82f6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>404</h1>
      <h2 style={{ color: "#222" }}>Page Not Found</h2>
      <p style={{ fontSize: "18px" }}>The page you are looking for does not exist or has been moved.</p>
      <Link to="/">
        <button style={{ padding: "12px 30px", fontSize: "16px", borderRadius: "10px", background: "linear-gradient(135deg, #1d4ed8, #2563eb)", border: "none", color: "white", cursor: "pointer", marginTop: "20px", boxShadow: "0 10px 20px rgba(37, 99, 235, 0.2)" }}>
          Go Back Home
        </button>
      </Link>
    </div>
  );
}

export default NotFound;