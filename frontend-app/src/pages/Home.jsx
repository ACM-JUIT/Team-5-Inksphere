import { useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1200&q=80",
      badge: "Welcome to InkSphere",
      title: "Where great ideas",
      titleItalic: "find their voice",
      desc: "A premium space to read, write and connect with the world's most passionate writers.",
      btn1: "Start writing",
      btn2: "Explore blogs",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80",
      badge: "Travel",
      title: "Discover the world",
      titleItalic: "through stories",
      desc: "Read travel diaries from writers who have explored the most extraordinary corners of our planet.",
      btn1: "Read travel blogs",
      btn2: "Share your journey",
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80",
      badge: "Technology",
      title: "Stay ahead with",
      titleItalic: "tech insights",
      desc: "Deep dives into software, AI, design and everything shaping the digital future.",
      btn1: "Read tech blogs",
      btn2: "Write a tech blog",
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&q=80",
      badge: "Lifestyle",
      title: "Live better,",
      titleItalic: "think deeper",
      desc: "Thoughtful writing on mindfulness, productivity, wellness and the art of living well.",
      btn1: "Read lifestyle blogs",
      btn2: "Start your story",
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1200&q=80",
      badge: "Education",
      title: "Learn something",
      titleItalic: "new every day",
      desc: "Curated educational content from experts across science, history and beyond.",
      btn1: "Explore education",
      btn2: "Teach the world",
    },
  ];

  const blogs = [
    { id: 1, category: "Tech", title: "Getting started with React hooks", desc: "A beginner-friendly guide to useState, useEffect and more.", author: "Arjun K.", initials: "AK", image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&q=80" },
    { id: 2, category: "Travel", title: "Hidden gems of Southeast Asia", desc: "Places most tourists never find on the usual travel routes.", author: "Priya S.", initials: "PS", image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=600&q=80" },
    { id: 3, category: "Lifestyle", title: "Morning routines that actually work", desc: "Simple habits that set a productive tone for your whole day.", author: "Riya N.", initials: "RN", image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80" },
    { id: 4, category: "Education", title: "How to study smarter, not harder", desc: "Science-backed techniques to improve memory and focus.", author: "Sai M.", initials: "SM", image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&q=80" },
    { id: 5, category: "Tech", title: "Python vs JavaScript in 2026", desc: "Which language should you learn first as a beginner?", author: "Rohan V.", initials: "RV", image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&q=80" },
    { id: 6, category: "Travel", title: "Solo travel tips for first timers", desc: "Everything you wish you knew before your first solo trip.", author: "Diya K.", initials: "DK", image: "https://images.unsplash.com/photo-1488085061387-422e29b40080?w=600&q=80" },
  ];

  const marqueeImages = [
    "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&q=70",
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=70",
    "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=400&q=70",
    "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=70",
    "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&q=70",
    "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=400&q=70",
    "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&q=70",
    "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&q=70",
  ];

  const categories = ["All", "Tech", "Travel", "Lifestyle", "Education"];

  const filtered = activeCategory === "All"
    ? blogs
    : blogs.filter((b) => b.category === activeCategory);

  const goTo = (n) => setCurrentSlide(n);

  return (
    <div className="home-page">

      <nav className="home-nav">
        <div className="home-nav-brand">
          <div className="home-nav-dot">✍</div>
          <span className="home-nav-name">InkSphere</span>
        </div>
        <div className="home-nav-links">
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/create-blog">
            <button className="home-nav-write">+ Write</button>
          </Link>
        </div>
      </nav>

      <div className="home-hero">
        <div
          className="home-slides"
          style={{ transform: `translateX(-${currentSlide * 20}%)` }}
        >
          {slides.map((slide) => (
            <div className="home-slide" key={slide.id}>
              <img src={slide.image} alt={slide.badge} />
              <div className="home-slide-overlay"></div>
              <div className="home-slide-text">
                <div className="home-slide-badge">{slide.badge}</div>
                <h1>
                  {slide.title}
                  <br />
                  <em>{slide.titleItalic}</em>
                </h1>
                <p>{slide.desc}</p>
                <div className="home-hero-btns">
                  <button className="home-hb1">{slide.btn1}</button>
                  <button className="home-hb2">{slide.btn2}</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="home-dots">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`home-dot ${currentSlide === i ? "active" : ""}`}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
      </div>

      <div className="home-stats">
        <div className="home-stat"><strong>12k+</strong><span>Writers</span></div>
        <div className="home-stat"><strong>48k+</strong><span>Blogs</span></div>
        <div className="home-stat"><strong>200k+</strong><span>Readers</span></div>
        <div className="home-stat"><strong>4</strong><span>Categories</span></div>
      </div>

      <div className="home-cats">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`home-cat ${activeCategory === cat ? "active" : ""}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="home-blogs">
        <div className="home-blogs-head">
          <h2>Latest blogs</h2>
          <a href="#">View all →</a>
        </div>
        <div className="home-blogs-grid">
          {filtered.map((blog) => (
            <div className="home-blog-card" key={blog.id}>
              <img src={blog.image} alt={blog.title} />
              <div className="home-blog-body">
                <div className="home-blog-tag">{blog.category}</div>
                <h3>{blog.title}</h3>
                <p>{blog.desc}</p>
                <div className="home-blog-foot">
                  <div className="home-blog-author">
                    <div className="home-blog-av">{blog.initials}</div>
                    <span>{blog.author}</span>
                  </div>
                  <Link to="/blog">
                    <button className="home-read-btn">Read more →</button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="home-marquee">
        <div className="home-marquee-label">Featured stories from around the world</div>
        <div className="home-marquee-track">
          {[...marqueeImages, ...marqueeImages].map((img, i) => (
            <div className="home-marquee-item" key={i}>
              <img src={img} alt="featured" />
            </div>
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

      <div className="home-footer">
        <span>InkSphere</span>
        <div className="home-footer-links">
          <a href="#">About</a>
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Contact</a>
        </div>
      </div>

    </div>
  );
}

export default Home;