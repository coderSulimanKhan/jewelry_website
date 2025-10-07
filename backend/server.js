import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
//* Environment Variables
import ENV_VARS from "./config/ENV_VARS.js"
//* Database Function
import connectDB from "./config/db.js"
//* Routes
import userRoutes from "./routes/user.route.js"
import productRoutes from "./routes/product.route.js"

//* Making Database Connection
connectDB();

const app = express();

//* Middlewares
app.use(express.json({ limit: "3mb" }));
app.use(cors());
app.use(cookieParser());
// app.use(express.urlencoded());

//* Routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/products", productRoutes);

app.get("/", (req, res) => {
  res.send("I am jewelry server");
});

const PORT = ENV_VARS.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server started on :", PORT);
});