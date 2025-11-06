import { connection } from "../config/db.js";

export const db = (req, res) => {
  connection.query("SELECT * FROM employee_account INNER JOIN ON", (err, rows) => {
    if (err) {
      console.error("Query error:", err);
      res.status(500).send("Database error");
      return;
    }
    res.json(rows);
  });
};
