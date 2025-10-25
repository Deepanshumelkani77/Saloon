require('dotenv').config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",  // you can also use SMTP
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

async function sendConfirmationEmail(to, appointmentDetails) {
  const mailOptions = {
    from: `"Me & Guys Salon" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Your Appointment is Confirmed ✅",
    html: `
      <h2>Appointment Confirmed</h2>
      <p>Hi ${appointmentDetails.username},</p>
      <p>Your appointment has been confirmed.</p>
      <p><strong>Date:</strong> ${new Date(appointmentDetails.date).toLocaleDateString()}</p>
      <p><strong>Service:</strong> ${appointmentDetails.service}</p>
      <p>We look forward to seeing you! 💇‍♂️</p>
    `
  };

  await transporter.sendMail(mailOptions);
}


module.exports = { sendConfirmationEmail };
