import { Link } from "react-router-dom";

function BlogCard({
  id,
  title,
  description,
  category,
  image,
  setBlogs,
  authorInitials = "JS",
  authorName = "John Smith"
}) {
  function handleViewIncrement() {
    const viewedBlogs = JSON.parse(localStorage.getItem("viewedBlogs")) || [];
    if (!viewedBlogs.includes(id)) {
      setBlogs((prevBlogs) =>
        prevBlogs.map((item) =>
          item.id === id ? { ...item, views: (item.views || 0) + 1 } : item
        )
      );
      localStorage.setItem("viewedBlogs", JSON.stringify([...viewedBlogs, id]));
    }
  }

  return (
    <div className="home-blog-card">
      <img src={image} alt={title} />
      <div className="home-blog-body">
        <div className="home-blog-tag">{category}</div>
        <h3>{title}</h3>
        <p>{description}</p>
        
        <div className="home-blog-foot">
          <div className="home-blog-author">
            <div className="home-blog-av">{authorInitials}</div>
            <span>{authorName}</span>
          </div>
          <Link to={`/blog/${id}`} onClick={handleViewIncrement}>
            <button className="home-read-btn">Read more →</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BlogCard;