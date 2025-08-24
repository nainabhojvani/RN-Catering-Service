require("dotenv").config();
const sendEmail = require("./utils/sendEmails");

(async () => {
  try {
    await sendEmail(
      "rutvajadav1415@gmail.com",
      "SendGrid API Test",
      "<p>If you see this, SendGrid API works instantly!</p>"
    );
  } catch (err) {
    console.error(err);
  }
})();
