const nodemailer = require("nodemailer");
require('dotenv').config();

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }

  const { name, email, message } = JSON.parse(event.body);

  if (!name || !email || !message) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "All fields are required." }),
    };
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MY_GMAIL,
        pass: process.env.GMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: email,
      to: process.env.MY_GMAIL,
      subject: `PORTFOLIO Contact form from ${name}`,
      text: message,
    };

    await transporter.sendMail(mailOptions);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Email sent successfully!" }),
    };
  } catch (error) {
    console.error("Error sending email:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to send email. Please try again later." }),
    };
  }
}; 