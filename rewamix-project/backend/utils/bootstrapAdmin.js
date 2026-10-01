const User = require("../models/User");

// Creates (or promotes) the admin account from environment variables so you
// never need a shell or the destructive seeder on production.
//   ADMIN_EMAIL, ADMIN_PASSWORD  (ADMIN_NAME optional)
// - Account doesn't exist  -> created with isAdmin = true
// - Account exists         -> only promoted to admin; password is NOT changed
const bootstrapAdmin = async () => {
  const email = (process.env.ADMIN_EMAIL || "").trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !password) return;

  try {
    const existing = await User.findOne({ email });
    if (!existing) {
      await User.create({
        name: process.env.ADMIN_NAME || "Admin",
        email,
        password,
        isAdmin: true,
      });
      console.log(`Admin account created: ${email}`);
    } else if (!existing.isAdmin) {
      existing.isAdmin = true;
      await existing.save();
      console.log(`Existing account promoted to admin: ${email}`);
    }
  } catch (error) {
    console.error(`Admin bootstrap failed: ${error.message}`);
  }
};

module.exports = bootstrapAdmin;
