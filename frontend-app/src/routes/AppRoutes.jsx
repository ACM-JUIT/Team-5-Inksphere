import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import CreateBlog from "../pages/CreateBlog";
import BlogDetails from "../pages/BlogDetails";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/create-blog" element={<CreateBlog />} />
      <Route path="/blog" element={<BlogDetails />} />
    </Routes>
  );
}

export default AppRoutes;