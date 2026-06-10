function Categories({ activeCategory, setActiveCategory }) {
  return (
    <div className="categories">
      <button
        className={activeCategory === "All" ? "active-category" : ""}
        onClick={() => setActiveCategory("All")}
      >
        All
      </button>

      <button
        className={activeCategory === "Tech" ? "active-category" : ""}
        onClick={() => setActiveCategory("Tech")}
      >
        Tech
      </button>

      <button
        className={activeCategory === "Travel" ? "active-category" : ""}
        onClick={() => setActiveCategory("Travel")}
      >
        Travel
      </button>

      <button
        className={activeCategory === "Lifestyle" ? "active-category" : ""}
        onClick={() => setActiveCategory("Lifestyle")}
      >
        Lifestyle
      </button>

      <button
        className={activeCategory === "Education" ? "active-category" : ""}
        onClick={() => setActiveCategory("Education")}
      >
        Education
      </button>
    </div>
  );
}

export default Categories;