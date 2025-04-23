const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./src/config/database");
const ordersRoute = require("./src/routes/orderRoutes");
const authRoute = require("./src/routes/authRoutes");
const loggingMiddleware = require("./src/middleware/loggingMiddleware");
const errorMiddleware = require("./src/middleware/errorMiddleware");
const authMiddleware = require("./src/middleware/authMiddleware");
const dotenv = require("dotenv");
const cors = require("cors");
const corsOptions = require("./src/config/cors");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(loggingMiddleware);

app.use("/api/auth", authRoute);
app.use("/api/orders", authMiddleware, ordersRoute);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
