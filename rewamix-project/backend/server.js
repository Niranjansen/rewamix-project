const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("./config/db");
const bootstrapAdmin = require("./utils/bootstrapAdmin");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const app = express();

// CORS — comma-separated list of allowed frontends, e.g.
//   ALLOWED_ORIGINS=https://rewamix-store.onrender.com,https://rewamix-admin.onrender.com
// If it is empty (local dev) every origin is allowed.
const allowedOrigins = (process.env.ALLOWED_ORIGINS || process.env.CLIENT_URL || "")
  .split(",")
  .map((o) => o.trim().replace(/\/$/, ""))
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
        return cb(null, true);
      }
      return cb(new Error(`CORS blocked for origin: ${origin}`));
    },
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Rewamix API is running...");
});

// Health check (used by Render)
app.get("/api/health", (req, res) => res.json({ status: "ok" }));

// ---- Customer API ----
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));

// ---- Admin API (all routes require a logged-in admin) ----
app.use("/api/admin/auth", require("./routes/adminAuthRoutes"));
app.use("/api/admin/products", require("./routes/adminProductRoutes"));
app.use("/api/admin/orders", require("./routes/adminOrderRoutes"));
app.use("/api/admin/users", require("./routes/adminUserRoutes"));

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const start = async () => {
  await connectDB();
  await bootstrapAdmin();
  app.listen(PORT, () => console.log(`Rewamix API running on port ${PORT}`));
};

start();
