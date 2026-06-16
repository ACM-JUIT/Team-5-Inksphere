import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateBlog({ blogs, setBlogs }) {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] =
    useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (
      !title ||
      !description ||
      !category ||
      !image ||
      !content
    ) {
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
      description,
      content,
      category,
      image,
    };

    setBlogs([newBlog, ...blogs]);

    setError("");
    setTitle("");
    setDescription("");
    setCategory("");
    setImage("");
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

          <input
            type="text"
            placeholder="Enter Blog Description"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
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

          <input
            type="text"
            placeholder="Enter Image URL"
            value={image}
            onChange={(e) => {
              setImage(e.target.value);
              setError("");
            }}
          />

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