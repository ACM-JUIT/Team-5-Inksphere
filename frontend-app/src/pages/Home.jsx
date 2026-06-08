import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import Categories from "../components/Categories";
import BlogCard from "../components/BlogCard";

function Home() {
  return (
    <div>
      <Navbar />

      <HeroSection />

      <Categories />

      <h2>Latest Blogs</h2>

      <BlogCard />
      <BlogCard />
      <BlogCard />
    </div>
  );
}

export default Home;