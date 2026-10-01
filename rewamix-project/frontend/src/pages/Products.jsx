import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../api/axios";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";

const CATEGORIES = ["All", "Mithai", "Namkeen", "Bengali Sweets", "Dry Fruits", "Gift Box"];

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState(searchParams.get("keyword") || "");

  const activeCategory = searchParams.get("category") || "All";

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const params = {};
        if (searchParams.get("category")) params.category = searchParams.get("category");
        if (searchParams.get("keyword")) params.keyword = searchParams.get("keyword");
        const { data } = await api.get("/products", { params });
        setProducts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [searchParams]);

  const setCategory = (cat) => {
    const params = Object.fromEntries(searchParams);
    if (cat === "All") delete params.category;
    else params.category = cat;
    setSearchParams(params);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const params = Object.fromEntries(searchParams);
    if (keyword) params.keyword = keyword;
    else delete params.keyword;
    setSearchParams(params);
  };

  return (
    <div className="container section">
      <div className="section-head">
        <div>
          <h2>All products</h2>
          <p>{products.length} items found</p>
        </div>
        <form onSubmit={handleSearch} className="search-form" style={{ display: "flex", gap: 8 }}>
          <input
            className="field"
            style={{ marginBottom: 0, width: 220, padding: "10px 12px", border: "1px solid var(--border)", borderRadius: "var(--radius)" }}
            placeholder="Search products..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button className="btn btn-outline btn-sm" type="submit">Search</button>
        </form>
      </div>

      <div className="category-strip">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`chip ${activeCategory === cat ? "active" : ""}`}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <Loader />
      ) : products.length === 0 ? (
        <div className="empty-state">
          <h3>No products found</h3>
          <p>Try a different category or search term.</p>
        </div>
      ) : (
        <div className="product-grid">
          {products.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
