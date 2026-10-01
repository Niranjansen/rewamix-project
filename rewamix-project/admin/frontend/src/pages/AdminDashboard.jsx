import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import Loader from "../components/Loader";
import { statusClass } from "../utils/status";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [productsRes, ordersRes] = await Promise.all([
          api.get("/products"),
          api.get("/orders"),
        ]);
        const revenue = ordersRes.data.reduce((acc, o) => acc + o.totalPrice, 0);
        setStats({
          productCount: productsRes.data.length,
          orderCount: ordersRes.data.length,
          revenue,
          pendingReturns: ordersRes.data.filter((o) => o.status === "Return Requested").length,
          recentOrders: ordersRes.data.slice(0, 5),
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <Loader />;

  return (
    <div>
      <h1>Dashboard</h1>
      <p style={{ color: "var(--muted)" }}>Overview of your store's performance.</p>

      <div className="stat-grid">
        <div className="stat-card">
          <div className="label">Total Products</div>
          <div className="value">{stats.productCount}</div>
        </div>
        <div className="stat-card">
          <div className="label">Total Orders</div>
          <div className="value">{stats.orderCount}</div>
        </div>
        <div className="stat-card">
          <div className="label">Total Revenue</div>
          <div className="value">₹{stats.revenue.toLocaleString("en-IN")}</div>
        </div>
        <Link to="/orders" className={`stat-card ${stats.pendingReturns > 0 ? "stat-card-alert" : ""}`} style={{ textDecoration: "none" }}>
          <div className="label">Pending Returns</div>
          <div className="value">{stats.pendingReturns}</div>
          {stats.pendingReturns > 0 && <div className="stat-card-hint">Needs review →</div>}
        </Link>
      </div>

      <h3 style={{ marginBottom: 16 }}>Recent Orders</h3>
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {stats.recentOrders.map((o) => (
              <tr key={o._id}>
                <td>#{o._id.slice(-8).toUpperCase()}</td>
                <td>{o.user?.name || "N/A"}</td>
                <td>₹{o.totalPrice.toLocaleString("en-IN")}</td>
                <td><span className={`status-badge ${statusClass(o.status)}`}>{o.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
