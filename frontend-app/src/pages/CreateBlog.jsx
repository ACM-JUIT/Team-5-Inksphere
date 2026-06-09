import Navbar from "../components/Navbar";

function CreateBlog() {
  return (
    <div>
      <Navbar />

      <div className="create-blog">
        <h1>Create Blog</h1>

        <input
          type="text"
          placeholder="Enter Blog Title"
        />

        <select>
          <option>Tech</option>
          <option>Travel</option>
          <option>Lifestyle</option>
          <option>Education</option>
        </select>

        <textarea
          rows="10"
          placeholder="Write your blog here..."
        ></textarea>

        <button>Publish Blog</button>
      </div>
    </div>
  );
}

export default CreateBlog;