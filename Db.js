import { createClient } from "redis";

// Read from environment variable, fallback to localhost for dev
const redisUrl = process.env.REDIS_URL || "redis://localhost:6379";

const redisClient = createClient({ url: redisUrl });
redisClient.on("error", (err) => console.error("Redis error:", err));

await redisClient.connect();

// Example: seed credentials (only for demo, not production)
await redisClient.hSet("credentials", {
  username: "admin",
  password: "distributedsystems",
});

console.log("Seeded credentials: admin / distributedsystems");

await redisClient.quit();