const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, html) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"RN Catering" <${process.env.EMAIL_FROM}>`,
    to,
    subject,
    html,
  });

  console.log(`Email sent to ${to}`);
};

module.exports = sendEmail;
