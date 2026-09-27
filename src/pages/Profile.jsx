import Navbar from "../components/Navbar";

function Profile() {
  return (
    <div>

      <Navbar />

      <div className="profile-container">

        <h1>My Profile</h1>

        <div className="profile-card">

          <div className="profile-image">
            👤
          </div>

          <h2>User Name</h2>

          <p>Email: user@example.com</p>

          <p>Role: User</p>

          <button>
            Edit Profile
          </button>

        </div>

      </div>

    </div>
  );
}

export default Profile;