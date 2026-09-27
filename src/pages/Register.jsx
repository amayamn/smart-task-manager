import { Link } from "react-router-dom";

function Register() {
  return (
    <div className="auth-container">

      <div className="auth-box">

        <h1>Smart Task Manager</h1>

        <h2>Create Account</h2>

        <form>

          <label>Name</label>

          <input
            type="text"
            placeholder="Enter your name"
          />

          <label>Email</label>

          <input
            type="email"
            placeholder="Enter your email"
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Create password"
          />

          <label>Confirm Password</label>

          <input
            type="password"
            placeholder="Confirm password"
          />

          <button type="submit">
            Register
          </button>

        </form>

        <p>
          Already have an account?
          <Link to="/login"> Login</Link>
        </p>

      </div>

    </div>
  );
}

export default Register;