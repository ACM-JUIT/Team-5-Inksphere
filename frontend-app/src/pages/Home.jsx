import { useState } from "react";
import HeroSection from "../components/HeroSection";
import Categories from "../components/Categories";
import BlogCard from "../components/BlogCard";
import Footer from "../components/Footer";

function Home({ searchTerm, blogs }) {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredBlogs = blogs.filter((blog) => {
    const matchesCategory =
      activeCategory === "All" ||
      blog.category === activeCategory;

    const matchesSearch =
      blog.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      blog.description
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div>
      <HeroSection />

      <Categories
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      <h2 className="section-title">
        Latest Blogs
      </h2>

      <div className="blog-container">
        {filteredBlogs.length > 0 ? (
          filteredBlogs.map((blog) => (
            <BlogCard
              key={blog.id}
              id={blog.id}
              title={blog.title}
              description={blog.description}
              content={blog.content}
              category={blog.category}
              image={blog.image}
              likes={blog.likes}
              views={blog.views}
            />
          ))
        ) : (
          <div className="no-blogs">
            <h2>No Blogs Found</h2>

            <p>
              Try another category or search term.
            </p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default Home;