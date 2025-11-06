import { connection } from "../config/db.js";

export const viewEmployeeController = (req, res) => {
  const query = `
    SELECT 
      ea.employee_id, 
      ea.position, 
      ei.first_name, 
      ei.middle_name, 
      ei.last_name, 
      ei.phone, 
      ei.email
    FROM employee_account ea
    INNER JOIN employee_info ei 
    ON ea.employee_id = ei.employee_id
  `;

  connection.query(query, (err, results) => {
    if (err) {
      console.error("Database Error:", err);
      return res.status(500).json({ error: "Database query failed" });
    }

    res.status(200).json(results);
  });
};
