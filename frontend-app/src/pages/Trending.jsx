import { Link } from "react-router-dom";

function Trending({ blogs }) {
  const trendingBlogs = [...blogs]
    .sort(
      (a, b) =>
        (b.views || 0) -
        (a.views || 0)
    )
    .slice(0, 10);

  return (
    <div className="trending-page">
      <h1>🔥 Trending Blogs</h1>

      {trendingBlogs.map(
        (blog, index) => (
          <div
            key={blog.id}
            className="trending-blog"
          >
            <h2>
              #{index + 1}{" "}
              {blog.title}
            </h2>

            <p>
              👁️{" "}
              {blog.views || 0} Views
            </p>

            <Link
              to={`/blog/${blog.id}`}
            >
              <button>
                Read More
              </button>
            </Link>
          </div>
        )
      )}
    </div>
  );
}

export default Trending;