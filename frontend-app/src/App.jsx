import "./App.css";
import { useState } from "react";
import Navbar from "./components/Navbar";
import AppRoutes from "./routes/AppRoutes";
import blogsData from "./data/blogs";

function App() {
  const [searchTerm, setSearchTerm] =
    useState("");

  const [blogs, setBlogs] =
    useState(blogsData);

  const [isLoggedIn, setIsLoggedIn] =
    useState(
      localStorage.getItem(
        "isLoggedIn"
      ) === "true"
    );

  return (
    <>
      <Navbar
        searchTerm={searchTerm}
        setSearchTerm={
          setSearchTerm
        }
        isLoggedIn={
          isLoggedIn
        }
        setIsLoggedIn={
          setIsLoggedIn
        }
      />

      <AppRoutes
        searchTerm={
          searchTerm
        }
        blogs={blogs}
        setBlogs={setBlogs}
      />
    </>
  );
}

export default App;