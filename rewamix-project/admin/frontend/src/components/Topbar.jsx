import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Topbar = () => {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <div className="brand">
          <span className="brand-mark">R</span>
          Rewamix <span className="badge-admin" style={{ marginLeft: 8 }}>Admin</span>
        </div>
        <div className="user-chip">
          <span className="avatar">{admin?.name?.[0]?.toUpperCase()}</span>
          <span>{admin?.name}</span>
          <button className="btn btn-outline btn-sm" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
