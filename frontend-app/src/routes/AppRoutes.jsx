import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import CreateBlog from "../pages/CreateBlog";
import EditBlog from "../pages/EditBlog";
import BlogDetails from "../pages/BlogDetails";
import NotFound from "../pages/NotFound";

function AppRoutes({
  searchTerm,
  blogs,
  setBlogs,
}) {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Home
            searchTerm={searchTerm}
            blogs={blogs}
          />
        }
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      <Route
        path="/profile"
        element={
          <Profile
            blogs={blogs}
            setBlogs={setBlogs}
          />
        }
      />

      <Route
        path="/create-blog"
        element={
          <CreateBlog
            blogs={blogs}
            setBlogs={setBlogs}
          />
        }
      />

      <Route
        path="/edit-blog/:id"
        element={
          <EditBlog
            blogs={blogs}
            setBlogs={setBlogs}
          />
        }
      />

      <Route
        path="/blog/:id"
        element={
          <BlogDetails blogs={blogs} />
        }
      />

      <Route
        path="*"
        element={<NotFound />}
      />
    </Routes>
  );
}

export default AppRoutes;