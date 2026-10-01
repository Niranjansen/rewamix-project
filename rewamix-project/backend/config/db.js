const mongoose = require("mongoose");
const dns = require("dns");

// Some ISPs / networks (common on certain Indian broadband + college/office
// networks) block or fail to resolve the DNS SRV records that MongoDB
// Atlas's "mongodb+srv://" connection strings depend on, causing
// "querySrv ECONNREFUSED" or "querySrv EBADNAME" errors. Switching to public
// DNS resolvers here fixes it for every script that calls connectDB()
// (server.js, seeder.js, etc.) without needing to duplicate this fix.
dns.setServers(["1.1.1.1", "8.8.8.8"]);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
