import { Link } from "react-router-dom";

function Profile({ blogs, setBlogs }) {
  const myBlogs = blogs.slice(0, 3); 
  
  const bookmarkedBlogs = blogs.filter(
    (blog) => blog.bookmarked
  );

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      setBlogs(blogs.filter((blog) => blog.id !== id));
    }
  };

  return (
    <div className="profile-page" style={{ padding: "40px 10%", color: "white", fontFamily: "'Inter', sans-serif" }}>
      <div className="profile-hero" style={{ marginBottom: "40px" }}>
        <div style={{ width: "80px", height: "80px", borderRadius: "50%", background: "linear-gradient(135deg, #3b82f6, #1e40af)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}>JS</div>
        <h1 style={{ fontSize: "32px", margin: "0" }}>John Smith</h1>
        <p style={{ color: "rgba(255,255,255,0.6)" }}>Writer · Joined January 2025</p>
        <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
          <Link to="/edit-profile" style={{ textDecoration: 'none' }}>
            <button style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.2)", padding: "8px 20px", borderRadius: "8px", color: "white", cursor: "pointer" }}>Edit profile</button>
          </Link>
          <Link
            to="/create-blog"
            style={{ textDecoration: "none" }}
          >
            <button
              style={{
                background: "#3b82f6",
                border: "none",
                padding: "8px 20px",
                borderRadius: "8px",
                color: "white",
                cursor: "pointer",
              }}
            >
              + New blog
            </button>
          </Link>
        </div>
      </div>

      <div style={{ display: "flex", gap: "60px", padding: "20px 0", borderTop: "1px solid #1e293b", borderBottom: "1px solid #1e293b", marginBottom: "40px" }}>
        {[ {label: "BLOGS", val: "12"}, {label: "READERS", val: "3.4k"}, {label: "LIKES", val: "248"}, {label: "FOLLOWERS", val: "56"} ].map(s => (
          <div key={s.label} style={{ textAlign: "center" }}>
            <div style={{ fontSize: "20px", fontWeight: "bold", color: "#3b82f6" }}>{s.val}</div>
            <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.4)", letterSpacing: "1px" }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: "40px" }}>
        <div className="profile-blogs">
          <h2 style={{ marginBottom: "20px" }}>My blogs</h2>
          {myBlogs.map(blog => (
            <div key={blog.id} style={{ background: "rgba(255,255,255,0.03)", padding: "20px", borderRadius: "12px", marginBottom: "20px", border: "1px solid rgba(255,255,255,0.05)" }}>
              <div style={{ fontSize: "10px", color: "#3b82f6", textTransform: "uppercase", fontWeight: "bold" }}>{blog.category}</div>
              <h3 style={{ margin: "5px 0" }}>{blog.title}</h3>
              <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.5)" }}>{blog.description}</p>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "15px", alignItems: "center" }}>
                <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)" }}>{blog.views} reads · {blog.likes} likes</span>
                <div>
                  <Link to={`/edit-blog/${blog.id}`} style={{ textDecoration: 'none' }}>
                    <button style={{ background: "transparent", border: "none", color: "rgba(255,255,255,0.4)", marginRight: "10px", cursor: "pointer" }}>Edit</button>
                  </Link>
                  <button 
                    onClick={() => handleDelete(blog.id)}
                    style={{ background: "transparent", border: "none", color: "#ef4444", cursor: "pointer" }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        
        <h2 style={{ marginBottom: "20px", marginTop: "40px" }}>
            🔖 Saved Blogs
          </h2>

          {bookmarkedBlogs.length > 0 ? (
            bookmarkedBlogs.map((blog) => (
              <div
                key={blog.id}
                style={{
                  background: "rgba(255,255,255,0.03)",
                  padding: "20px",
                  borderRadius: "12px",
                  marginBottom: "20px",
                  border: "1px solid rgba(255,255,255,0.05)",
                }}
              >
                <div
                  style={{
                    fontSize: "10px",
                    color: "#3b82f6",
                    textTransform: "uppercase",
                    fontWeight: "bold",
                  }}
                >
                  {blog.category}
                </div>

                <h3 style={{ margin: "5px 0" }}>
                  {blog.title}
                </h3>

                <p
                  style={{
                    fontSize: "14px",
                    color: "rgba(255,255,255,0.5)",
                  }}
                >
                  {blog.description}
                </p>

                <Link
                  to={`/blog/${blog.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <button
                    style={{
                      marginTop: "10px",
                      background: "#3b82f6",
                      border: "none",
                      color: "white",
                      padding: "8px 16px",
                      borderRadius: "8px",
                      cursor: "pointer",
                    }}
                  >
                    Read More
                  </button>
                </Link>
              </div>
            ))
          ) : (
            <div
              style={{
                background: "rgba(255,255,255,0.03)",
                padding: "20px",
                borderRadius: "12px",
                color: "rgba(255,255,255,0.5)",
              }}
            >
              No bookmarked blogs yet.
            </div>
          )}
          
        </div>

        <aside>
          <div style={{ background: "rgba(255,255,255,0.03)", padding: "20px", borderRadius: "12px", marginBottom: "20px" }}>
            <h4 style={{ marginBottom: "10px" }}>About</h4>
            <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)" }}>Passionate writer covering tech, travel and lifestyle. I write to learn and share what I discover along the way.</p>
          </div>
          <div style={{ background: "rgba(255,255,255,0.03)", padding: "20px", borderRadius: "12px", marginBottom: "20px" }}>
            <h4 style={{ marginBottom: "10px" }}>Info</h4>
            <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)" }}>
              <p>john@example.com</p>
              <p>Mumbai, India</p>
              <p>Joined Jan 2025</p>
            </div>
          </div>
          <div style={{ background: "rgba(255,255,255,0.03)", padding: "20px", borderRadius: "12px" }}>
            <h4 style={{ marginBottom: "10px" }}>Interests</h4>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {["Tech", "Travel", "Lifestyle", "React", "Writing"].map(tag => (
                <span key={tag} style={{ background: "rgba(255,255,255,0.1)", padding: "4px 10px", borderRadius: "15px", fontSize: "12px" }}>{tag}</span>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default Profile;