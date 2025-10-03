import { connect } from "mongoose"
import ENV_VARS from "./ENV_VARS.js"

const connectDB = async () => {
  try {
    const conn = await connect(ENV_VARS.MONGO_URI);
    console.log("DB connected", conn.connection.host);
  } catch (error) {
    console.log("DB failed", error.message);
    process.exit(1);
  }
}

export default connectDB;