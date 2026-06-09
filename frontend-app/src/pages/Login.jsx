import Navbar from "../components/Navbar";

function Login() {
  return (
    <div>
      <Navbar />

      <div className="login-container">
        <h1>Login</h1>

        <form className="login-form">
          <input
            type="email"
            placeholder="Enter Email"
          />

          <input
            type="password"
            placeholder="Enter Password"
          />

          <button>Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;