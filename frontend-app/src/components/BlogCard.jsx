import { Link } from "react-router-dom";

function BlogCard({
  id,
  title,
  description,
  category,
  image,
  likes = 0,
}) {
  return (
    <div className="blog-card">
      <img
        src={image}
        alt="blog"
      />

      <h3>{title}</h3>

      <p>{description}</p>

      <span>{category}</span>

      <p
        style={{
          marginTop: "10px",
          fontWeight: "bold",
        }}
      >
        ❤️ {likes} Likes
      </p>

      <br />

      <Link to={`/blog/${id}`}>
        <button>Read More</button>
      </Link>
    </div>
  );
}

export default BlogCard;