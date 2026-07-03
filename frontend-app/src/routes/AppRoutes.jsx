import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import CreateBlog from "../pages/CreateBlog";
import EditBlog from "../pages/EditBlog";
import BlogDetails from "../pages/BlogDetails";
import Trending from "../pages/Trending";
import NotFound from "../pages/NotFound";
import EditProfile from "../pages/EditProfile";

function AppRoutes({ searchTerm, blogs, setBlogs }) {
  return (
    <Routes>
      <Route path="/" element={<Home searchTerm={searchTerm} blogs={blogs} setBlogs={setBlogs} />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile blogs={blogs} setBlogs={setBlogs} />} />
      <Route path="/create-blog" element={<CreateBlog blogs={blogs} setBlogs={setBlogs} />} />
      <Route path="/edit-blog/:id" element={<EditBlog blogs={blogs} setBlogs={setBlogs} />} />
      <Route path="/blog/:id" element={<BlogDetails blogs={blogs} setBlogs={setBlogs} />} />
      <Route path="/trending" element={<Trending blogs={blogs} setBlogs={setBlogs} />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/edit-profile" element={<EditProfile />} />
    </Routes>
  );
}

export default AppRoutes;