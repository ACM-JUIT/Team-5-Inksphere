import "./App.css";
import { useState } from "react";
import Navbar from "./components/Navbar";
import AppRoutes from "./routes/AppRoutes";
import blogsData from "./data/blogs";

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  const [blogs, setBlogs] = useState(blogsData);

  return (
    <>
      <Navbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <AppRoutes
        searchTerm={searchTerm}
        blogs={blogs}
        setBlogs={setBlogs}
      />
    </>
  );
}

export default App;