import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import Categories from "../components/Categories";
import BlogCard from "../components/BlogCard";
import Footer from "../components/Footer";

function Home() {
  return (
    <div>
      <Navbar />

      <HeroSection />

      <Categories />
      

      <h2 className="section-title">Latest Blogs</h2>

      <div className="blog-container">
        <BlogCard />
        <BlogCard />
        <BlogCard />
      </div>
      <Footer />
    </div>
  );
}

export default Home;