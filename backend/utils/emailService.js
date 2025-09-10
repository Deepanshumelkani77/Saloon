const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",  // you can also use SMTP
  auth: {
    user: "deepumelkani123@gmail.com",  // your email
    pass: "deepu*#77"   // app password
  }
});

async function sendConfirmationEmail(to, appointmentDetails) {
  const mailOptions = {
    from: `"Me & Guys Salon" <deepumelkani123@gmail.com>`,
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
