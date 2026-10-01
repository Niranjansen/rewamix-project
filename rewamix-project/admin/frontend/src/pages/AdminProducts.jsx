import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import Loader from "../components/Loader";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/products");
      setProducts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product? This cannot be undone.")) return;
    try {
      await api.delete(`/products/${id}`);
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || "Could not delete product");
    }
  };

  if (loading) return <Loader />;

  return (
    <div>
      <div className="admin-toolbar">
        <div>
          <h1>Products</h1>
          <p style={{ color: "var(--muted)", margin: 0 }}>{products.length} products in catalog</p>
        </div>
        <Link to="/products/new" className="btn btn-primary">+ Add Product</Link>
      </div>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id}>
                <td><img src={p.image} alt={p.name} className="table-thumb" /></td>
                <td>{p.name}</td>
                <td>{p.category}</td>
                <td>₹{p.price.toLocaleString("en-IN")}</td>
                <td>{p.countInStock}</td>
                <td>
                  <div className="table-actions">
                    <Link to={`/products/${p._id}/edit`} className="btn btn-outline btn-sm">Edit</Link>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(p._id)}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProducts;
