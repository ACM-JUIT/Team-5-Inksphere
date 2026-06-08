import Navbar from "../components/Navbar";

function Login() {
  return (
    <div>
      <Navbar />

      <h1>Login</h1>

      <form>
        <input type="email" placeholder="Enter Email" />

        <br />
        <br />

        <input type="password" placeholder="Enter Password" />

        <br />
        <br />

        <button>Login</button>
      </form>
    </div>
  );
}

export default Login;