import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import { useCart } from "../context/CartContext";
import Loader from "../components/Loader";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setAdded(false);
      try {
        const { data } = await api.get(`/products/${id}`);
        setProduct(data);
        setQty(1);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <Loader />;
  if (!product) {
    return (
      <div className="empty-state">
        <h3>Product not found</h3>
        <Link to="/products" className="btn btn-outline btn-sm">Back to products</Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, qty);
    setAdded(true);
  };

  const handleBuyNow = () => {
    addToCart(product, qty);
    navigate("/cart");
  };

  return (
    <div className="container">
      <div className="breadcrumb">
        <Link to="/">Home</Link> / <Link to="/products">Products</Link> / {product.name}
      </div>

      <div className="product-detail">
        <div className="product-detail-image">
          <img src={product.image} alt={product.name} />
        </div>

        <div className="product-detail-info">
          <span className="product-category">{product.category}</span>
          <h1>{product.name}</h1>
          <span className="rating">★ {product.rating} rating</span>
          <div className="product-detail-price">₹{product.price.toLocaleString("en-IN")}</div>
          <p className="product-detail-desc">{product.description}</p>

          <span className={`stock-tag ${product.countInStock > 0 ? "in" : "out"}`}>
            {product.countInStock > 0 ? `In stock (${product.countInStock} available)` : "Out of stock"}
          </span>

          {product.countInStock > 0 && (
            <div className="qty-row" style={{ marginTop: 20 }}>
              <div className="qty-control">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))}>−</button>
                <span>{qty}</span>
                <button onClick={() => setQty((q) => Math.min(product.countInStock, q + 1))}>+</button>
              </div>
            </div>
          )}

          <div style={{ display: "flex", gap: 12 }}>
            <button
              className="btn btn-primary"
              disabled={product.countInStock === 0}
              onClick={handleAddToCart}
            >
              {added ? "Added ✓" : "Add to Cart"}
            </button>
            <button
              className="btn btn-accent"
              disabled={product.countInStock === 0}
              onClick={handleBuyNow}
            >
              Buy Now
            </button>
          </div>

          <div className="detail-meta">
            <span>Free delivery over ₹999</span>
            <span>100% fresh, made daily</span>
            <span>Hygienically packed</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
