import { Routes, Route } from "react-router-dom";
import RequireAdmin from "./components/RequireAdmin";
import Topbar from "./components/Topbar";

import AdminLogin from "./pages/AdminLogin";
import AdminLayout from "./pages/AdminLayout";
import AdminDashboard from "./pages/AdminDashboard";
import AdminProducts from "./pages/AdminProducts";
import AdminProductForm from "./pages/AdminProductForm";
import AdminOrders from "./pages/AdminOrders";
import AdminInvoice from "./pages/AdminInvoice";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<AdminLogin />} />

      <Route
        path="/"
        element={
          <RequireAdmin>
            <>
              <Topbar />
              <AdminLayout />
            </>
          </RequireAdmin>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="products/new" element={<AdminProductForm />} />
        <Route path="products/:id/edit" element={<AdminProductForm />} />
        <Route path="orders" element={<AdminOrders />} />
      </Route>

      <Route
        path="/invoice/:id"
        element={
          <RequireAdmin>
            <>
              <Topbar />
              <AdminInvoice />
            </>
          </RequireAdmin>
        }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
