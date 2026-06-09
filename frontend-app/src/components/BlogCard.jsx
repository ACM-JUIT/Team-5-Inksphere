import { Link } from "react-router-dom";

function BlogCard() {
  return (
    <div className="blog-card">
      <img
        src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600"
        alt="blog"
      />

      <h3>Blog Title</h3>

      <p>Description of the blog.</p>

      <span>Category</span>

      <br />
      <br />

      <Link to="/blog">
        <button>Read More</button>
      </Link>
    </div>
  );
}

export default BlogCard;