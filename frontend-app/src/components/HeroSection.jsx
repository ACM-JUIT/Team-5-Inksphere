import { Link } from "react-router-dom";
function HeroSection() {
  return (
    <div className="hero-section">
      <h1>Read. Write. Inspire.</h1>

      <p>
        Discover stories, ideas and knowledge from writers around the world.
      </p>

      <div className="hero-buttons">
        <Link to="/blog">
         <button>Start Reading</button>
        </Link>

        <Link to="/create-blog">
          <button>Write a Blog</button>
        </Link>
      </div>
    </div>
  );
}

export default HeroSection;