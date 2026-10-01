const Product = require("../models/Product");

// @desc Fetch all products (supports ?keyword= and ?category=)
// @route GET /api/admin/products
const getProducts = async (req, res) => {
  try {
    const keyword = req.query.keyword
      ? { name: { $regex: req.query.keyword, $options: "i" } }
      : {};

    const category =
      req.query.category && req.query.category !== "All"
        ? { category: req.query.category }
        : {};

    const products = await Product.find({ ...keyword, ...category }).sort({
      createdAt: -1,
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Fetch single product
// @route GET /api/admin/products/:id
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Create a product
// @route POST /api/admin/products
// @access Admin
const createProduct = async (req, res) => {
  try {
    const { name, image, category, description, price, countInStock } = req.body;

    const product = new Product({
      name: name || "New Product",
      image: image || "https://via.placeholder.com/500x500?text=Product",
      category: category || "General",
      description: description || "Product description here",
      price: price || 0,
      countInStock: countInStock || 0,
    });

    const created = await product.save();
    res.status(201).json(created);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Update a product
// @route PUT /api/admin/products/:id
// @access Admin
const updateProduct = async (req, res) => {
  try {
    const { name, image, category, description, price, countInStock } = req.body;
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.name = name ?? product.name;
    product.image = image ?? product.image;
    product.category = category ?? product.category;
    product.description = description ?? product.description;
    product.price = price ?? product.price;
    product.countInStock = countInStock ?? product.countInStock;

    const updated = await product.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Delete a product
// @route DELETE /api/admin/products/:id
// @access Admin
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    await product.deleteOne();
    res.json({ message: "Product removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
