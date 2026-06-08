import Navbar from "../components/Navbar";

function CreateBlog() {
  return (
    <div>
      <Navbar />

      <h1>Create Blog</h1>

      <input
        type="text"
        placeholder="Enter Blog Title"
      />

      <br />
      <br />

      <select>
        <option>Tech</option>
        <option>Travel</option>
        <option>Lifestyle</option>
        <option>Education</option>
      </select>

      <br />
      <br />

      <textarea
        placeholder="Write your blog here..."
        rows="10"
        cols="50"
      ></textarea>

      <br />
      <br />

      <button>Publish Blog</button>
    </div>
  );
}

export default CreateBlog;