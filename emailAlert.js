// emailAlert.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'YOUR_EMAIL@gmail.com',        // <-- replace this
    pass: 'YOUR_APP_PASSWORD'            // <-- use App Password from Google
  }
});

function sendAbuseEmail(token, ipList, count) {
  const mailOptions = {
    from: 'YOUR_EMAIL@gmail.com',        // <-- your sender email
    to: 'YOUR_EMAIL@gmail.com',          // <-- your recipient email
    subject: `⚠️ Token Abuse Detected: ${token}`,
    text: `Token ${token} was accessed by ${ipList.length} unique IPs (${count} total hits).`
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) console.error('Email error:', err);
    else console.log('Abuse email sent:', info.response);
  });
}

module.exports = sendAbuseEmail;
