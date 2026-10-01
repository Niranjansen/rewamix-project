import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await api.get("/products");
        setProducts(data.slice(0, 4));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <section className="hero">
        <div className="container hero-inner">
          <div>
            <div className="hero-eyebrow">Fresh batches, every single morning</div>
            <h1>Mithai and namkeen made the way your dadi used to make it.</h1>
            <p>
              Rewamix brings you pure ghee sweets and crunchy namkeen, handmade
              daily in small batches — no preservatives, no shortcuts, just
              honest taste.
            </p>
            <div className="hero-actions">
              <Link to="/products" className="btn btn-primary">
                Shop mithai &amp; namkeen
              </Link>
              <Link to="/about" className="btn btn-outline">
                Our story
              </Link>
            </div>
          </div>
          <div className="hero-art">
            <img
              src="https://images.unsplash.com/photo-1695568181363-af5c78f4d059?w=900"
              alt="Assorted Indian sweets at Rewamix"
            />
          </div>
        </div>
      </section>

      <section className="section container">
        <div className="section-head">
          <div>
            <h2>Today's fresh favorites</h2>
            <p>A few bestsellers straight from this week's batch.</p>
          </div>
          <Link to="/products" className="btn btn-outline btn-sm">
            View all
          </Link>
        </div>

        {loading ? (
          <Loader />
        ) : (
          <div className="product-grid">
            {products.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
