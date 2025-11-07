import { connection } from "../config/db.js";
import bcrypt from "bcrypt";

export const SigninController = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  const signinQuery = `
    SELECT *
    FROM employee_account
    WHERE username = ?
  `;

  connection.query(signinQuery, [username], async (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Database error", error: err.message });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const storedHash = results[0].password;

    try {
      const isMatch = await bcrypt.compare(password, storedHash);

      if (!isMatch) {
        return res.status(401).json({ message: "Invalid username or password" });
      }

      // ✅ Successful login
      res.status(200).json({
        message: "Login successful",
        employee_id: results[0].employee_id,
        position: results[0].position
      });
    } catch (compareError) {
      console.error("Error comparing passwords:", compareError);
      res.status(500).json({ message: "Internal server error" });
    }
  });
};
