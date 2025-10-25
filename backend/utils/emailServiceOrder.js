require('dotenv').config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail", // or configure custom SMTP
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

/**
 * Send confirmation email for an order
 * @param {string} to - customer email
 * @param {Object} orderDetails - order info (orderNumber, username, totalPrice, items[])
 */
async function sendConfirmationEmail(to, orderDetails) {
  const itemsList = orderDetails.items
    .map(
      (item) =>
        `<li>${item.name} (x${item.qty}) - ₹${item.price * item.qty}</li>`
    )
    .join("");

  const mailOptions = {
    from: `"Me & Guys Salon" <${process.env.EMAIL_USER}>`,
    to,
    subject: `Your Order ${orderDetails.orderNumber} is Confirmed ✅`,
    html: `
      <h2>Order Confirmation</h2>
      <p>Hi ${orderDetails.username},</p>
      <p>Thank you for shopping with us! Your order has been confirmed.</p>
      <p><strong>Order Number:</strong> ${orderDetails.orderNumber}</p>
      <p><strong>Total Amount:</strong> ₹${orderDetails.totalPrice}</p>
      <h3>Order Items:</h3>
      <ul>
        ${itemsList}
      </ul>
      <p>We will notify you once your order is shipped. 🚚</p>
      <p>Regards,<br/>Me & Guys Salon Team</p>
    `
  };

  await transporter.sendMail(mailOptions);
}

module.exports = { sendConfirmationEmail };
