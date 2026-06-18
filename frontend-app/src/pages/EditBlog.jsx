import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditBlog({ blogs, setBlogs }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const blog = blogs.find(
    (blog) => blog.id === Number(id)
  );

  const [title, setTitle] = useState(
    blog?.title || ""
  );

  const [description, setDescription] =
    useState(blog?.description || "");

  const [category, setCategory] = useState(
    blog?.category || ""
  );

  const [image, setImage] = useState(
    blog?.image || ""
  );

  const [content, setContent] = useState(
    blog?.content || ""
  );

  const [error, setError] = useState("");

  function handleUpdate(e) {
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

    const updatedBlogs = blogs.map((blog) =>
      blog.id === Number(id)
        ? {
            ...blog,
            title,
            description,
            category,
            image,
            content,
          }
        : blog
    );

    setBlogs(updatedBlogs);

    navigate("/profile");
  }

  return (
    <div className="create-blog">
      <h1>Edit Blog</h1>

      <form onSubmit={handleUpdate}>
        <input
          type="text"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
        />

        <input
          type="text"
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
        />

        <select
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
        >
          <option value="Tech">Tech</option>
          <option value="Travel">Travel</option>
          <option value="Lifestyle">
            Lifestyle
          </option>
          <option value="Education">
            Education
          </option>
        </select>

        <input
          type="text"
          value={image}
          onChange={(e) =>
            setImage(e.target.value)
          }
        />

        <textarea
          rows="10"
          value={content}
          onChange={(e) =>
            setContent(e.target.value)
          }
        />

        {error && (
          <p className="error-message">
            {error}
          </p>
        )}

        <button type="submit">
          Update Blog
        </button>
      </form>
    </div>
  );
}

export default EditBlog;