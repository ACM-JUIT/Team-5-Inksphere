import { useState } from "react";
import { Link } from "react-router-dom";

function CreateBlog() {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");

  const wordCount = content.trim() === "" ? 0 : content.trim().split(/\s+/).length;

  return (
    <div>
      <nav className="navbar">
        <div className="nav-brand">
          <div className="nav-dot">✍</div>
          <span className="nav-name">InkSphere</span>
        </div>
        <div className="nav-right">
          <Link to="/">Home</Link>
          <button className="save-draft-btn">💾 Save draft</button>
          <button className="publish-btn">🚀 Publish</button>
        </div>
      </nav>

      <div className="create-layout">
        <div className="editor-side">

          <div className="editor-field">
            <label>Blog title</label>
            <input
              className="title-input"
              type="text"
              placeholder="Write a compelling title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="editor-row2">
            <div className="editor-field">
              <label>Category</label>
              <select
                className="editor-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select category</option>
                <option>Tech</option>
                <option>Travel</option>
                <option>Lifestyle</option>
                <option>Education</option>
              </select>
            </div>
            <div className="editor-field">
              <label>Tags</label>
              <input
                className="tags-input"
                type="text"
                placeholder="e.g. react, webdev"
              />
            </div>
          </div>

          <div className="editor-field">
            <label>Content</label>
            <div className="toolbar">
              <button className="tb-btn"><b>B</b></button>
              <button className="tb-btn"><i>I</i></button>
              <button className="tb-btn"><u>U</u></button>
              <div className="tb-sep"></div>
              <button className="tb-btn">H1</button>
              <button className="tb-btn">H2</button>
              <div className="tb-sep"></div>
              <button className="tb-btn">• List</button>
              <button className="tb-btn">1. List</button>
              <button className="tb-btn">" Quote</button>
              <div className="tb-sep"></div>
              <button className="tb-btn">🔗 Link</button>
              <button className="tb-btn">🖼 Image</button>
              <button className="tb-btn">{"<>"} Code</button>
            </div>
            <textarea
              className="content-area"
              placeholder="Start writing your blog here... Share your ideas, insights and stories with the world."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <div className="word-count">
              {wordCount} {wordCount === 1 ? "word" : "words"}
            </div>
          </div>

        </div>

        <div className="create-right-side">

          <div className="create-panel">
            <h4>🖼 Cover image</h4>
            <div className="cover-upload">
              <p className="upload-icon">☁</p>
              <p>Click to upload cover image</p>
              <span>PNG, JPG up to 5MB</span>
            </div>
          </div>

          <div className="create-panel">
            <h4>✅ Publishing checklist</h4>
            <div className="checklist">
              <div className="check-item">
                <span className={title ? "check-done" : "check-pending"}>
                  {title ? "✓" : "○"}
                </span>
                Title added
              </div>
              <div className="check-item">
                <span className={category ? "check-done" : "check-pending"}>
                  {category ? "✓" : "○"}
                </span>
                Category selected
              </div>
              <div className="check-item">
                <span className="check-pending">○</span>
                Cover image uploaded
              </div>
              <div className="check-item">
                <span className={wordCount > 50 ? "check-done" : "check-pending"}>
                  {wordCount > 50 ? "✓" : "○"}
                </span>
                Content written (min 50 words)
              </div>
            </div>
          </div>

          <div className="create-panel">
            <h4>💡 Writing tips</h4>
            <div className="tip-item">
              <p>Start with a hook — a question or bold statement grabs readers instantly.</p>
            </div>
            <div className="tip-item">
              <p>Use short paragraphs and headings to make your blog easy to scan.</p>
            </div>
            <div className="tip-item">
              <p>A good cover image increases clicks by up to 3x.</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default CreateBlog;