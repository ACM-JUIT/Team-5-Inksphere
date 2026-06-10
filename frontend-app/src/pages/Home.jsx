import { useState } from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import Categories from "../components/Categories";
import BlogCard from "../components/BlogCard";
import Footer from "../components/Footer";

function Home() {
  const [activeCategory, setActiveCategory] = useState("All");

  const blogs = [
    {
      id: 1,
      title: "Getting Started with React",
      description: "Learn the basics of React and build modern web apps.",
      category: "Tech",
    },
    {
      id: 2,
      title: "Travel Guide",
      description: "Explore amazing destinations around the world.",
      category: "Travel",
    },
    {
      id: 3,
      title: "Student Productivity",
      description: "Simple habits to stay productive every day.",
      category: "Education",
    },
  ];

  const filteredBlogs =
    activeCategory === "All"
      ? blogs
      : blogs.filter(
          (blog) => blog.category === activeCategory
        );

  return (
    <div>
      <Navbar />

      <HeroSection />

      <Categories
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      <h2 className="section-title">
        {filteredBlogs.length > 0
          ? "Latest Blogs"
          : "More blogs coming soon..."}
      </h2>

      <div className="blog-container">
        {filteredBlogs.map((blog) => (
          <BlogCard
            key={blog.id}
            title={blog.title}
            description={blog.description}
            category={blog.category}
          />
        ))}
      </div>

      <Footer />
    </div>
  );
}

export default Home;