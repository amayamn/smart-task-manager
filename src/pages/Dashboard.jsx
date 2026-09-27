import Navbar from "../components/Navbar";

function Dashboard() {
  return (
    <div>

      <Navbar />

      <div className="page-container">

        <h1>Dashboard</h1>

        <p>Welcome to Smart Task Manager!</p>

        <div className="dashboard-cards">

          <div className="card">
            <h3>Total Tasks</h3>
            <h2>0</h2>
          </div>

          <div className="card">
            <h3>Completed</h3>
            <h2>0</h2>
          </div>

          <div className="card">
            <h3>Pending</h3>
            <h2>0</h2>
          </div>

          <div className="card">
            <h3>Overdue</h3>
            <h2>0</h2>
          </div>

        </div>

        <div className="progress-section">

          <h2>Productivity</h2>

          <div className="progress-bar">

            <div className="progress">
              0%
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;