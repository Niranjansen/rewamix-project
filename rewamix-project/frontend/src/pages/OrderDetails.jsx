import { useEffect, useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import api from "../api/axios";
import Loader from "../components/Loader";
import OrderActions, { statusClass } from "../components/OrderActions";

const OrderDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const justPlaced = Boolean(location.state?.justPlaced);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data } = await api.get(`/orders/${id}`);
        setOrder(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  if (loading) return <Loader />;
  if (!order) {
    return (
      <div className="empty-state">
        <h3>Order not found</h3>
        <Link to="/" className="btn btn-outline btn-sm">Back home</Link>
      </div>
    );
  }

  return (
    <div className="container order-page">
      {justPlaced ? (
        <div className="order-success">
          <div className="check">✓</div>
          <h2>Order placed successfully!</h2>
          <p>
            Thanks for your order. We've sent a confirmation and will notify you
            when it ships. You can cancel it anytime before it ships.
          </p>
        </div>
      ) : (
        <h2 style={{ marginBottom: 20 }}>Order details</h2>
      )}

      <OrderActions order={order} onUpdated={(u) => setOrder((prev) => ({ ...prev, ...u }))} />

      <div className="order-card">
        <div className="order-card-head">
          <div>
            <strong>Order #{order._id.slice(-8).toUpperCase()}</strong>
            <div style={{ fontSize: "0.85rem", color: "var(--muted)" }}>
              Placed on {new Date(order.createdAt).toLocaleDateString()}
            </div>
          </div>
          <span className={`status-badge ${statusClass(order.status)}`}>{order.status}</span>
        </div>

        {order.orderItems.map((item, idx) => (
          <div className="order-line" key={idx}>
            <img src={item.image} alt={item.name} />
            <div style={{ flex: 1 }}>{item.name} × {item.qty}</div>
            <div>₹{(item.price * item.qty).toLocaleString("en-IN")}</div>
          </div>
        ))}
      </div>

      <div className="order-card">
        <h3 style={{ marginBottom: 14 }}>Shipping Address</h3>
        <p style={{ margin: 0 }}>
          {order.shippingAddress.fullName}<br />
          {order.shippingAddress.address}, {order.shippingAddress.city}<br />
          {order.shippingAddress.postalCode}, {order.shippingAddress.country}<br />
          Phone: {order.shippingAddress.phone}
        </p>
      </div>

      <div className="order-card">
        <div className="review-item">
          <span>Payment method</span>
          <span>{order.paymentMethod}</span>
        </div>
        <div className="review-item">
          <span>Items</span>
          <span>₹{order.itemsPrice.toLocaleString("en-IN")}</span>
        </div>
        <div className="review-item">
          <span>Shipping</span>
          <span>{order.shippingPrice === 0 ? "Free" : `₹${order.shippingPrice}`}</span>
        </div>
        <div className="review-item" style={{ fontWeight: 700 }}>
          <span>Total</span>
          <span>₹{order.totalPrice.toLocaleString("en-IN")}</span>
        </div>
      </div>

      <p style={{ fontSize: "0.85rem", color: "var(--muted)" }}>
        See our <Link to="/refund-policy" style={{ color: "var(--primary)" }}>Refund, Cancellation &amp; Return Policy</Link>.
      </p>

      <Link to="/products" className="btn btn-outline">Continue shopping</Link>
    </div>
  );
};

export default OrderDetails;
