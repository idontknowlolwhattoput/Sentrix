import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const EmailTransporter = async (email, subject, username, password) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "vergarajoshuamiguel@gmail.com",
        pass: "ygou vurm zkjm znwd", // make sure this is set in your .env
      },
    });

    const info = await transporter.sendMail({
      from: '"Sentrix - Your Health Service Management Provider" <vergarajoshuamiguel@gmail.com>',
      to: email,
      subject,
      html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Your Account Details</title>
        <style>
          body {
            font-family: 'Segoe UI', Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 30px;
            color: #222;
          }
          .container {
            max-width: 480px;
            margin: 0 auto;
            background: #ffffff;
            border-radius: 8px;
            box-shadow: 0 4px 10px rgba(0,0,0,0.08);
            overflow: hidden;
          }
          .header {
            background-color: #111;
            color: white;
            text-align: center;
            padding: 20px 10px;
            font-size: 1.2rem;
            font-weight: 600;
            letter-spacing: 0.5px;
          }
          .content {
            padding: 25px;
            line-height: 1.6;
            text-align: center;
          }
          .credentials-box {
            background: #f2f2f2;
            border: 1px solid #ddd;
            border-radius: 6px;
            padding: 15px;
            margin: 15px 0;
          }
          .label {
            font-weight: 600;
            color: #555;
          }
          .value {
            font-size: 1.1rem;
            color: #000;
          }
          .footer {
            background: #fafafa;
            text-align: center;
            padding: 15px;
            font-size: 0.8rem;
            color: #888;
            border-top: 1px solid #eee;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            Sentrix Account Credentials
          </div>
          <div class="content">
            <p>Hello,</p>
            <p>Your temporary login credentials for <strong>Sentrix</strong> have been created:</p>

            <div class="credentials-box">
              <div><span class="label">Username:</span> <span class="value">${username}</span></div>
              <div><span class="label">Password:</span> <span class="value">${password}</span></div>
            </div>

            <p>Please change your password upon first login to keep your account secure.</p>
            <p>If you did not request this, please ignore this email.</p>
          </div>
          <div class="footer">
            © 2024 Sentrix. All rights reserved.
          </div>
        </div>
      </body>
      </html>
      `,
    });

    console.log("✅ Email sent:", info.messageId);
  } catch (error) {
    console.error("❌ Error sending email:", error);
    throw error;
  }
};
