import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import RichTextEditor from "../components/RichTextEditor";
import Select from "react-select";

function EditBlog({ blogs, setBlogs }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const blog = blogs.find((blog) => blog.id === Number(id));

  const [title, setTitle] = useState(blog?.title || "");
  const [description, setDescription] = useState(blog?.description || "");
  const [category, setCategory] = useState(blog?.category || "");
  const [image, setImage] = useState(blog?.image || "");
  const [content, setContent] = useState(blog?.content || "");
  const [error, setError] = useState("");

  const wordCount = content.trim() === "" ? 0 : content.replace(/<[^>]*>?/gm, '').trim().split(/\s+/).length;

  function handleUpdate(e) {
    if (e) e.preventDefault();

    if (!title || !description || !category || !image || !content) {
      setError("Please fill all fields");
      return;
    }

    const updatedBlogs = blogs.map((b) =>
      b.id === Number(id)
        ? { ...b, title, description, category, image, content }
        : b
    );

    setBlogs(updatedBlogs);
    navigate("/profile");
  }

  if (!blog) return <div className="not-found"><h2>Blog not found</h2></div>;

  return (
  <div
    style={{
      minHeight: "100vh",
      background: "#020b22",
      color: "white",
    }}
  >
      <nav className="navbar" style={{ padding: "15px 36px", borderBottom: "1px solid #e5e5e5", background: "#020b22", color: "white", display: "flex", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100 }}>
        <div className="nav-brand" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div className="nav-dot" style={{ width: "28px", height: "28px", background: "linear-gradient(135deg, #1d4ed8, #3b82f6)", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center", color: "white" }}>✍</div>
          <span className="nav-name" style={{ fontWeight: "bold", fontSize: "18px" }}>Editing Blog</span>
        </div>
        <div className="nav-right">
          <Link to="/profile">Cancel</Link>
          <button className="publish-btn" onClick={handleUpdate}>💾 Save Updates</button>
        </div>
      </nav>

      <div className="create-layout">
        <div className="editor-side">
          {error && <p className="error-message" style={{ color: "red", fontWeight: "bold", padding: "10px", background: "#fee2e2", borderRadius: "8px" }}>{error}</p>}
          
          <div className="editor-field">
            <label>Blog title</label>
            <input className="title-input" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>

          <div className="editor-field">
            <label>Description</label>
            <input className="title-input" style={{ fontSize: "16px", fontWeight: "normal" }} type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>

          <div className="editor-row2">
            <div className="editor-field">
              <label>Category</label>
              <Select
                value={{ value: category, label: category }}
                options={[
                  { value: "Tech", label: "Tech" },
                  { value: "Travel", label: "Travel" },
                  { value: "Lifestyle", label: "Lifestyle" },
                  { value: "Education", label: "Education" },
                ]}
                onChange={(selectedOption) =>
                  setCategory(selectedOption.value)
                }
                styles={{
                  control: (base) => ({
                    ...base,
                    backgroundColor: "#18233a",
                    borderColor: "#334155",
                    color: "white",
                  }),
                  menu: (base) => ({
                    ...base,
                    backgroundColor: "#18233a",
                  }),
                  option: (base, state) => ({
                    ...base,
                    backgroundColor: state.isFocused
                      ? "#2563eb"
                      : "#18233a",
                    color: "white",
                  }),
                  singleValue: (base) => ({
                    ...base,
                    color: "white",
                  }),
                }}
              />
            </div>
            <div className="editor-field">
              <label>Cover Image URL</label>
              <input className="tags-input" type="text" value={image} onChange={(e) => setImage(e.target.value)} />
            </div>
          </div>

          <div className="editor-field">
            <label>Content</label>
            <RichTextEditor content={content} setContent={setContent} />
            <div className="word-count">{wordCount} words</div>
          </div>
        </div>

        <div className="create-right-side">
          <div className="create-panel">
            <h4>🖼 Cover image Preview</h4>
            {image && <img src={image} alt="Cover Preview" style={{ width: "100%", borderRadius: "8px", objectFit: "cover", height: "150px" }} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditBlog;