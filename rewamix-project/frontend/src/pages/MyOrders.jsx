import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import Loader from "../components/Loader";
import OrderActions, { statusClass } from "../components/OrderActions";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await api.get("/orders/myorders");
        setOrders(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const replaceOrder = (updated) =>
    setOrders((prev) => prev.map((o) => (o._id === updated._id ? { ...o, ...updated } : o)));

  if (loading) return <Loader />;

  return (
    <div className="container order-page">
      <h2 style={{ marginBottom: 24 }}>My Orders</h2>

      {orders.length === 0 ? (
        <div className="empty-state">
          <h3>No orders yet</h3>
          <p>Once you place an order, it will show up here.</p>
          <Link to="/products" className="btn btn-primary">Start shopping</Link>
        </div>
      ) : (
        orders.map((order) => (
          <div className="order-card" key={order._id}>
            <div className="order-card-head">
              <div>
                <strong>Order #{order._id.slice(-8).toUpperCase()}</strong>
                <div style={{ fontSize: "0.85rem", color: "var(--muted)" }}>
                  {new Date(order.createdAt).toLocaleDateString()} · {order.orderItems.length} item(s)
                </div>
              </div>
              <span className={`status-badge ${statusClass(order.status)}`}>{order.status}</span>
            </div>
            <div className="review-item" style={{ border: "none" }}>
              <span>Total</span>
              <span style={{ fontWeight: 700 }}>₹{order.totalPrice.toLocaleString("en-IN")}</span>
            </div>
            <div className="table-actions" style={{ marginTop: 10 }}>
              <Link to={`/order/${order._id}`} className="btn btn-outline btn-sm">View Details</Link>
            </div>
            <OrderActions order={order} onUpdated={replaceOrder} compact />
          </div>
        ))
      )}
    </div>
  );
};

export default MyOrders;
