import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

function BlogDetails({ blogs, setBlogs }) {
  const { id } = useParams();
  const blog = blogs.find((blog) => blog.id === Number(id));

  const [comment, setComment] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [shareText, setShareText] = useState("Share");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []); 

  if (!blog) {
    return (
      <div className="not-found" style={{ textAlign: "center", padding: "100px 20px", color: "white" }}>
        <h1>Blog Not Found</h1>
        <Link to="/"><button className="publish-btn" style={{ marginTop: "20px" }}>Go Back Home</button></Link>
      </div>
    );
  }

  function handleLike() {
    if (setBlogs) {
      setBlogs(
        blogs.map((item) => {
          if (item.id !== blog.id) return item;
          return {
            ...item,
            liked: !item.liked,
            likes: item.liked ? item.likes - 1 : item.likes + 1,
          };
        })
      );
    }
  }

  function handleBookmark() {
    if (setBlogs) {
      setBlogs(
        blogs.map((item) =>
          item.id === blog.id ? { ...item, bookmarked: !item.bookmarked } : item
        )
      );
    }
  }

  function handleAddComment() {
    if (!comment.trim() || !setBlogs) return;
    setBlogs(
      blogs.map((item) =>
        item.id === blog.id
          ? { ...item, comments: [...(item.comments || []), comment] }
          : item
      )
    );
    setComment("");
  }

  function handleShare() {
    navigator.clipboard.writeText(window.location.href);
    setShareText("Copied! ✓");
    setTimeout(() => {
      setShareText("Share");
    }, 2000);
  }

  const readingTime = Math.max(1, Math.ceil((blog.content || "").split(" ").length / 200));

  return (
    <div className="bd-page">
      <div className="bd-hero">
        <div className="bd-tag-pill">{blog.category}</div>
        <h1>{blog.title}</h1>
        <div className="bd-hero-meta">
          <span>John Smith</span>
          <div className="bd-meta-dot"></div>
          <span>⏱️ {readingTime} min read</span>
          <div className="bd-meta-dot"></div>
          <span>👁️ {blog.views || 0} reads</span>
        </div>
      </div>

      <div className="bd-layout">
        <div className="bd-main-content">
          <div className="bd-author-row">
            <div className="bd-author-left">
              <div className="bd-author-av">JS</div>
              <div>
                <div className="bd-author-name">John Smith</div>
                <div className="bd-author-date">Published Recently</div>
              </div>
            </div>
            <button 
              className={`bd-follow-btn ${isFollowing ? 'following' : ''}`} 
              onClick={() => setIsFollowing(!isFollowing)}
            >
              {isFollowing ? 'Following ✓' : '+ Follow'}
            </button>
          </div>

          <img src={blog.image} alt={blog.title} className="bd-cover-img" />
          
          {blog.description && (
            <p className="bd-description">
              {blog.description}
            </p>
          )}

          <div className="bd-body" dangerouslySetInnerHTML={{ __html: blog.content }} />

          <div className="bd-actions-row">
            <button className={`bd-action-btn ${blog.liked ? "liked" : ""}`} onClick={handleLike}>
              {blog.liked ? "❤️" : "🤍"} {blog.likes} {blog.likes === 1 ? "like" : "likes"}
            </button>
            <button className="bd-action-btn" onClick={() => setShowComments(!showComments)}>
              💬 Comment
            </button>
            <button className="bd-action-btn" onClick={handleBookmark}>
              {blog.bookmarked ? "🔖 Saved" : "📑 Save"}
            </button>
            <button className="bd-share-btn" onClick={handleShare}>
              {shareText}
            </button>
          </div>

          {showComments && (
            <div className="bd-comments-section">
              <h3>Comments</h3>
              <div className="bd-comment-form">
                <input
                  type="text"
                  placeholder="Write a comment..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <button onClick={handleAddComment}>Post</button>
              </div>
              
              {blog.comments && blog.comments.length > 0 ? (
                blog.comments.map((item, index) => (
                  <div key={index} className="bd-comment-card">
                    {item}
                  </div>
                ))
              ) : (
                <p className="bd-no-comments">No comments yet. Be the first to share your thoughts!</p>
              )}
            </div>
          )}
        </div>

        <div className="bd-sidebar">
          <div className="bd-side-card">
            <h4>Related blogs</h4>
            {blogs.filter(b => b.category === blog.category && b.id !== blog.id).slice(0, 3).map((relBlog) => (
              <div className="bd-related-item" key={relBlog.id}>
                <div className="bd-rel-dot"></div>
                <div>
                  <Link to={`/blog/${relBlog.id}`} style={{ textDecoration: 'none' }}>
                    <p className="bd-rel-title">{relBlog.title}</p>
                    <span className="bd-rel-meta">{relBlog.category} · {relBlog.views || 0} views</span>
                  </Link>
                </div>
              </div>
            ))}
            {blogs.filter(b => b.category === blog.category && b.id !== blog.id).length === 0 && (
              <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)" }}>No related blogs found.</p>
            )}
          </div>

          <div className="bd-side-card">
            <h4>Tags</h4>
            <div className="bd-tag-cloud">
              <span className="bd-tag-pill-small">{blog.category}</span>
              <span className="bd-tag-pill-small">InkSphere</span>
              <span className="bd-tag-pill-small">Trending</span>
              <span className="bd-tag-pill-small">Read</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogDetails;