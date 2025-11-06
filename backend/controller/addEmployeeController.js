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
    position,
    profile_picture
  } = req.body;

  // Auto-generate username and password
  const username = `${last_name}-${first_name}-${middle_name}`.toLowerCase();
  const password = Math.floor(Math.random() * 10000000).toString();
  const saltRounds = 10;

  // Convert Base64 image to Buffer (handle null or missing image)
  let imageBuffer = null;
  if (profile_picture) {
    try {
      const base64Data = profile_picture.replace(/^data:image\/\w+;base64,/, "");
      imageBuffer = Buffer.from(base64Data, "base64");
    } catch (err) {
      console.error("Error processing profile picture:", err);
      return res.status(400).json({ message: "Invalid image format" });
    }
  }

  // Hash password
  bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
    if (err) {
      console.error("Hashing error:", err);
      return res.status(500).send("Error hashing password");
    }

    // Call stored procedure
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
        position,
      ],
      (err, rows) => {
        if (err) {
          console.error("Query error:", err.message);
          return res.status(500).json({
            message: "Database error",
            error: err.message,
          });
        }

     
          res.status(200).json({
          message: "Employee successfully registered",
          username,
          password, 
        });
      }
    );
  });
};
