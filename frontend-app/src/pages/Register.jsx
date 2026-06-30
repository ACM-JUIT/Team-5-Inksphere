import { useState } from "react";
import { Link } from "react-router-dom";

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const getStrength = () => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  };

  const labels = ["", "Weak", "Fair", "Good", "Strong"];
  const colors = ["", "#ef4444", "#f97316", "#3b82f6", "#22c55e"];
  const strength = getStrength();

  return (
    <div className="reg-page">

      <div className="rball rb1"></div>
      <div className="rball rb2"></div>
      <div className="rball rb3"></div>
      <div className="rball rb4"></div>
      <div className="rball rb5"></div>
      <div className="rball rb6"></div>

      <div className="reg-glass">
        <div className="reg-logo">
          <div className="reg-logo-dot">✍</div>
          <span>InkSphere</span>
        </div>

        <h1>Create account</h1>
        <p className="reg-sub">Join thousands of writers on InkSphere</p>

        <div className="reg-field">
          <label>Full name</label>
          <div className="reg-iw">
            <input type="text" placeholder="Your full name" />
          </div>
        </div>

        <div className="reg-field">
          <label>Email</label>
          <div className="reg-iw">
            <input type="email" placeholder="you@example.com" />
          </div>
        </div>

        <div className="reg-field">
          <label>Password</label>
          <div className="reg-iw">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="reg-eye"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          <div className="strength-row">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="s-seg"
                style={{
                  background: i <= strength ? colors[strength] : "rgba(255,255,255,0.1)",
                }}
              />
            ))}
          </div>
          <div className="s-label" style={{ color: password.length === 0 ? "rgba(255,255,255,0.3)" : colors[strength] }}>
            {password.length === 0 ? "Min 8 characters" : labels[strength]}
          </div>
        </div>

        <div className="terms-row">
          <input type="checkbox" id="terms" />
          <span>
            I agree to the <Link to="/terms">Terms of Service</Link> and{" "}
            <Link to="/privacy">Privacy Policy</Link>
          </span>
        </div>

        <button className="reg-submit">Create account</button>

        <div className="reg-divider">
          <div className="reg-dline"></div>
          <span>or continue with</span>
          <div className="reg-dline"></div>
        </div>

        <button className="reg-google">Continue with Google</button>

        <p className="reg-login">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;