import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!accepted) {
      alert("Please agree to the Terms of Service and Privacy Policy.");
      return;
    }
    
    localStorage.setItem("isLoggedIn", "true");
    window.dispatchEvent(new Event("authChange"));
    navigate("/");
  };

  const strength = password.length > 8 ? 3 : password.length > 4 ? 2 : password.length > 0 ? 1 : 0;

  return (
    <div className="login-page-new">
      <div className="ball ball-1"></div>
      <div className="ball ball-2"></div>
      <div className="ball ball-3"></div>
      <div className="ball ball-4"></div>
      <div className="ball ball-5"></div>
      <div className="ball ball-6"></div>

      <div className="glass-card">
        
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", marginBottom: "16px" }}>
            
            <div style={{ width: "30px", height: "30px", background: "linear-gradient(135deg, #1e40af, #3b82f6)", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(37, 99, 235, 0.4)", fontSize: "16px" }}>
              ✍️
            </div>
            
            <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "24px", color: "#fff", fontWeight: "600", letterSpacing: "0.5px" }}>InkSphere</span>
          </div>
          
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "26px", color: "#fff", marginBottom: "6px", fontWeight: "600" }}>Create account</h1>
          <p style={{ fontSize: "13px", color: "rgba(255, 255, 255, 0.5)" }}>Join thousands of writers on InkSphere</p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="glass-field" style={{ marginBottom: "16px" }}>
            <label style={{ display: "block", fontSize: "11px", color: "rgba(255,255,255,0.6)", marginBottom: "8px", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.05em" }}>Full Name</label>
            <div className="glass-input-wrap">
              <input 
                type="text" 
                placeholder="Your full name" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required 
                style={{ width: "100%", padding: "14px 16px", background: "rgba(255, 255, 255, 0.05)", border: "0.5px solid rgba(255, 255, 255, 0.1)", borderRadius: "12px", fontSize: "14px", color: "#fff", outline: "none", boxSizing: "border-box" }}
              />
            </div>
          </div>

          <div className="glass-field" style={{ marginBottom: "16px" }}>
            <label style={{ display: "block", fontSize: "11px", color: "rgba(255,255,255,0.6)", marginBottom: "8px", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.05em" }}>Email</label>
            <div className="glass-input-wrap">
              <input 
                type="email" 
                placeholder="you@example.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
                style={{ width: "100%", padding: "14px 16px", background: "rgba(255, 255, 255, 0.05)", border: "0.5px solid rgba(255, 255, 255, 0.1)", borderRadius: "12px", fontSize: "14px", color: "#fff", outline: "none", boxSizing: "border-box" }}
              />
            </div>
          </div>

          <div className="glass-field" style={{ marginBottom: "8px" }}>
            <label style={{ display: "block", fontSize: "11px", color: "rgba(255,255,255,0.6)", marginBottom: "8px", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.05em" }}>Password</label>
            <div className="glass-input-wrap" style={{ position: "relative" }}>
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="Create a password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
                style={{ width: "100%", padding: "14px 16px", background: "rgba(255, 255, 255, 0.05)", border: "0.5px solid rgba(255, 255, 255, 0.1)", borderRadius: "12px", fontSize: "14px", color: "#fff", outline: "none", boxSizing: "border-box" }}
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "rgba(255,255,255,0.4)", fontSize: "12px", cursor: "pointer", fontFamily: "'Inter', sans-serif" }}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          
          <div style={{ display: "flex", gap: "6px", marginBottom: "8px" }}>
            <div style={{ height: "3px", flex: "1", borderRadius: "2px", transition: "all 0.3s", background: strength >= 1 ? "#3b82f6" : "rgba(255,255,255,0.1)", boxShadow: strength >= 1 ? "0 0 8px rgba(59,130,246,0.5)" : "none" }}></div>
            <div style={{ height: "3px", flex: "1", borderRadius: "2px", transition: "all 0.3s", background: strength >= 2 ? "#3b82f6" : "rgba(255,255,255,0.1)", boxShadow: strength >= 2 ? "0 0 8px rgba(59,130,246,0.5)" : "none" }}></div>
            <div style={{ height: "3px", flex: "1", borderRadius: "2px", transition: "all 0.3s", background: strength >= 3 ? "#3b82f6" : "rgba(255,255,255,0.1)", boxShadow: strength >= 3 ? "0 0 8px rgba(59,130,246,0.5)" : "none" }}></div>
          </div>
          <div style={{ fontSize: "11px", color: "rgba(255, 255, 255, 0.4)", marginBottom: "24px" }}>Min 8 characters</div>

          <div style={{ display: "flex", alignItems: "flex-start", gap: "10px", marginBottom: "24px" }}>
            <input 
              type="checkbox" 
              id="terms" 
              checked={accepted} 
              onChange={(e) => setAccepted(e.target.checked)} 
              style={{ width: "16px", height: "16px", cursor: "pointer", marginTop: "2px", accentColor: "#3b82f6" }}
            />
            <label htmlFor="terms" style={{ fontSize: "12px", color: "rgba(255, 255, 255, 0.6)", lineHeight: "1.4", cursor: "pointer" }}>
              I agree to the <Link to="#" style={{ color: "#60a5fa", textDecoration: "none" }}>Terms of Service</Link> and <Link to="#" style={{ color: "#60a5fa", textDecoration: "none" }}>Privacy Policy</Link>
            </label>
          </div>

          <button type="submit" className="glass-submit">Create account</button>

          <div className="glass-divider">
            <div className="glass-dline"></div>
            <span>or continue with</span>
            <div className="glass-dline"></div>
          </div>

          <button type="button" className="glass-google">
            Continue with Google
          </button>

          <div className="glass-register">
            Already have an account? <Link to="/login">Sign in</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;