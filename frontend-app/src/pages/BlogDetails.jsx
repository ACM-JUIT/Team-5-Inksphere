import { useParams } from "react-router-dom";

function BlogDetails({
  blogs,
  setBlogs,
}) {
  const { id } = useParams();

  const blog = blogs.find(
    (blog) => blog.id === Number(id)
  );

  if (!blog) {
    return (
      <div className="blog-details">
        <h1>Blog Not Found</h1>
      </div>
    );
  }

  function handleLike() {
    setBlogs(
      blogs.map((item) => {
        if (item.id !== blog.id)
          return item;

        return {
          ...item,
          liked: !item.liked,
          likes: item.liked
            ? item.likes - 1
            : item.likes + 1,
        };
      })
    );
  }

  function handleBookmark() {
    setBlogs(
      blogs.map((item) =>
        item.id === blog.id
          ? {
              ...item,
              bookmarked: !item.bookmarked,
            }
          : item
      )
    );
  }

  return (
    <div>
      <div className="blog-details">
        <img
          src={blog.image}
          alt={blog.title}
        />

        <h1>{blog.title}</h1>

        <p className="blog-category">
          {blog.category}
        </p>

        <div
          style={{
            display: "flex",
            gap: "15px",
            alignItems: "center",
            margin: "15px 0",
          }}
        >
          <button
            onClick={handleLike}
            style={{
              fontSize: "20px",
            }}
          >
            {blog.liked ? "❤️" : "🤍"}
          </button>

          <span
            style={{
              fontWeight: "bold",
            }}
          >
            {blog.likes} Likes
          </span>

          <button
            onClick={handleBookmark}
            style={{
              fontSize: "18px",
            }}
          >
            {blog.bookmarked
              ? "🔖"
              : "📑"}
          </button>
        </div>

        <p>
          {blog.content ||
            blog.description}
        </p>
      </div>
    </div>
  );
}

export default BlogDetails;