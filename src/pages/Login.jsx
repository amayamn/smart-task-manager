import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="auth-container">

      <div className="auth-box">

        <h1>Smart Task Manager</h1>

        <h2>Login</h2>

        <form>

          <label>Email</label>

          <input
            type="email"
            placeholder="Enter your email"
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Enter your password"
          />

          <button type="submit">
            Login
          </button>

        </form>

        <p>
          Don't have an account?
          <Link to="/register"> Register</Link>
        </p>

      </div>

    </div>
  );
}

export default Login;