import { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import api from "../api/axios";

const AdminLayout = () => {
  const [pendingReturns, setPendingReturns] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const fetchPending = async () => {
      try {
        const { data } = await api.get("/orders");
        if (!cancelled) {
          setPendingReturns(data.filter((o) => o.status === "Return Requested").length);
        }
      } catch (err) {
        // silent — badge just won't show if this fails
      }
    };
    fetchPending();
    const interval = setInterval(fetchPending, 30000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : "")}>
          Dashboard
        </NavLink>
        <NavLink to="/products" className={({ isActive }) => (isActive ? "active" : "")}>
          Products
        </NavLink>
        <NavLink to="/orders" className={({ isActive }) => (isActive ? "active" : "")}>
          Orders
          {pendingReturns > 0 && <span className="sidebar-badge">{pendingReturns}</span>}
        </NavLink>
      </aside>
      <div className="admin-content">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
