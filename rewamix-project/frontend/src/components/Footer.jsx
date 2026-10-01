import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="brand" style={{ fontSize: "1.2rem", marginBottom: 12 }}>
              <span className="brand-mark">R</span>
              Rewamix
            </div>
            <p style={{ maxWidth: 260 }}>
              Pure ghee mithai and crunchy namkeen, made fresh every day using
              traditional family recipes — no preservatives, ever.
            </p>
          </div>
          <div>
            <h4>Shop</h4>
            <ul>
              <li><Link to="/products">All Products</Link></li>
              <li><Link to="/products?category=Mithai">Mithai</Link></li>
              <li><Link to="/products?category=Namkeen">Namkeen</Link></li>
              <li><Link to="/products?category=Gift Box">Gift Boxes</Link></li>
            </ul>
          </div>
          <div>
            <h4>Company</h4>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
              <li><Link to="/my-orders">My Orders</Link></li>
            </ul>
          </div>
          <div>
            <h4>Account</h4>
            <ul>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/signup">Sign Up</Link></li>
              <li><Link to="/cart">Cart</Link></li>
            </ul>
          </div>
          <div>
            <h4>Legal</h4>
            <ul>
              <li><Link to="/privacy-policy">Privacy Policy</Link></li>
              <li><Link to="/terms-and-conditions">Terms &amp; Conditions</Link></li>
              <li><Link to="/refund-policy">Refund &amp; Returns</Link></li>
              <li><Link to="/shipping-policy">Shipping &amp; Delivery</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Rewamix Sweets &amp; Namkeen. All rights reserved.</span>
          <span>Built with the MERN stack</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
