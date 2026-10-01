import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const Cart = () => {
  const { cartItems, updateQty, removeFromCart, itemsPrice, itemsCount } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const shipping = itemsPrice > 999 || itemsPrice === 0 ? 0 : 49;
  const total = itemsPrice + shipping;

  const handleCheckout = () => {
    if (!user) {
      navigate("/login?redirect=/placeorder");
    } else {
      navigate("/placeorder");
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="container empty-state">
        <h3>Your cart is empty</h3>
        <p>Looks like you haven't added anything yet.</p>
        <Link to="/products" className="btn btn-primary">Browse products</Link>
      </div>
    );
  }

  return (
    <div className="container cart-layout">
      <div>
        <h2 style={{ marginBottom: 20 }}>Your Cart ({itemsCount} items)</h2>
        {cartItems.map((item) => (
          <div className="cart-item" key={item.product}>
            <img src={item.image} alt={item.name} />
            <div>
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-price">₹{item.price.toLocaleString("en-IN")} each</div>
            </div>
            <div className="qty-control">
              <button onClick={() => updateQty(item.product, item.qty - 1)}>−</button>
              <span>{item.qty}</span>
              <button
                onClick={() => updateQty(item.product, item.qty + 1)}
                disabled={item.qty >= item.countInStock}
              >
                +
              </button>
            </div>
            <button className="remove-link" onClick={() => removeFromCart(item.product)}>
              Remove
            </button>
          </div>
        ))}
        <div style={{ marginTop: 20 }}>
          <Link to="/products" className="btn btn-outline btn-sm">← Continue shopping</Link>
        </div>
      </div>

      <div className="summary-card">
        <h3 style={{ marginBottom: 18 }}>Order Summary</h3>
        <div className="summary-row">
          <span>Subtotal</span>
          <span>₹{itemsPrice.toLocaleString("en-IN")}</span>
        </div>
        <div className="summary-row">
          <span>Shipping</span>
          <span>{shipping === 0 ? "Free" : `₹${shipping}`}</span>
        </div>
        <div className="summary-row total">
          <span>Total</span>
          <span>₹{total.toLocaleString("en-IN")}</span>
        </div>
        <button className="btn btn-primary btn-block" onClick={handleCheckout}>
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
