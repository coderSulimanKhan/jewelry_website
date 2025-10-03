import "dotenv/config"

const ENV_VARS = {
  PORT: process.env.PORT,
};

export default Object.freeze(ENV_VARS);