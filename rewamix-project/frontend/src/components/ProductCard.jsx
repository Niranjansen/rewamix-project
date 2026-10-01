import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <Link to={`/products/${product._id}`} className="product-card">
      <div className="product-thumb">
        <img src={product.image} alt={product.name} loading="lazy" />
      </div>
      <div className="product-body">
        <span className="product-category">{product.category}</span>
        <span className="product-name">{product.name}</span>
        <div className="product-footer">
          <span className="price">₹{product.price.toLocaleString("en-IN")}</span>
          <span className="rating">★ {product.rating}</span>
        </div>
        <span className={`stock-tag ${product.countInStock > 0 ? "in" : "out"}`}>
          {product.countInStock > 0 ? "In stock" : "Out of stock"}
        </span>
      </div>
    </Link>
  );
};

export default ProductCard;
