const dotenv = require("dotenv");
const connectDB = require("./config/db");
const User = require("./models/User");
const Product = require("./models/Product");
const Order = require("./models/Order");

dotenv.config();
connectDB();

const products = [
  {
    name: "Kaju Katli (500g)",
    image: "https://images.unsplash.com/photo-1695568181558-034b7d3e49eb?w=600",
    category: "Mithai",
    description: "Rich, melt-in-the-mouth cashew fudge made with pure ghee and fine cashew paste. A festive favorite, boxed fresh.",
    price: 720,
    countInStock: 40,
    rating: 4.8,
  },
  {
    name: "Motichoor Ladoo (500g)",
    image: "https://images.unsplash.com/photo-1695568180070-8b5acead5cf4?w=600",
    category: "Mithai",
    description: "Tiny gram-flour pearls, deep fried and soaked in saffron-cardamom syrup, then hand-rolled into soft ladoos.",
    price: 450,
    countInStock: 50,
    rating: 4.7,
  },
  {
    name: "Gulab Jamun (12 pcs)",
    image: "https://images.unsplash.com/photo-1517244683847-7456b63c5969?w=600",
    category: "Mithai",
    description: "Soft khoya dumplings deep-fried to a golden brown and soaked in warm rose-cardamom sugar syrup.",
    price: 380,
    countInStock: 45,
    rating: 4.9,
  },
  {
    name: "Soan Papdi (400g)",
    image: "https://images.unsplash.com/photo-1695568181747-f54dff1d4654?w=600",
    category: "Mithai",
    description: "Flaky, melt-away besan and ghee sweet with a delicate crisp texture, topped with chopped pistachios.",
    price: 320,
    countInStock: 35,
    rating: 4.4,
  },
  {
    name: "Bengali Rasgulla (12 pcs)",
    image: "https://images.unsplash.com/photo-1695568181440-aca4dac18650?w=600",
    category: "Bengali Sweets",
    description: "Spongy chhena balls simmered in light sugar syrup — an authentic Bengali classic, made fresh daily.",
    price: 350,
    countInStock: 30,
    rating: 4.8,
  },
  {
    name: "Assorted Mithai Gift Box (1kg)",
    image: "https://images.unsplash.com/photo-1695568181363-af5c78f4d059?w=600",
    category: "Gift Box",
    description: "A festive assortment of our bestselling mithai — Kaju Katli, Motichoor Ladoo, Barfi and more — beautifully boxed for gifting.",
    price: 899,
    countInStock: 25,
    rating: 4.9,
  },
  {
    name: "Aloo Bhujia (400g)",
    image: "https://images.unsplash.com/photo-1625242661157-e9e5708ffe5e?w=600",
    category: "Namkeen",
    description: "Crispy, spicy potato-and-gram-flour namkeen, fried fresh in small batches for maximum crunch.",
    price: 180,
    countInStock: 60,
    rating: 4.5,
  },
  {
    name: "Moong Dal Namkeen (400g)",
    image: "https://images.unsplash.com/photo-1624374053855-39a5a1a41402?w=600",
    category: "Namkeen",
    description: "Crunchy split-moong lentils, lightly spiced and roasted — a lighter, protein-rich namkeen classic.",
    price: 210,
    countInStock: 55,
    rating: 4.3,
  },
  {
    name: "Navratan Mixture (400g)",
    image: "https://images.unsplash.com/photo-1631788012442-633d4f91ad31?w=600",
    category: "Namkeen",
    description: "A colourful mix of sev, boondi, peanuts, and crispy flakes — the perfect tea-time namkeen.",
    price: 190,
    countInStock: 50,
    rating: 4.4,
  },
  {
    name: "Premium Dry Fruit Box (500g)",
    image: "https://images.unsplash.com/photo-1699708263762-00ca477760bd?w=600",
    category: "Dry Fruits",
    description: "Handpicked almonds, cashews, pistachios and raisins in a reusable gift box — ideal for festivals and weddings.",
    price: 1299,
    countInStock: 20,
    rating: 4.7,
  },
];

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const adminUser = await User.create({
      name: "Admin",
      email: "admin@rewamix.com",
      password: "admin123",
      isAdmin: true,
    });

    await User.create({
      name: "Test User",
      email: "user@rewamix.com",
      password: "user123",
      isAdmin: false,
    });

    await Product.insertMany(products);

    console.log("Data Imported Successfully!");
    console.log("Admin login -> email: admin@rewamix.com | password: admin123");
    console.log("User login  -> email: user@rewamix.com  | password: user123");
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    console.log("Data Destroyed!");
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
