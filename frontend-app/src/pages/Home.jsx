import { useState } from "react";
import HeroSection from "../components/HeroSection";
import Categories from "../components/Categories";
import BlogCard from "../components/BlogCard";
import Footer from "../components/Footer";
import blogs from "../data/blogs";

function Home({ searchTerm }) {
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
        {filteredBlogs.length > 0
          ? "Latest Blogs"
          : "No Blogs Found"}
      </h2>

      <div className="blog-container">
        {filteredBlogs.map((blog) => (
          <BlogCard
            key={blog.id}
            id={blog.id}
            title={blog.title}
            description={blog.description}
            category={blog.category}
            image={blog.image}
          />
        ))}
      </div>

      <Footer />
    </div>
  );
}

export default Home;