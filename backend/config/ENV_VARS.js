import "dotenv/config"

const ENV_VARS = {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
};

export default Object.freeze(ENV_VARS);