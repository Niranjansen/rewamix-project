import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RequireAdmin = ({ children }) => {
  const { admin } = useAuth();
  return admin ? children : <Navigate to="/login" replace />;
};

export default RequireAdmin;
