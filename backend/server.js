import express from "express";
import pgPromise from "pg-promise";
import dotenv from "dotenv"

dotenv.config()

const app = express();
app.use(express.json());

// Initialize pg-promise
const pgp = pgPromise();

// Database connection configuration
const db = pgp({
  host: process.env.AWS_DB_HOST,
  port: process.env.AWS_DB_PORT,
  database: process.env.AWS_DB_NAME,
  user: process.env.AWS_DB_USERNAME,
  password: process.env.AWS_DB_PASSWORD,
  ssl: {
    require: true,
    rejectUnauthorized: false, // allows self-signed AWS cert
  },
});

// Test endpoint
app.get("/test-db", async (req, res) => {
  try {
    const result = await db.one("SELECT * FROM accounts");
    res.json({
      success: true,
      message: "Database connection successful!",
      data: result,
    });
  } catch (error) {
    console.error("Database connection error:", error);
    res.status(500).json({
      success: false,
      message: "Database connection failed",
      error: error.message,
    });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
