import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/axios";
import { statusClass } from "../utils/status";
import Loader from "../components/Loader";

const AdminInvoice = () => {
  const { id } = useParams();
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
        <Link to="/orders" className="btn btn-outline btn-sm">Back to orders</Link>
      </div>
    );
  }

  const invoiceNo = `MTH-${order._id.slice(-8).toUpperCase()}`;
  const orderDate = new Date(order.createdAt).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="container order-page">
      <div className="invoice-actions no-print">
        <Link to="/orders" className="btn btn-outline btn-sm">← Back to orders</Link>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <span className={`status-badge ${statusClass(order.status)}`}>{order.status}</span>
          <button className="btn btn-primary" onClick={() => window.print()}>
            🖨️ Print / Download Invoice
          </button>
        </div>
      </div>

      {/* ---------------- Printable invoice ---------------- */}
      <div className="invoice-wrap" id="invoice">
        <div className="invoice-head">
          <div className="brand invoice-brand">
            <span className="brand-mark">R</span>
            Rewamix
          </div>
          <div className="invoice-meta">
            <h2>Invoice</h2>
            <div><strong>Invoice #</strong> {invoiceNo}</div>
            <div><strong>Date</strong> {orderDate}</div>
          </div>
        </div>

        <div className="invoice-parties">
          <div>
            <h4>Billed To</h4>
            <p>
              {order.shippingAddress.fullName}<br />
              {order.shippingAddress.address}<br />
              {order.shippingAddress.city}, {order.shippingAddress.postalCode}<br />
              {order.shippingAddress.country}<br />
              Phone: {order.shippingAddress.phone}
            </p>
          </div>
          <div>
            <h4>Payment Details</h4>
            <p>
              Method: {order.paymentMethod}<br />
              Order status: {order.status}<br />
              Paid: {order.isPaid ? "Yes" : "Pending / Cash on Delivery"}
            </p>
          </div>
        </div>

        <table className="invoice-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Qty</th>
              <th>Price</th>
              <th style={{ textAlign: "right" }}>Amount</th>
            </tr>
          </thead>
          <tbody>
            {order.orderItems.map((item, idx) => (
              <tr key={idx}>
                <td>{item.name}</td>
                <td>{item.qty}</td>
                <td>₹{item.price.toLocaleString("en-IN")}</td>
                <td style={{ textAlign: "right" }}>
                  ₹{(item.price * item.qty).toLocaleString("en-IN")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="invoice-totals">
          <div className="summary-row">
            <span>Subtotal</span>
            <span>₹{order.itemsPrice.toLocaleString("en-IN")}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>{order.shippingPrice === 0 ? "Free" : `₹${order.shippingPrice}`}</span>
          </div>
          <div className="summary-row total">
            <span>Total</span>
            <span>₹{order.totalPrice.toLocaleString("en-IN")}</span>
          </div>
        </div>

        <p className="invoice-footer-note">
          Thank you for shopping with Rewamix! For any questions about this
          invoice, contact support@rewamix.com.
        </p>
      </div>
      {/* -------------- End printable invoice -------------- */}
    </div>
  );
};

export default AdminInvoice;
