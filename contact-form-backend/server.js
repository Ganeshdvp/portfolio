const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv').config();


const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors({
    origin: [
        'http://localhost:5500',
        'http://127.0.0.1:5500',
        'https://your-portfolio.netlify.app' // <-- replace with your real deployed URL if you have one
    ],
    methods: ['POST'],
}));

// Email Sending Endpoint
app.post("/send-email", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    // Configure Nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MY_GMAIL, // Your Gmail
        pass: process.env.GMAIL_PASSWORD, // Your Gmail App Password (replace with your actual app password)
      },
    });

    // Email Options
    const mailOptions = {
      from: email,
      to: process.env.MY_GMAIL, // Your email
      subject: `PORTFOLIO Contact form from ${name}`,
      text: `${message}`,
    };

    // Send Email
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email. Please try again later." });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});