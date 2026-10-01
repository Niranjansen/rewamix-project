const jwt = require("jsonwebtoken");
const User = require("../models/User");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// @desc Admin login — rejects any account that isn't flagged isAdmin.
//       Admin accounts are bootstrapped from ADMIN_EMAIL / ADMIN_PASSWORD env vars (see utils/bootstrapAdmin.js)
//       (they live in the same shared database/collection).
// @route POST /api/admin/auth/login
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email?.toLowerCase() });

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    if (!user.isAdmin) {
      return res.status(403).json({ message: "This account does not have admin access" });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get logged-in admin's profile
// @route GET /api/admin/auth/profile
const getProfile = async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

module.exports = { loginAdmin, getProfile };
