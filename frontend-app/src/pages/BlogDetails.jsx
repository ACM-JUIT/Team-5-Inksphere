import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  FaHeart,
  FaRegHeart,
  FaBookmark,
  FaRegBookmark,
  FaRegComment,
} from "react-icons/fa";

function BlogDetails({
  blogs,
  setBlogs,
}) {
  const { id } = useParams();

  const blog = blogs.find(
    (blog) => blog.id === Number(id)
  );

  const [comment, setComment] =
    useState("");

  const [showComments, setShowComments] =
    useState(false);

  useEffect(() => {
  if (!blog) return;

  const viewedBlogs =
    JSON.parse(
      localStorage.getItem(
        "viewedBlogs"
      )
    ) || [];

  if (
    !viewedBlogs.includes(blog.id)
  ) {
    setBlogs((prevBlogs) =>
      prevBlogs.map((item) =>
        item.id === blog.id
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
        blog.id,
      ])
    );
  }
}, [blog, setBlogs]);

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
              bookmarked:
                !item.bookmarked,
            }
          : item
      )
    );
  }

  function handleAddComment() {
    if (!comment.trim()) return;

    setBlogs(
      blogs.map((item) =>
        item.id === blog.id
          ? {
              ...item,
              comments: [
                ...item.comments,
                comment,
              ],
            }
          : item
      )
    );

    setComment("");
  }

  const readingTime = Math.max(
    1,
    Math.ceil(
      (blog.content || "")
        .split(" ")
        .length / 200
    )
  );

  return (
    <div className="blog-details">
      <img
        src={blog.image}
        alt={blog.title}
      />

      <h1>{blog.title}</h1>

      <p className="reading-time">
        ⏱️ {readingTime} min read
      </p>

      <p className="views-count">
        👁️ {blog.views || 0} Views
      </p>

      {blog.description && (
        <p className="blog-description">
          {blog.description}
        </p>
      )}

      {blog.content && (
        <p className="blog-content">
          {blog.content}
        </p>
      )}

      <p className="blog-category">
        {blog.category}
      </p>

      <div className="blog-actions">
        <button
          className="icon-btn"
          onClick={handleLike}
        >
          {blog.liked ? (
            <FaHeart color="#ff3040" />
          ) : (
            <FaRegHeart />
          )}
        </button>

        <button
          className="icon-btn"
          onClick={() =>
            setShowComments(
              !showComments
            )
          }
        >
          <FaRegComment />
        </button>

        <button
          className="icon-btn"
          onClick={handleBookmark}
        >
          {blog.bookmarked ? (
            <FaBookmark color="#ff6b35" />
          ) : (
            <FaRegBookmark />
          )}
        </button>
      </div>

      <p className="likes-count">
        {blog.likes} Like
        {blog.likes !== 1 ? "s" : ""}
      </p>

      {showComments && (
        <div className="comments-section">
          <h3>Comments</h3>

          <div className="comment-form">
            <input
              type="text"
              placeholder="Write a comment..."
              value={comment}
              onChange={(e) =>
                setComment(
                  e.target.value
                )
              }
            />

            <button
              onClick={
                handleAddComment
              }
            >
              Add Comment
            </button>
          </div>

          {blog.comments &&
          blog.comments.length >
            0 ? (
            blog.comments.map(
              (
                item,
                index
              ) => (
                <div
                  key={index}
                  className="comment-card"
                >
                  {item}
                </div>
              )
            )
          ) : (
            <p>
              No comments yet.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default BlogDetails;