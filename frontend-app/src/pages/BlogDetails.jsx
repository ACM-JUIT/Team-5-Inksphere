import { Link } from "react-router-dom";

function BlogDetails() {
  return (
    <div>
      <nav className="navbar">
        <div className="nav-brand">
          <div className="nav-dot">✍</div>
          <span className="nav-name">InkSphere</span>
        </div>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
          <Link to="/profile">Profile</Link>
        </div>
      </nav>

      <div className="blog-hero">
        <div className="blog-tag-pill">Tech</div>
        <h1>Getting started with React hooks</h1>
        <div className="blog-hero-meta">
          <span>John Smith</span>
          <div className="meta-dot"></div>
          <span>June 10, 2026</span>
          <div className="meta-dot"></div>
          <span>5 min read</span>
          <div className="meta-dot"></div>
          <span>245 reads</span>
        </div>
      </div>

      <div className="blog-layout">
        <div className="blog-content">
          <div className="author-row">
            <div className="author-left">
              <div className="author-av">JS</div>
              <div>
                <div className="author-name">John Smith</div>
                <div className="author-date">Published June 10, 2026</div>
              </div>
            </div>
            <button className="follow-btn">+ Follow</button>
          </div>

          <div className="blog-body">
            <p>
              React hooks changed the way we write React components forever.
              Before hooks, you had to use class components to manage state and
              lifecycle. Now, with just a few lines of code, you can do
              everything in a simple function component.
            </p>

            <h2>What is useState?</h2>
            <p>
              The useState hook lets you add state to a functional component.
              You call it with an initial value and it returns the current state
              and a function to update it. Every time you call the update
              function, React re-renders the component with the new value.
            </p>

            <div className="blog-quote">
              Hooks are functions that let you hook into React state and
              lifecycle features from function components.
            </div>

            <h2>What is useEffect?</h2>
            <p>
              The useEffect hook lets you perform side effects in your
              components — things like fetching data, setting up subscriptions,
              or manually changing the DOM. It runs after every render by
              default, but you can control when it runs using the dependency
              array.
            </p>

            <p>
              Understanding these two hooks gives you the foundation to build
              almost any React application. From there, you can explore more
              advanced hooks like useContext, useReducer, and useMemo.
            </p>
          </div>

          <div className="blog-actions-row">
            <button className="action-btn liked">♥ 18 likes</button>
            <button className="action-btn">💬 Comment</button>
            <button className="action-btn">🔖 Save</button>
            <button className="share-blog-btn">Share</button>
          </div>
        </div>

        <div className="blog-right">
          <div className="blog-side-card">
            <h4>Related blogs</h4>
            <div className="related-item">
              <div className="rel-dot rel-tech"></div>
              <div>
                <p className="rel-title">Python vs JavaScript in 2026</p>
                <span className="rel-meta">Tech · 3 min read</span>
              </div>
            </div>
            <div className="related-item">
              <div className="rel-dot rel-life"></div>
              <div>
                <p className="rel-title">Morning routines that work</p>
                <span className="rel-meta">Lifestyle · 4 min read</span>
              </div>
            </div>
            <div className="related-item">
              <div className="rel-dot rel-edu"></div>
              <div>
                <p className="rel-title">How to study smarter</p>
                <span className="rel-meta">Education · 6 min read</span>
              </div>
            </div>
          </div>

          <div className="blog-side-card">
            <h4>Tags</h4>
            <div className="blog-tag-cloud">
              <span className="blog-tag-pill-small">React</span>
              <span className="blog-tag-pill-small">JavaScript</span>
              <span className="blog-tag-pill-small">Hooks</span>
              <span className="blog-tag-pill-small">Frontend</span>
              <span className="blog-tag-pill-small">Web dev</span>
            </div>
          </div>
        </div>
      </div>

      <div className="home-footer">
        2026 InkSphere · Made with love for writers everywhere
      </div>
    </div>
  );
}

export default BlogDetails;