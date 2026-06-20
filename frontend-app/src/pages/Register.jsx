import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] =
    useState(false);
  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    const emailRegex =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (!name) {
      setError("Name is required");
      return;
    }

    if (!email) {
      setError("Email is required");
      return;
    }

    if (!password) {
      setError("Password is required");
      return;
    }

    if (!confirmPassword) {
      setError(
        "Confirm Password is required"
      );
      return;
    }

    if (!emailRegex.test(email)) {
      setError(
        "Enter a valid email address"
      );
      return;
    }

    if (!passwordRegex.test(password)) {
      setError(
        "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character"
      );
      return;
    }

    if (password !== confirmPassword) {
      setError(
        "Passwords do not match"
      );
      return;
    }

    setError("");

    localStorage.setItem(
      "isLoggedIn",
      "true"
    );

    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setShowPassword(false);
    setShowConfirmPassword(false);

    window.location.href = "/";
  }

  return (
    <div>
      <div className="register-container">
        <h1>Register</h1>

        <form
          className="register-form"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setError("");
            }}
          />

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
          />

          <div className="password-field">
            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              placeholder="Enter Password"
              value={password}
              onChange={(e) => {
                setPassword(
                  e.target.value
                );
                setError("");
              }}
            />

            <span
              onClick={() =>
                setShowPassword(
                  !showPassword
                )
              }
            >
              {showPassword ? (
                <FaEyeSlash />
              ) : (
                <FaEye />
              )}
            </span>
          </div>

          <div className="password-field">
            <input
              type={
                showConfirmPassword
                  ? "text"
                  : "password"
              }
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(
                  e.target.value
                );
                setError("");
              }}
            />

            <span
              onClick={() =>
                setShowConfirmPassword(
                  !showConfirmPassword
                )
              }
            >
              {showConfirmPassword ? (
                <FaEyeSlash />
              ) : (
                <FaEye />
              )}
            </span>
          </div>

          {error && (
            <p className="error-message">
              {error}
            </p>
          )}

          <button type="submit">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;