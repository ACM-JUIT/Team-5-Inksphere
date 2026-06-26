import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RichTextEditor from "../components/RichTextEditor";
import Select from "react-select";

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

      likes: 0,
      views: 0,
      liked: false,
      bookmarked: false,
      comments: [],
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

          <Select
            placeholder="Select Category"
            options={[
              { value: "Tech", label: "Tech" },
              { value: "Travel", label: "Travel" },
              { value: "Lifestyle", label: "Lifestyle" },
              { value: "Education", label: "Education" },
            ]}
            onChange={(selectedOption) => {
              setCategory(selectedOption.value);
              setError("");
            }}
          />

          <input
            type="text"
            placeholder="Enter Image URL"
            value={image}
            onChange={(e) => {
              setImage(e.target.value);
              setError("");
            }}
          />

          <RichTextEditor
            content={content}
            setContent={setContent}
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