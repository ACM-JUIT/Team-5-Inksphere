import { useParams } from "react-router-dom";
import blogs from "../data/blogs";

function BlogDetails() {
  const { id } = useParams();

  const blog = blogs.find(
    (blog) => blog.id === Number(id)
  );

  if (!blog) {
    return (
      <div>
        <div className="blog-details">
          <h1>Blog Not Found</h1>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="blog-details">
        <img
          src={blog.image}
          alt="blog"
        />

        <h1>{blog.title}</h1>

        <p className="blog-category">
          {blog.category}
        </p>

        <p>{blog.description}</p>

        <p>
          Full blog content will appear here.
        </p>
      </div>
    </div>
  );
}

export default BlogDetails;