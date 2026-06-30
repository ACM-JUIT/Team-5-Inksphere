import { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="login-page-new">

      <div className="ball ball-1"></div>
      <div className="ball ball-2"></div>
      <div className="ball ball-3"></div>
      <div className="ball ball-4"></div>
      <div className="ball ball-5"></div>
      <div className="ball ball-6"></div>

      <div className="glass-card">
        <div className="glass-logo">
          <div className="glass-logo-dot"></div>
          
        </div>

        <h1>Login</h1>
        

        <div className="glass-field">
          <label>Email</label>
          <div className="glass-input-wrap">
            <span className="glass-icon"></span>
            <input type="email" placeholder="you@example.com" />
          </div>
        </div>

        <div className="glass-field">
          <label>Password</label>
          <div className="glass-input-wrap">
            <span className="glass-icon"></span>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
            />
            <button
              className="glass-eye"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁"}
            </button>
          </div>
        </div>

        <div className="glass-forgot">
          <Link to="/forgot-password">Forgot password?</Link>
        </div>

        <button className="glass-submit">Sign in</button>

        <div className="glass-divider">
          <div className="glass-dline"></div>
          <span>or continue with</span>
          <div className="glass-dline"></div>
        </div>

        <button className="glass-google">
          Continue with Google
        </button>

        <p className="glass-register">
          Don't have an account?{" "}
          <Link to="/register">Sign up free</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;