import { connection } from "../config/db.js";
import bcrypt from "bcrypt";
import { EmailTransporter } from "../config/emailTransporter.js";

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
    profile_picture,
  } = req.body;

  const username = `${last_name}-${first_name}-${middle_name}`.toLowerCase();
  const password = Math.floor(Math.random() * 10000000).toString();
  const saltRounds = 10;

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
        position,
      ],
      async (err, rows) => {
        if (err) {
          console.error("Query error:", err.message);
          return res.status(500).json({
            message: "Database error",
            error: err.message,
          });
        }

        try {
          // ✉️ Send email with login details
          await EmailTransporter(
            email,
            "Your Sentrix Account Details",
            `
              <p>Hello ${first_name},</p>
              <p>Your account has been successfully created.</p>
              <p><strong>Username:</strong> ${username}</p>
              <p><strong>Password:</strong> ${password}</p>
              <br/>
              <p>Welcome to Sentrix - Your Health Service Management Provider!</p>
            `
          );
        } catch (emailErr) {
          console.error("Email sending failed:", emailErr);
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
