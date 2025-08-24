const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, html) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER, // "apikey"
        pass: process.env.EMAIL_PASS, // your SendGrid API key
      },
    });

    const info = await transporter.sendMail({
      from: `"RN Catering" <${process.env.EMAIL_FROM}>`, // must be verified
      to,
      subject,
      html,
    });

    console.log(`Email sent to ${to}: ${info.messageId}`);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = sendEmail;
