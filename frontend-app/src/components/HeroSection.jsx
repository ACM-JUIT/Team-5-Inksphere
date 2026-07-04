import { useState } from "react";
import { Link } from "react-router-dom";

function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1200&q=80",
      badge: "WELCOME TO INKSPHERE",
      title: "Where great ideas",
      titleItalic: "find their voice",
      desc: "A premium space to read, write and connect with the world's most passionate writers.",
      btn1: "Start writing",
      btn2: "Explore blogs",
      link1: "/create-blog",
      link2: "/trending"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80",
      badge: "TECHNOLOGY",
      title: "Stay ahead with",
      titleItalic: "tech insights",
      desc: "Deep dives into software, AI, design and everything shaping the digital future.",
      btn1: "Read tech blogs",
      btn2: "Write a tech blog",
      link1: "/",
      link2: "/create-blog"
    }
  ];

  return (
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
                <Link to={slide.link1}>
                  <button className="home-hb1">{slide.btn1}</button>
                </Link>
                <Link to={slide.link2}>
                  <button className="home-hb2">{slide.btn2}</button>
                </Link>
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
            onClick={() => setCurrentSlide(i)}
          />
        ))}
      </div>
    </div>
  );
}

export default HeroSection;