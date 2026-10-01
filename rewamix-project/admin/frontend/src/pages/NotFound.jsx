import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="empty-state">
    <h3>404 — Page not found</h3>
    <Link to="/" className="btn btn-primary">Go to Dashboard</Link>
  </div>
);

export default NotFound;
