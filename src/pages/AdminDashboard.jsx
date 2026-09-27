import Navbar from "../components/Navbar";

function AdminDashboard() {
  return (
    <div>

      <Navbar />

      <div className="page-container">

        <h1>Admin Dashboard</h1>

        <p>
          System-wide Task Management Statistics
        </p>

        <div className="dashboard-cards">

          <div className="card">
            <h3>Total Users</h3>
            <h2>0</h2>
          </div>

          <div className="card">
            <h3>Total Tasks</h3>
            <h2>0</h2>
          </div>

          <div className="card">
            <h3>Completed Tasks</h3>
            <h2>0</h2>
          </div>

          <div className="card">
            <h3>Pending Tasks</h3>
            <h2>0</h2>
          </div>

        </div>

        <div className="admin-section">

          <h2>User Management</h2>

          <table>

            <thead>

              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Action</th>
              </tr>

            </thead>

            <tbody>

              <tr>

                <td>No users</td>

                <td>-</td>

                <td>-</td>

                <td>
                  -
                </td>

              </tr>

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;