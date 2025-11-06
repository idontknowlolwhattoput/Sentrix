import { connection } from "../config/db.js";
import bcrypt from "bcrypt";

export const addEmployeeController = (req, res) => {
  const {
    first_name,
    middle_name,
    last_name,
    email,
    phone,
    address,
    sex,
    position
  } = req.body;

  const username = `${last_name}-${first_name}-${middle_name}`;
  const password = Math.floor(Math.random() * 10000000).toString();
  const saltRounds = 10;

  // Hash password first before inserting
  bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
    if (err) {
      console.error("Hashing error:", err);
      return res.status(500).send("Error hashing password");
    }

    const query = `CALL RegisterEmployee(?,?,?,?,?,?,?,?,?,?)`;

    connection.query(
      query,
      [
        first_name,
        middle_name,
        last_name,
        email,
        phone,
        address,
        sex,
        username,
        hashedPassword,
        position
      ],
      (err, rows) => {
        if (err) {
          console.error("Query error:", err.message);
          return res.status(500).send("Database error");
        }

        // Respond after successful insert
        res.status(200).json({
          message: "Employee successfully registered",
          username,
          password, // send plaintext password once for user notification
          data: rows
        });
      }
    );
  });
};
