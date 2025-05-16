require('dotenv').config()
const nodemailer = require('nodemailer')


const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        password: process.env.EMAIL_PASSWORD
    },
    tls: {
      rejectUnauthorized: false
  }
});

transporter.verify(function(error, success) {
  if (error) {
    console.error("Gmail transporter connection failed:", error);
  } else {
    console.log("Gmail transporter connected and ready to send emails");
  }
});




module.exports = transporter;