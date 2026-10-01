import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminLogin = () => {
  const { admin, login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (admin) return <Navigate to="/" replace />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper" style={{ minHeight: "100vh" }}>
      <div className="form-card">
        <div className="brand" style={{ justifyContent: "center", marginBottom: 8 }}>
          <span className="brand-mark">R</span>
          Rewamix
        </div>
        <h2 style={{ textAlign: "center" }}>Admin Panel</h2>
        <p className="form-hint" style={{ textAlign: "center" }}>
          Sign in to manage products and orders.
        </p>

        {error && <div className="form-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="field">
            <label>Email address</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="field">
            <label>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="form-switch" style={{ marginTop: 8, fontSize: "0.8rem" }}>
          Demo: admin@rewamix.com / admin123
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
