require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL, // Your email
    pass: process.env.PASSWORD, // Your app password (not your email password)
  },
});

app.post("/send-email", (req, res) => {
  const { firstName, lastName, workEmail, message } = req.body;

  const mailOptions = {
    from: "akash9102soni@gmail.com",
    to: "akashsoni9102@gmail.com",
    subject: `New Contact Form Submission from ${firstName} ${lastName}`,
    text: `Name: ${firstName} ${lastName}\nEmail: ${workEmail}\nMessage: ${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send("Email sending failed.");
    } else {
      console.log("Email sent: " + info.response);
      res.status(200).send("Email sent successfully!");
    }
  });
});

app.post("/send-appointment", (req, res) => {
  const { name, age, gender, category, mobile, email, problemDescription } =
    req.body;

  const mailOptions = {
    from: "akash9102soni@gmail.com",
    to: "akashsoni9102@gmail.com",
    subject: `New Appointment Form Submission from ${name} ${mobile}`,
    text: `Name: ${name}\n age: ${age}\n gender: ${gender}\n category: ${category}\n mobile: ${mobile}\n email: ${email}\n problemDescription: ${problemDescription}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send("Email sending failed.");
    } else {
      console.log("Email sent: " + info.response);
      res.status(200).send("Email sent successfully!");
    }
  });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
