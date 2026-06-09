import Navbar from "../components/Navbar";

function Register() {
  return (
    <div>
      <Navbar />

      <div className="register-container">
        <h1>Register</h1>

        <form className="register-form">
          <input
            type="text"
            placeholder="Enter Name"
          />

          <input
            type="email"
            placeholder="Enter Email"
          />

          <input
            type="password"
            placeholder="Enter Password"
          />

          <button>Register</button>
        </form>
      </div>
    </div>
  );
}

export default Register;