import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import RichTextEditor from "../components/RichTextEditor";
import Select from "react-select";

function CreateBlog({ blogs, setBlogs }) {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const wordCount = content.trim() === "" ? 0 : content.replace(/<[^>]*>?/gm, '').trim().split(/\s+/).length;

  function handleSubmit(e) {
    if (e) e.preventDefault();

    if (!title || !description || !category || !image || !content) {
      setError("Please fill all fields");
      return;
    }
    if (title.length < 5) {
      setError("Title must be at least 5 characters long");
      return;
    }
    if (content.length < 20) {
      setError("Blog content must be at least 20 characters long");
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
    navigate("/");
  }

  const selectStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: 'rgba(255, 255, 255, 0.08)',
      border: '0.5px solid rgba(255, 255, 255, 0.15)',
      borderRadius: '10px',
      padding: '4px',
      boxShadow: 'none',
      '&:hover': {
        borderColor: 'rgba(96, 165, 250, 0.6)'
      }
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: '#030b1e',
      border: '1px solid rgba(59, 130, 246, 0.15)',
      borderRadius: '8px',
      overflow: 'hidden'
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? 'rgba(37, 99, 235, 0.25)' : 'transparent',
      color: state.isFocused ? '#93c5fd' : 'rgba(255, 255, 255, 0.7)',
      cursor: 'pointer',
      padding: '10px 15px'
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#fff'
    }),
    placeholder: (provided) => ({
      ...provided,
      color: 'rgba(255, 255, 255, 0.3)'
    })
  };

  return (
    <div>
      <nav className="navbar" style={{ padding: "15px 36px", zIndex: 100 }}>
        <div className="nav-brand" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div className="nav-dot" style={{ width: "28px", height: "28px", background: "linear-gradient(135deg, #1d4ed8, #3b82f6)", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center", color: "white" }}>✍</div>
          <span className="nav-name" style={{ fontWeight: "bold", fontSize: "18px", fontFamily: "'Playfair Display', serif" }}>InkSphere Editor</span>
        </div>
        <div className="nav-right">
          <Link to="/">Cancel</Link>
          <button className="save-draft-btn">💾 Save draft</button>
          <button className="publish-btn" onClick={handleSubmit}>🚀 Publish</button>
        </div>
      </nav>

      <div className="create-layout">
        <div className="editor-side">
          {error && <p className="error-message" style={{ color: "#ff6b6b", fontWeight: "500", padding: "10px", background: "rgba(255, 107, 107, 0.1)", border: "1px solid rgba(255, 107, 107, 0.3)", borderRadius: "8px" }}>{error}</p>}
          
          <div className="editor-field">
            <label>Blog title</label>
            <input
              className="title-input"
              type="text"
              placeholder="Write a compelling title..."
              value={title}
              onChange={(e) => { setTitle(e.target.value); setError(""); }}
            />
          </div>

          <div className="editor-field">
            <label>Description (Short summary)</label>
            <input
              className="title-input"
              style={{ fontSize: "15px", fontWeight: "normal" }}
              type="text"
              placeholder="What is this blog about?"
              value={description}
              onChange={(e) => { setDescription(e.target.value); setError(""); }}
            />
          </div>

          <div className="editor-row2">
            <div className="editor-field">
              <label>Category</label>
              <Select
                placeholder="Select Category"
                styles={selectStyles}
                options={[
                  { value: "Tech", label: "Tech" },
                  { value: "Travel", label: "Travel" },
                  { value: "Lifestyle", label: "Lifestyle" },
                  { value: "Education", label: "Education" },
                ]}
                onChange={(selectedOption) => { setCategory(selectedOption.value); setError(""); }}
              />
            </div>
            <div className="editor-field">
              <label>Cover Image URL</label>
              <input
                className="tags-input"
                type="text"
                placeholder="https://..."
                value={image}
                onChange={(e) => { setImage(e.target.value); setError(""); }}
              />
            </div>
          </div>

          <div className="editor-field">
            <label>Content</label>
            <RichTextEditor content={content} setContent={setContent} />
            <div className="word-count">
              {wordCount} {wordCount === 1 ? "word" : "words"}
            </div>
          </div>
        </div>

        <div className="create-right-side">
          <div className="create-panel">
            <h4>🖼 Cover image Preview</h4>
            {image ? (
              <img src={image} alt="Cover Preview" style={{ width: "100%", borderRadius: "8px", objectFit: "cover", height: "150px" }} />
            ) : (
              <div className="cover-upload">
                <p className="upload-icon">☁</p>
                <p>Paste image URL in the field</p>
              </div>
            )}
          </div>

          <div className="create-panel">
            <h4>✅ Publishing checklist</h4>
            <div className="checklist">
              <div className="check-item">
                <span className={title.length >= 5 ? "check-done" : "check-pending"}>
                  {title.length >= 5 ? "✓" : "○"}
                </span>
                Title added (min 5 chars)
              </div>
              <div className="check-item">
                <span className={category ? "check-done" : "check-pending"}>
                  {category ? "✓" : "○"}
                </span>
                Category selected
              </div>
              <div className="check-item">
                <span className={image ? "check-done" : "check-pending"}>
                  {image ? "✓" : "○"}
                </span>
                Cover image linked
              </div>
              <div className="check-item">
                <span className={content.length >= 20 ? "check-done" : "check-pending"}>
                  {content.length >= 20 ? "✓" : "○"}
                </span>
                Content written (min 20 chars)
              </div>
            </div>
          </div>

          <div className="create-panel">
            <h4>💡 Writing tips</h4>
            <div className="tip-item"><p>Start with a hook — a question or bold statement grabs readers instantly.</p></div>
            <div className="tip-item"><p>Use short paragraphs and headings to make your blog easy to scan.</p></div>
            <div className="tip-item"><p>A good cover image increases clicks by up to 3x.</p></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateBlog;