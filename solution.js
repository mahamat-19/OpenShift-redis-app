// server.js
import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { createClient } from "redis";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

// Redis client
const redis = createClient({ url: process.env.REDIS_URL || "redis://localhost:6379" });

redis.on("error", (err) => console.error("Redis error:", err));

// Connect on server start
await redis.connect();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/check", async (req, res) => {
  const username = req.body.username || "";
  const password = req.body.password || "";

  console.log("Checking credentials:", { username, password });

  // Retrieve saved credentials from Redis (hash)
  // Here we use a fixed key; in a real app you’d use dynamic user keys.
  const stored = await redis.hGetAll("credentials:admin");
  console.log("Stored credentials:", stored);

  const isValid =
    stored &&
    stored.username === username &&
    stored.password === password;
    console.log("isValid:", isValid);

  if (isValid) {
    return res.sendFile(__dirname + "/public/secret.html");
  }

  return res.sendFile(__dirname + "/public/index.html");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});