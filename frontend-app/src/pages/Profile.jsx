import { useState } from "react";

function Profile() {
  const [isEditing, setIsEditing] = useState(false);

  const [name, setName] = useState("Alex Johnson");
  const [email, setEmail] = useState("alex@example.com");
  const [bio, setBio] = useState(
    "Passionate blogger and content creator."
  );

  const [profileImage, setProfileImage] = useState(null);

  const [error, setError] = useState("");

  function getInitials(fullName) {
    const words = fullName.trim().split(" ");

    if (words.length >= 2) {
      return (
        words[0][0] + words[words.length - 1][0]
      ).toUpperCase();
    }

    return words[0][0].toUpperCase();
  }

  function handleImageChange(e) {
    const file = e.target.files[0];

    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  }

  function handleSave() {
    const emailRegex =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;

    if (!name || !email || !bio) {
      setError("Please fill all fields");
      return;
    }

    if (!emailRegex.test(email)) {
      setError("Enter a valid email address");
      return;
    }

    setError("");
    setIsEditing(false);
  }

  return (
    <div>
      <div className="profile-container">
        <div className="profile-card">
          {profileImage ? (
            <img
              src={profileImage}
              alt="Profile"
              className="profile-image"
            />
          ) : (
            <div className="profile-placeholder">
              {getInitials(name)}
            </div>
          )}

          {isEditing ? (
            <>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />

              <input
                type="text"
                value={name}
                placeholder="Enter Name"
                onChange={(e) => {
                  setName(e.target.value);
                  setError("");
                }}
              />

              <input
                type="email"
                value={email}
                placeholder="Enter Email"
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
              />

              <textarea
                rows="4"
                value={bio}
                placeholder="Enter Bio"
                onChange={(e) => {
                  setBio(e.target.value);
                  setError("");
                }}
              />

              {error && (
                <p className="error-message">
                  {error}
                </p>
              )}

              <button onClick={handleSave}>
                Save Changes
              </button>

              <button
                onClick={() => {
                  setIsEditing(false);
                  setError("");
                }}
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <h2>{name}</h2>

              <p>{email}</p>

              <p>{bio}</p>

              <button
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;