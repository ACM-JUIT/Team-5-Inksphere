import Navbar from "../components/Navbar";

function BlogDetails() {
  return (
    <div>
      <Navbar />

      <div className="blog-details">
        <img
          src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200"
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