import { connection } from "../config/db.js";

export const deleteEmployeeController = async (req, res) => {
  const { employee_id } = req.body;

  if (!employee_id) {
    return res.status(400).json({ message: "Employee ID is required" });
  }

  const query = `CALL DeleteEmployee(?)`;

  connection.query(query, [employee_id], (err, result) => {
    if (err) {
      console.error("Error deleting employee:", err);
      return res.status(500).json({ message: "Database error", error: err });
    }

    res.status(200).json({
      message: "Employee deleted successfully",
      employee_id,
      result,
    });
  });
};
