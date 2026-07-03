import { useState } from "react";
import { Link } from "react-router-dom";
import HeroSection from "../components/HeroSection";
import Categories from "../components/Categories";
import BlogCard from "../components/BlogCard";

function Home({ searchTerm, blogs, setBlogs }) {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredBlogs = blogs.filter((blog) => {
    const matchesCategory =
      activeCategory === "All" || blog.category === activeCategory;
    const matchesSearch =
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  function handleSliderView(id) {
    const viewedBlogs =
      JSON.parse(
        localStorage.getItem("viewedBlogs")
      ) || [];

    if (!viewedBlogs.includes(id)) {
      setBlogs((prevBlogs) =>
        prevBlogs.map((item) =>
          item.id === id
            ? {
                ...item,
                views: (item.views || 0) + 1,
              }
            : item
        )
      );

      localStorage.setItem(
        "viewedBlogs",
        JSON.stringify([
          ...viewedBlogs,
          id,
        ])
      );
    }
  }

  return (
    <div className="home-page">
      <HeroSection />

      <div className="home-stats">
        <div className="home-stat"><strong>12k+</strong><span>Writers</span></div>
        <div className="home-stat"><strong>48k+</strong><span>Blogs</span></div>
        <div className="home-stat"><strong>200k+</strong><span>Readers</span></div>
        <div className="home-stat"><strong>4</strong><span>Categories</span></div>
      </div>

      <Categories
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      <div className="home-blogs">
        <div className="home-blogs-head">
          <h2>Latest blogs</h2>
          <Link to="/trending">View all →</Link>
        </div>
        
        <div className="home-blogs-grid">
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map((blog) => (
              <BlogCard
                key={blog.id}
                id={blog.id}
                title={blog.title}
                description={blog.description}
                category={blog.category}
                image={blog.image}
                setBlogs={setBlogs}
              />
            ))
          ) : (
            <div style={{ width: "100%", textAlign: "center", color: "white", padding: "40px" }}>
              <h2>No Blogs Found</h2>
              <p>Try another category or search term.</p>
            </div>
          )}
        </div>
      </div>

      <div className="home-marquee">
        <div className="home-marquee-label">Featured stories from around the world</div>
        <div className="home-marquee-track">
          {[...blogs, ...blogs, ...blogs, ...blogs].map((blog, i) => (
            <Link
              key={i}
              to={`/blog/${blog.id}`}
              className="home-marquee-item"
              onClick={() =>
                handleSliderView(blog.id)
              }
            >
              <img
                src={blog.image}
                alt={blog.title}
              />
            </Link>
          ))}
        </div>
      </div>

      <div className="home-newsletter">
        <h2>Get the best blogs in your <em>inbox</em></h2>
        <p>Weekly digest of top stories. No spam, ever. Unsubscribe anytime.</p>
        <div className="home-nl-row">
          <input type="email" placeholder="your@email.com" className="home-nl-input" />
          <button className="home-nl-btn">Subscribe</button>
        </div>
      </div>

      <div className="home-footer-shared">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "18px", color: "rgba(255,255,255,0.4)" }}>InkSphere</span>
          <div style={{ display: "flex", gap: "20px" }}>
            <span style={{ cursor: "pointer" }}>About</span>
            <span style={{ cursor: "pointer" }}>Privacy</span>
            <span style={{ cursor: "pointer" }}>Terms</span>
            <span style={{ cursor: "pointer" }}>Contact</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;