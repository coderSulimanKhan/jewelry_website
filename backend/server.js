import jwt, { decode } from "jsonwebtoken"
import express from "express"
import cors from "cors"
//* Environment Variables
import ENV_VARS from "./config/ENV_VARS.js"
//* Database Function
import connectDB from "./config/db.js"
//* Routes
import userRoutes from "./routes/user.route.js"
import User from "./models/user.model.js"

//* Making Database Connection
connectDB();

const app = express();

//* Middlewares
app.use(express.json({ limit: "3mb" }));
app.use(cors());

//* Routes
app.use("/api/v1/users", userRoutes);


app.get("/", (req, res) => {
  res.send("I am jewelry server");
});

const PORT = ENV_VARS.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server started on :", PORT);
});