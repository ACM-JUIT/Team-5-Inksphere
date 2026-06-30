import { Link } from "react-router-dom";

function Profile() {
  const blogs = [
    { id: 1, category: "Tech", title: "Getting started with React hooks", desc: "A beginner-friendly guide to useState and useEffect.", reads: "245", likes: "18", banner: "pb-tech" },
    { id: 2, category: "Travel", title: "Hidden gems of Southeast Asia", desc: "Places most tourists never find on typical routes.", reads: "892", likes: "64", banner: "pb-travel" },
    { id: 3, category: "Lifestyle", title: "Morning routines that actually work", desc: "Simple habits that set a productive tone for your day.", reads: "1.2k", likes: "98", banner: "pb-life" },
  ];

  return (
    <div className="profile-page">

      <nav className="home-nav">
        <div className="home-nav-brand">
          <div className="home-nav-dot">✍</div>
          <span className="home-nav-name">InkSphere</span>
        </div>
        <div className="home-nav-links">
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
          <Link to="/profile" className="active">Profile</Link>
          <Link to="/create-blog">
            <button className="home-nav-write">+ Write</button>
          </Link>
        </div>
      </nav>

      <div className="p-hero">
        <div className="p-hero-bg"></div>
        <div className="p-glow"></div>
        <div className="p-avatar-wrap">
          <div className="p-avatar">JS</div>
        </div>
      </div>

      <div className="p-top">
        <div className="p-name-info">
          <h2>John Smith</h2>
          <p>Writer · Joined January 2025</p>
        </div>
        <div className="p-btns">
          <button className="p-edit-btn">Edit profile</button>
          <Link to="/create-blog">
            <button className="p-write-btn">+ New blog</button>
          </Link>
        </div>
      </div>

      <div className="p-stats">
        <div className="p-stat"><strong>12</strong><span>Blogs</span></div>
        <div className="p-stat"><strong>3.4k</strong><span>Readers</span></div>
        <div className="p-stat"><strong>248</strong><span>Likes</span></div>
        <div className="p-stat"><strong>56</strong><span>Followers</span></div>
      </div>

      <div className="p-body">
        <div className="p-blogs">
          <h3>My blogs</h3>
          {blogs.map((blog) => (
            <div className="p-blog-item" key={blog.id}>
              <div className={`p-blog-banner ${blog.banner}`}></div>
              <div className="p-blog-body">
                <div className="p-blog-tag">{blog.category}</div>
                <h4>{blog.title}</h4>
                <p>{blog.desc}</p>
                <div className="p-blog-foot">
                  <span className="p-blog-meta">{blog.reads} reads · {blog.likes} likes</span>
                  <div className="p-blog-acts">
                    <button className="p-ba">Edit</button>
                    <button className="p-ba p-del">Delete</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-sidebar">
          <div className="p-panel">
            <h4>About</h4>
            <p className="p-bio">Passionate writer covering tech, travel and lifestyle. I write to learn and share what I discover along the way.</p>
          </div>
          <div className="p-panel">
            <h4>Info</h4>
            <div className="p-info-row">john@example.com</div>
            <div className="p-info-row">Mumbai, India</div>
            <div className="p-info-row">Joined Jan 2025</div>
          </div>
          <div className="p-panel">
            <h4>Interests</h4>
            <div className="p-tags">
              <span className="p-tag">Tech</span>
              <span className="p-tag">Travel</span>
              <span className="p-tag">Lifestyle</span>
              <span className="p-tag">React</span>
              <span className="p-tag">Writing</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Profile;