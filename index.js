const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");
const http = require("http");
const socketIo = require("socket.io");

const cookieParser = require("cookie-parser");

// Import routes
const authRoutes = require("./src/routes/authRoutes");
const productRoutes = require("./src/routes/repairRoutes");
const categoryRoutes = require("./src/routes/categoryRoutes");
const BrandRoutes = require("./src/routes/BrandRoutes");
const settingRoutes = require("./src/routes/settingRouter");
const HelpRoutes = require("./src/routes/helpRoutes");
const itemsRoutes = require("./src/routes/in_stockRoutes");
// admin// admin// admin// admin// admin// admin// admin// admin// admin// admin
const adminRoutes = require("./src/routes/adminRoutes");
// admin// admin// admin// admin// admin// admin// admin// admin// admin// admin
const profileRoutes = require("./src/routes/profileRoutes");
const inventoryRoutes = require("./src/routes/inventoryRoutes");
const indexRoutes = require("./src/routes/indexRoutes");

// Initialize Express app
const app = express();
const port = 3000;

// Create HTTP server and integrate Socket.IO
const server = http.createServer(app);
const io = socketIo(server);

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static("uploads"));
app.use(cookieParser());
// Session and Flash Messages
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(flash());

// Set up view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "view"));

// Routes
app.use("/", authRoutes);
app.use("/", productRoutes);
app.use("/", categoryRoutes);
app.use("/", BrandRoutes);
app.use("/", settingRoutes);
app.use("/", HelpRoutes);
app.use("/", itemsRoutes);
// admin// admin// admin// admin// admin
app.use("/", adminRoutes);
// admin// admin// admin// admin// admin
app.use("/", profileRoutes);
app.use("/", inventoryRoutes);
app.use("/", indexRoutes);

// Route handlers
app.get("/", (req, res) => {
  res.send("Home Page");
});

// 404 Middleware
app.use((req, res) => {
  return res.status(404).render("404");
});

// Start the server
server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
