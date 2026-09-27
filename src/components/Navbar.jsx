import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">

      <div className="logo">
        Smart Task Manager
      </div>

      <div className="nav-links">

        <Link to="/dashboard">
          Dashboard
        </Link>

        <Link to="/tasks">
          My Tasks
        </Link>

        <Link to="/add-task">
          Add Task
        </Link>

        <Link to="/profile">
          Profile
        </Link>

        <Link to="/login">
          Logout
        </Link>

      </div>

    </nav>
  );
}

export default Navbar;