const express = require("express");
const router = express.Router();
const { getProducts, getProductById } = require("../controllers/productController");

// Public, read-only — product management happens from the separate Admin panel.
router.get("/", getProducts);
router.get("/:id", getProductById);

module.exports = router;
