import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    localStorage.setItem("isLoggedIn", "true");
    
    window.dispatchEvent(new Event("authChange"));
    
    navigate("/");
  };

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
        
        <form onSubmit={handleSubmit}>
          <div className="glass-field">
            <label>Email</label>
            <div className="glass-input-wrap">
              <input 
                type="email" 
                placeholder="you@example.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>
          </div>

          <div className="glass-field">
            <label>Password</label>
            <div className="glass-input-wrap">
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="Enter your password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
              <button 
                type="button" 
                className="glass-eye" 
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          <div className="glass-forgot">
            <Link to="/forgot-password">Forgot password?</Link>
          </div>

          <button type="submit" className="glass-submit">Sign in</button>

          <div className="glass-divider">
            <div className="glass-dline"></div>
            <span>or continue with</span>
            <div className="glass-dline"></div>
          </div>

          <button type="button" className="glass-google">
            Continue with Google
          </button>

          <div className="glass-register">
            Don't have an account? <Link to="/register">Sign up free</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;