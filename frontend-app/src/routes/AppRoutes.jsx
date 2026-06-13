import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import CreateBlog from "../pages/CreateBlog";
import BlogDetails from "../pages/BlogDetails";
import NotFound from "../pages/NotFound";

function AppRoutes({ searchTerm }) {
  return (
    <Routes>
      <Route
        path="/"
        element={<Home searchTerm={searchTerm} />}
      />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/create-blog" element={<CreateBlog />} />
      <Route path="/blog/:id" element={<BlogDetails />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;