const express = require("express");
const router = express.Router();
const { loginAdmin, getProfile } = require("../controllers/adminAuthController");
const { protect, admin } = require("../middleware/authMiddleware");

router.post("/login", loginAdmin);
router.get("/profile", protect, admin, getProfile);

module.exports = router;
