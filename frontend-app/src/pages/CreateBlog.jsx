import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateBlog({ blogs, setBlogs }) {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!title || !category || !content) {
      setError("Please fill all fields");
      return;
    }

    if (title.length < 5) {
      setError(
        "Title must be at least 5 characters long"
      );
      return;
    }

    if (content.length < 20) {
      setError(
        "Blog content must be at least 20 characters long"
      );
      return;
    }

    const newBlog = {
      id: Date.now(),
      title,
      description:
        content.length > 100
          ? content.slice(0, 100) + "..."
          : content,
      content,
      category,
      image:
        "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200",
    };

    setBlogs([newBlog, ...blogs]);

    setError("");
    setTitle("");
    setCategory("");
    setContent("");

    navigate("/");
  }

  return (
    <div>
      <div className="create-blog">
        <h1>Create Blog</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter Blog Title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setError("");
            }}
          />

          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setError("");
            }}
          >
            <option value="">
              Select Category
            </option>

            <option value="Tech">
              Tech
            </option>

            <option value="Travel">
              Travel
            </option>

            <option value="Lifestyle">
              Lifestyle
            </option>

            <option value="Education">
              Education
            </option>
          </select>

          <textarea
            rows="10"
            placeholder="Write your blog here..."
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
              setError("");
            }}
          />

          {error && (
            <p className="error-message">
              {error}
            </p>
          )}

          <button type="submit">
            Publish Blog
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateBlog;