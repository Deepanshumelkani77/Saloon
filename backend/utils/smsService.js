const twilio = require("twilio");

const client = new twilio("ACcb813038a3f536ef303cf4a445a0e777", "64768d3e749da2971cb500b218f9ec87");

async function sendConfirmationSMS(to, appointmentDetails) {
  await client.messages.create({
    body: `Hello ${appointmentDetails.username}, your appointment on ${appointmentDetails.date} for ${appointmentDetails.service} is confirmed. ✅`,
    from: process.env.TWILIO_PHONE, // your Twilio number
    to :to// user’s mobile number
  });
}

module.exports = { sendConfirmationSMS };


//process.env.TWILIO_PHONE=for this we need to purchase atwilio Number.