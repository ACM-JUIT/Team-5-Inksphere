import { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="login-page">
      <div className="login-left">
        <div className="login-brand">
          <div className="brand-icon">✍</div>
          <span>InkSphere</span>
        </div>
        <div className="login-left-content">
          <h2>Your ideas deserve to be heard.</h2>
          <p>Join thousands of writers sharing stories, knowledge, and perspectives every day.</p>
          <div className="login-stats">
            <div><strong>12k+</strong><span>Writers</span></div>
            <div><strong>48k+</strong><span>Blogs published</span></div>
            <div><strong>200k+</strong><span>Readers</span></div>
          </div>
          <div className="login-testimonial">
            <p>"InkSphere helped me find my voice and connect with readers I never thought I'd reach."</p>
            <span>— Priya S., Tech writer</span>
          </div>
        </div>
        <p className="login-footer">© 2026 InkSphere</p>
      </div>

      <div className="login-right">
        <div className="login-form-wrap">
          <h1>Welcome back</h1>
          <p className="login-subtitle">Sign in to continue writing and reading.</p>

          <div className="input-field">
            <label>Email address</label>
            <div className="input-icon-wrap">
              <span className="input-icon">✉</span>
              <input type="email" placeholder="you@example.com" />
            </div>
          </div>

          <div className="input-field">
            <label>Password</label>
            <div className="input-icon-wrap">
              <span className="input-icon">🔒</span>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
              />
              <button
                className="eye-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁"}
              </button>
            </div>
          </div>

          <div className="forgot-link">
            <Link to="/forgot-password">Forgot password?</Link>
          </div>

          <button className="login-submit-btn">Sign in</button>

          <div className="login-divider"><span>or continue with</span></div>

          <button className="google-btn">Continue with Google</button>

          <p className="signup-link">
            Don't have an account? <Link to="/register">Sign up free</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;