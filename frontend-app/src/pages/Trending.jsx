import { Link } from "react-router-dom";

function Trending({blogs, setBlogs,}) {
  const trendingBlogs = [...blogs]
    .sort((a, b) => (b.views || 0) - (a.views || 0))
    .slice(0, 10);

    function handleView(id) {
      const viewedBlogs =
        JSON.parse(
          localStorage.getItem(
            "viewedBlogs"
          )
        ) || [];

      if (!viewedBlogs.includes(id)) {
        setBlogs((prevBlogs) =>
          prevBlogs.map((item) =>
            item.id === id
              ? {
                  ...item,
                  views:
                    (item.views || 0) + 1,
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
    <div className="trending-wrapper">
      <div className="trending-header">
        <h1>🔥 Trending Blogs</h1>
        <p>The most read and loved stories on InkSphere right now.</p>
      </div>
      
      <div className="trending-list">
        {trendingBlogs.length > 0 ? (
          trendingBlogs.map((blog, index) => (
            <div key={blog.id} className="trending-card">
              <div className="trending-rank">#{index + 1}</div>
              
              <img src={blog.image} alt={blog.title} className="trending-img" />
              
              <div className="trending-info">
                <span className="trending-category">{blog.category}</span>
                <h2>{blog.title}</h2>
                <p className="trending-meta">👁️ {blog.views || 0} Views</p>
              </div>
              
              <div className="trending-action">
                <Link
                  to={`/blog/${blog.id}`}
                  onClick={() =>
                    handleView(blog.id)
                  }
                >
                  <button className="trending-btn">
                    Read More
                  </button>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="trending-empty">No blogs available yet.</p>
        )}
      </div>
    </div>
  );
}

export default Trending;