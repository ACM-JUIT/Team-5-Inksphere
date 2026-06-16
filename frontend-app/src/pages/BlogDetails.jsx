import { useParams } from "react-router-dom";

function BlogDetails({ blogs }) {
  const { id } = useParams();

  const blog = blogs.find(
    (blog) => blog.id === Number(id)
  );

  if (!blog) {
    return (
      <div className="blog-details">
        <h1>Blog Not Found</h1>
      </div>
    );
  }

  return (
    <div>
      <div className="blog-details">
        <img
          src={blog.image}
          alt={blog.title}
        />

        <h1>{blog.title}</h1>

        <p className="blog-category">
          {blog.category}
        </p>

        <p>
          {blog.content || blog.description}
        </p>
      </div>
    </div>
  );
}

export default BlogDetails;