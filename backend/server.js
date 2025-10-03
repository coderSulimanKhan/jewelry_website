import express from "express"
//* Environment Variables
import ENV_VARS from "./config/ENV_VARS.js"

const app = express();

app.get("/", (req, res) => {
  res.send("Jewelry Server is running");
});

const PORT = ENV_VARS.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server started on :", PORT);
});