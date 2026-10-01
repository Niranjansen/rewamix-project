import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import api from "../api/axios";

const PlaceOrder = () => {
  const { cartItems, itemsPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "India",
    phone: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
  const [error, setError] = useState("");
  const [placing, setPlacing] = useState(false);

  const shipping = itemsPrice > 999 ? 0 : 49;
  const total = itemsPrice + shipping;

  if (cartItems.length === 0) {
    return <Navigate to="/cart" replace />;
  }

  const handleChange = (e) => setAddress({ ...address, [e.target.name]: e.target.value });

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setError("");
    setPlacing(true);
    try {
      const orderItems = cartItems.map((item) => ({
        name: item.name,
        qty: item.qty,
        image: item.image,
        price: item.price,
        product: item.product,
      }));

      const { data } = await api.post("/orders", {
        orderItems,
        shippingAddress: address,
        paymentMethod,
      });

      clearCart();
      navigate(`/order/${data._id}`, { state: { justPlaced: true } });
    } catch (err) {
      setError(err.response?.data?.message || "Could not place order. Please try again.");
    } finally {
      setPlacing(false);
    }
  };

  return (
    <div className="container checkout-layout">
      <form onSubmit={handlePlaceOrder}>
        <div className="checkout-form-card">
          <h3>Shipping Address</h3>
          {error && <div className="form-error">{error}</div>}
          <div className="field">
            <label>Full name</label>
            <input name="fullName" value={address.fullName} onChange={handleChange} required />
          </div>
          <div className="field">
            <label>Address</label>
            <input name="address" value={address.address} onChange={handleChange} required />
          </div>
          <div className="form-grid-2">
            <div className="field">
              <label>City</label>
              <input name="city" value={address.city} onChange={handleChange} required />
            </div>
            <div className="field">
              <label>Postal code</label>
              <input name="postalCode" value={address.postalCode} onChange={handleChange} required />
            </div>
          </div>
          <div className="form-grid-2">
            <div className="field">
              <label>Country</label>
              <input name="country" value={address.country} onChange={handleChange} required />
            </div>
            <div className="field">
              <label>Phone</label>
              <input name="phone" value={address.phone} onChange={handleChange} required />
            </div>
          </div>
        </div>

        <div className="checkout-form-card">
          <h3>Payment Method</h3>
          <div className="field">
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="Cash on Delivery"
                checked={paymentMethod === "Cash on Delivery"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                style={{ width: "auto", marginRight: 8 }}
              />
              Cash on Delivery
            </label>
          </div>
          <div className="field">
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="Card / UPI"
                checked={paymentMethod === "Card / UPI"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                style={{ width: "auto", marginRight: 8 }}
              />
              Card / UPI (pay on delivery portal)
            </label>
          </div>
        </div>
      </form>

      <div>
        <div className="order-review-card">
          <h3>Order Review</h3>
          {cartItems.map((item) => (
            <div className="review-item" key={item.product}>
              <span>{item.name} × {item.qty}</span>
              <span>₹{(item.price * item.qty).toLocaleString("en-IN")}</span>
            </div>
          ))}
        </div>

        <div className="summary-card">
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
          <button
            className="btn btn-primary btn-block"
            onClick={handlePlaceOrder}
            disabled={placing}
          >
            {placing ? "Placing order..." : "Place Order"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
