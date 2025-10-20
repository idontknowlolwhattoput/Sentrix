import express from "express";
import pgPromise from "pg-promise";

const app = express();
app.use(express.json());

// Initialize pg-promise
const pgp = pgPromise();

// Database connection configuration
const db = pgp({
 
  port: 5432,
  database: "sentrixdb",
  user: "postgres",
  password: "postgres12345",
  ssl: {
    require: true,
    rejectUnauthorized: false, // allows self-signed AWS cert
  },
});

// Test endpoint
app.get("/test-db", async (req, res) => {
  try {
    const result = await db.one("SELECT NOW() AS current_time");
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
