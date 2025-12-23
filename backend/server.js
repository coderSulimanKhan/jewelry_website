import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import path from "path"
import { fileURLToPath } from "url"

//* Environment Variables
import ENV_VARS from "./config/ENV_VARS.js"
//* Database Function
import connectDB from "./config/db.js"
//* Routes
import userRoutes from "./routes/user.route.js"
import productRoutes from "./routes/product.route.js"
import saleRoutes from "./routes/sale.route.js"
import cutRoutes from "./routes/cut.route.js"
import orderRoutes from "./routes/order.routes.js"

//* Making Database Connection
connectDB();

const app = express();

//* Middlewares
app.use(express.json({ limit: "3mb" }));
app.use(cors());
app.use(cookieParser());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/api/v1/uploads", express.static(path.join(__dirname, "uploads")));
// app.use(express.urlencoded());

//* Routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/sales", saleRoutes);
app.use("/api/v1/cuts", cutRoutes);
app.use("/api/v1/orders", orderRoutes);

app.get("/", (req, res) => {
  res.send("I am jewelry server");
});

const PORT = ENV_VARS.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server started on :", PORT);
});