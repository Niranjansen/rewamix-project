import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { itemsCount } = useCart();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <NavLink to="/" className="brand" onClick={() => setOpen(false)}>
          <span className="brand-mark">R</span>
          Rewamix
        </NavLink>

        <nav className="nav-links">
          <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : "")}>
            Home
          </NavLink>
          <NavLink to="/products" className={({ isActive }) => (isActive ? "active" : "")}>
            Products
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => (isActive ? "active" : "")}>
            About Us
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => (isActive ? "active" : "")}>
            Contact Us
          </NavLink>
        </nav>

        <div className="nav-actions">
          <NavLink to="/cart" className="icon-link" aria-label="Cart">
            🛒
            {itemsCount > 0 && <span className="cart-badge">{itemsCount}</span>}
          </NavLink>

          {user ? (
            <div className="user-chip">
              <span className="avatar">{user.name?.[0]?.toUpperCase()}</span>
              <NavLink to="/my-orders">My Orders</NavLink>
              <button className="btn btn-outline btn-sm" onClick={handleLogout}>
                Logout
              </button>
            </div>
          ) : (
            <NavLink to="/login" className="btn btn-primary btn-sm">
              Login
            </NavLink>
          )}

          <button
            className="mobile-toggle"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            ☰
          </button>
        </div>
      </div>

      {open && (
        <div className="container" style={{ paddingBottom: 16 }}>
          <nav style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <NavLink to="/" end onClick={() => setOpen(false)}>Home</NavLink>
            <NavLink to="/products" onClick={() => setOpen(false)}>Products</NavLink>
            <NavLink to="/about" onClick={() => setOpen(false)}>About Us</NavLink>
            <NavLink to="/contact" onClick={() => setOpen(false)}>Contact Us</NavLink>
            {user && (
              <NavLink to="/my-orders" onClick={() => setOpen(false)}>My Orders</NavLink>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
