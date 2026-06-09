import Navbar from "../components/Navbar";

function BlogDetails() {
  return (
    <div>
      <Navbar />

      <div className="blog-details">
        <img
          src="https://via.placeholder.com/900x400"
          alt="blog"
        />

        <h1>Blog Title</h1>

        <p className="blog-category">Category</p>

        <p>Description of the blog.</p>

        <p>Full blog content will appear here.</p>
      </div>
    </div>
  );
}

export default BlogDetails;