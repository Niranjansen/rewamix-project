import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import Loader from "../components/Loader";
import { statusClass } from "../utils/status";

const STATUSES = [
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
  "Return Requested",
  "Returned",
  "Return Rejected",
];

const FILTERS = ["All", "Processing", "Shipped", "Delivered", "Return Requested", "Returned", "Cancelled"];

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/orders");
      setOrders(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const returnRequestCount = useMemo(
    () => orders.filter((o) => o.status === "Return Requested").length,
    [orders]
  );

  const visibleOrders = useMemo(
    () => (filter === "All" ? orders : orders.filter((o) => o.status === filter)),
    [orders, filter]
  );

  const applyStatus = async (id, status, note) => {
    try {
      const { data } = await api.put(`/orders/${id}/status`, { status, note });
      setOrders((prev) => prev.map((o) => (o._id === id ? data : o)));
    } catch (err) {
      alert(err.response?.data?.message || "Could not update status");
    }
  };

  const handleStatusChange = (id, status) => {
    if (status === "Cancelled" && !window.confirm("Cancel this order? Stock will be added back and this cannot be undone.")) return;
    let note;
    if (status === "Returned" || status === "Return Rejected") {
      note = window.prompt("Note for the customer (optional):") || undefined;
    }
    applyStatus(id, status, note);
  };

  const approveReturn = (id) => {
    const note = window.prompt("Note for the customer (optional) — e.g. refund details:") || undefined;
    if (!window.confirm("Approve this return? Please make sure the item has been received before approving.")) return;
    applyStatus(id, "Returned", note);
  };

  const rejectReturn = (id) => {
    const note = window.prompt("Reason for rejecting this return (shown to customer):");
    if (note === null) return; // cancelled prompt
    if (!note.trim()) {
      alert("Please give a reason so the customer understands why it was rejected.");
      return;
    }
    applyStatus(id, "Return Rejected", note.trim());
  };

  if (loading) return <Loader />;

  return (
    <div>
      <h1>Orders</h1>
      <p style={{ color: "var(--muted)" }}>{orders.length} orders placed</p>

      <div className="order-filter-tabs">
        {FILTERS.map((f) => (
          <button
            key={f}
            className={`filter-tab ${filter === f ? "active" : ""}`}
            onClick={() => setFilter(f)}
          >
            {f}
            {f === "Return Requested" && returnRequestCount > 0 && (
              <span className="filter-tab-count">{returnRequestCount}</span>
            )}
          </button>
        ))}
      </div>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Total</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {visibleOrders.map((o) => (
              <tr key={o._id}>
                <td>#{o._id.slice(-8).toUpperCase()}</td>
                <td>{o.user?.name || "N/A"}</td>
                <td>{new Date(o.createdAt).toLocaleDateString()}</td>
                <td>₹{o.totalPrice.toLocaleString("en-IN")}</td>
                <td>
                  <span className={`status-badge ${statusClass(o.status)}`}>{o.status}</span>

                  {o.status === "Return Requested" && (
                    <div className="return-box">
                      {o.returnReason && <div className="order-reason">Reason: {o.returnReason}</div>}
                      <div className="table-actions" style={{ marginTop: 8 }}>
                        <button className="btn btn-primary btn-sm" onClick={() => approveReturn(o._id)}>
                          ✓ Approve return
                        </button>
                        <button className="btn btn-danger btn-sm" onClick={() => rejectReturn(o._id)}>
                          ✕ Reject
                        </button>
                      </div>
                    </div>
                  )}

                  {o.status === "Cancelled" && o.cancelReason && (
                    <div className="order-reason">
                      Cancelled by {o.cancelledBy || "customer"}: {o.cancelReason}
                    </div>
                  )}
                  {o.status === "Returned" && o.returnAdminNote && (
                    <div className="order-reason">Note: {o.returnAdminNote}</div>
                  )}
                  {o.status === "Return Rejected" && o.returnAdminNote && (
                    <div className="order-reason">Reason: {o.returnAdminNote}</div>
                  )}

                  {o.status !== "Return Requested" && (
                    <select
                      className="status-select"
                      value={o.status}
                      onChange={(e) => handleStatusChange(o._id, e.target.value)}
                      style={{ marginTop: 8 }}
                    >
                      {STATUSES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  )}
                </td>
                <td>
                  <div className="table-actions">
                    <Link to={`/invoice/${o._id}`} className="btn btn-accent btn-sm">
                      🖨️ View / Invoice
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
            {visibleOrders.length === 0 && (
              <tr>
                <td colSpan={6} style={{ textAlign: "center", color: "var(--muted)", padding: "24px" }}>
                  No orders with this status.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrders;
