import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { products, categories } from "../data/products";

// The Products page shows all products with search, category filter,
// and price sorting. The search term and category can come from the URL
// (set by the Navbar search bar or category links).

function Products({ searchQuery }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const [localSearch, setLocalSearch] = useState(searchQuery || "");
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || "All"
  );
  const [sortBy, setSortBy] = useState("default");

  // Sync search from navbar and category from URL
  useEffect(() => {
    setLocalSearch(searchQuery || "");
  }, [searchQuery]);

  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) {
      setSelectedCategory(cat);
    }
  }, [searchParams]);

  function handleCategoryChange(cat) {
    setSelectedCategory(cat);
    if (cat === "All") {
      setSearchParams({});
    } else {
      setSearchParams({ category: cat });
    }
  }

  // Filter and sort products based on search, category, and sort option
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by search text
    if (localSearch.trim()) {
      const query = localSearch.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query)
      );
    }

    // Filter by category
    if (selectedCategory !== "All") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Sort
    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [localSearch, selectedCategory, sortBy]);

  const allCategories = ["All", ...categories.map((c) => c.name)];

  return (
    <div className="nc-page-wrapper">
      <div className="container py-4">
        {/* Page Header */}
        <div className="nc-page-header">
          <h1 className="nc-page-title">Shop All Products</h1>
          <p className="nc-page-subtitle">
            Discover our full collection of premium products
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="nc-filter-bar">
          <div className="row align-items-center g-3">
            <div className="col-md-5">
              <div className="nc-search-box">
                <i className="bi bi-search nc-search-icon"></i>
                <input
                  type="text"
                  className="form-control nc-search-input-lg"
                  placeholder="Search by product name..."
                  value={localSearch}
                  onChange={(e) => setLocalSearch(e.target.value)}
                />
                {localSearch && (
                  <button
                    className="nc-search-clear"
                    onClick={() => setLocalSearch("")}
                    aria-label="Clear search"
                  >
                    <i className="bi bi-x-lg"></i>
                  </button>
                )}
              </div>
            </div>

            <div className="col-md-4">
              <div className="nc-category-pills">
                {allCategories.map((cat) => (
                  <button
                    key={cat}
                    className={
                      "nc-category-pill" +
                      (selectedCategory === cat ? " active" : "")
                    }
                    onClick={() => handleCategoryChange(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="col-md-3">
              <select
                className="form-select nc-sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="default">Sort: Default</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name: A to Z</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="nc-results-info">
          <p>
            Showing <strong>{filteredProducts.length}</strong>{" "}
            {filteredProducts.length === 1 ? "product" : "products"}
            {selectedCategory !== "All" && (
              <> in <strong>{selectedCategory}</strong></>
            )}
            {localSearch && (
              <> matching <strong>"{localSearch}"</strong></>
            )}
          </p>
        </div>

        {/* Products Grid or Empty Messages */}
        {filteredProducts.length > 0 ? (
          <div className="row g-4">
            {filteredProducts.map((product) => (
              <div className="col-6 col-md-4 col-lg-3" key={product.id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="nc-empty-state">
            <i className="bi bi-search nc-empty-icon"></i>
            <h4>No products found</h4>
            <p>
              {localSearch
                ? `We could not find any products matching "${localSearch}".`
                : "No products available in this category."}
            </p>
            <button
              className="btn nc-btn-dark"
              onClick={() => {
                setLocalSearch("");
                handleCategoryChange("All");
              }}
            >
              <i className="bi bi-arrow-left me-1"></i> Back to All Products
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Products;
