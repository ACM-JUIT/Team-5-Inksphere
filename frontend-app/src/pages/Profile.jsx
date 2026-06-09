import Navbar from "../components/Navbar";

function Profile() {
  return (
    <div>
      <Navbar />

      <div className="profile-container">
        <div className="profile-card">
          <img
            src="https://via.placeholder.com/120"
            alt="profile"
          />

          <h2>User Name</h2>

          <p>Category</p>

          <button>Edit Profile</button>
        </div>
      </div>
    </div>
  );
}

export default Profile;