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

  const strengthLabels = ["", "Weak", "Fair", "Good", "Strong"];
  const strengthColors = ["", "#e24b4a", "#ef9f27", "#4f46e5", "#1d9e75"];
  const strength = getStrength();

  return (
    <div className="register-page">
      <div className="register-left">
        <div className="register-brand">
          <div className="brand-icon">✍</div>
          <span>InkSphere</span>
        </div>
        <div className="register-left-content">
          <h2>Start your writing journey today.</h2>
          <p>Create your free account and join a community of passionate writers and readers.</p>
          <div className="register-steps">
            <div className="reg-step">
              <div className="step-num">1</div>
              <div>
                <h4>Create your account</h4>
                <p>Takes less than 2 minutes to sign up for free.</p>
              </div>
            </div>
            <div className="reg-step">
              <div className="step-num">2</div>
              <div>
                <h4>Set up your profile</h4>
                <p>Tell readers a bit about yourself and your interests.</p>
              </div>
            </div>
            <div className="reg-step">
              <div className="step-num">3</div>
              <div>
                <h4>Publish your first blog</h4>
                <p>Write and share your ideas with the world instantly.</p>
              </div>
            </div>
          </div>
        </div>
        <p className="register-footer">© 2026 InkSphere</p>
      </div>

      <div className="register-right">
        <div className="register-form-wrap">
          <h1>Create your account</h1>
          <p className="reg-subtitle">Free forever. No credit card needed.</p>

          <div className="input-field">
            <label>Full name</label>
            <div className="input-icon-wrap">
              <span className="input-icon">👤</span>
              <input type="text" placeholder="Your full name" />
            </div>
          </div>

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
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                className="eye-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁"}
              </button>
            </div>
            {password.length > 0 && (
              <>
                <div className="strength-bar">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="strength-seg"
                      style={{
                        background: i <= strength ? strengthColors[strength] : "#e5e5e5"
                      }}
                    />
                  ))}
                </div>
                <span className="strength-label" style={{ color: strengthColors[strength] }}>
                  {strengthLabels[strength]}
                </span>
              </>
            )}
          </div>

          <div className="terms-check">
            <input type="checkbox" id="terms" />
            <label htmlFor="terms">
              I agree to the <Link to="/terms">Terms of Service</Link> and <Link to="/privacy">Privacy Policy</Link>
            </label>
          </div>

          <button className="register-submit-btn">Create account</button>

          <div className="login-divider"><span>or sign up with</span></div>

          <button className="google-btn">Continue with Google</button>

          <p className="signin-link">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;