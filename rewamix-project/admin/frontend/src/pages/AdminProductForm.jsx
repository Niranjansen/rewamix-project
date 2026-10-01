import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import Loader from "../components/Loader";

const emptyForm = {
  name: "",
  image: "",
  category: "General",
  description: "",
  price: "",
  countInStock: "",
};

const AdminProductForm = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isEdit) return;
    const fetchProduct = async () => {
      try {
        const { data } = await api.get(`/products/${id}`);
        setForm({
          name: data.name,
          image: data.image,
          category: data.category,
          description: data.description,
          price: data.price,
          countInStock: data.countInStock,
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id, isEdit]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      const payload = {
        ...form,
        price: Number(form.price),
        countInStock: Number(form.countInStock),
      };
      if (isEdit) {
        await api.put(`/products/${id}`, payload);
      } else {
        await api.post("/products", payload);
      }
      navigate("/products");
    } catch (err) {
      setError(err.response?.data?.message || "Could not save product.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div>
      <h1>{isEdit ? "Edit Product" : "Add New Product"}</h1>

      <div className="checkout-form-card" style={{ maxWidth: 640, marginTop: 24 }}>
        {error && <div className="form-error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label>Product name</label>
            <input name="name" value={form.name} onChange={handleChange} required />
          </div>
          <div className="field">
            <label>Image URL</label>
            <input name="image" value={form.image} onChange={handleChange} required placeholder="https://..." />
          </div>
          {form.image && (
            <img src={form.image} alt="preview" style={{ width: 100, height: 100, objectFit: "cover", borderRadius: 6, marginBottom: 16 }} />
          )}
          <div className="field">
            <label>Category</label>
            <select name="category" value={form.category} onChange={handleChange}>
              {["General", "Mithai", "Namkeen", "Bengali Sweets", "Dry Fruits", "Gift Box"].map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div className="field">
            <label>Description</label>
            <textarea name="description" rows="4" value={form.description} onChange={handleChange} required />
          </div>
          <div className="form-grid-2">
            <div className="field">
              <label>Price (₹)</label>
              <input type="number" name="price" min="0" value={form.price} onChange={handleChange} required />
            </div>
            <div className="field">
              <label>Stock quantity</label>
              <input type="number" name="countInStock" min="0" value={form.countInStock} onChange={handleChange} required />
            </div>
          </div>
          <button type="submit" className="btn btn-primary" disabled={saving}>
            {saving ? "Saving..." : isEdit ? "Update Product" : "Create Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminProductForm;
