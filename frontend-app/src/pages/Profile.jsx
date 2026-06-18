import { useState } from "react";
import { Link } from "react-router-dom";

function Profile({
  blogs,
  setBlogs,
}) {
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

  function handleDelete(id) {
    const confirmDelete = window.confirm(
      "Delete this blog?"
    );

    if (confirmDelete) {
      setBlogs(
        blogs.filter(
          (blog) => blog.id !== id
        )
      );
    }
  }

  const totalBlogs = blogs.length;

  const totalCategories = new Set(
    blogs.map((blog) => blog.category)
  ).size;

  const latestBlog =
    blogs.length > 0
      ? blogs[0].title
      : "No Blogs Yet";

  const bookmarkedBlogs = blogs.filter(
    (blog) => blog.bookmarked
  );

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
                onClick={() =>
                  setIsEditing(true)
                }
              >
                Edit Profile
              </button>
            </>
          )}

          <hr
            style={{
              margin: "25px 0",
            }}
          />

          <h3>Blog Statistics</h3>

          <div
            style={{
              textAlign: "left",
              marginTop: "10px",
              marginBottom: "20px",
            }}
          >
            <p>
              <strong>Total Blogs:</strong>{" "}
              {totalBlogs}
            </p>

            <p>
              <strong>Categories Used:</strong>{" "}
              {totalCategories}
            </p>

            <p>
              <strong>Latest Blog:</strong>{" "}
              {latestBlog}
            </p>
          </div>

          <hr
            style={{
              margin: "25px 0",
            }}
          />

         <h3>Saved Blogs</h3>

        {bookmarkedBlogs.length > 0 ? (
          bookmarkedBlogs.map((blog) => (
            <div
              key={blog.id}
              style={{
                border: "1px solid #ddd",
                padding: "12px",
                marginTop: "12px",
                borderRadius: "10px",
                textAlign: "left",
              }}
            >
              <Link
                to={`/blog/${blog.id}`}
                style={{
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <h4>{blog.title}</h4>

                <p>{blog.category}</p>
              </Link>
            </div>
          ))
        ) : (
          <p>No bookmarked blogs yet.</p>
        )}

          <hr
            style={{
              margin: "25px 0",
            }}
          />

          <h3>My Blogs</h3>

          {blogs.length > 0 ? (
            blogs.map((blog) => (
              <div
                key={blog.id}
                style={{
                  border: "1px solid #ddd",
                  padding: "12px",
                  marginTop: "12px",
                  borderRadius: "10px",
                  textAlign: "left",
                }}
              >
                <h4>{blog.title}</h4>

                <p>{blog.category}</p>

                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    marginTop: "10px",
                  }}
                >
                  <Link
                    to={`/edit-blog/${blog.id}`}
                  >
                    <button>Edit</button>
                  </Link>

                  <button
                    onClick={() =>
                      handleDelete(blog.id)
                    }
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No blogs created yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;