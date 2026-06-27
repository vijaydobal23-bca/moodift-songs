require("dotenv").config();
const Redis = require("ioredis").default || require("ioredis");
const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD
});
redis.on("error", (err) => console.log("Redis error:", err));
redis.on("connect", () => {
  console.log("Connected to Redis!");
  redis.set(undefined, "value", "EX", 3600).then(() => {
    console.log("Set undefined successfully!");
    redis.quit();
  }).catch(err => {
    console.log("Set undefined error:", err.message);
    redis.quit();
  });
});
