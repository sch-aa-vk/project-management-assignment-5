const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./src/config/database");
const ordersRoute = require("./src/routes/orderRoutes");
const searchRoute = require("./src/routes/searchRoutes");
const authRoute = require("./src/routes/authRoutes");
const loggingMiddleware = require("./src/middleware/loggingMiddleware");
const errorMiddleware = require("./src/middleware/errorMiddleware");
const authMiddleware = require("./src/middleware/authMiddleware");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(loggingMiddleware);

connectDB();

app.use("/api/auth", authRoute);
app.use("/api/orders", authMiddleware, ordersRoute);
app.use("/api/search", authMiddleware, searchRoute);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
