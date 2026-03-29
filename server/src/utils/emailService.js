// const nodemailer = require('nodemailer');

// const sendEmail = async (options) => {
//   const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS,
//     },
//   });

//   const mailOptions = {
//     from: `"Trainistry Support" <${process.env.EMAIL_USER}>`,
//     to: options.email,
//     subject: options.subject,
//     html: options.html,
//   };

//   await transporter.sendMail(mailOptions);
// };

// module.exports = sendEmail;

const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    // If options.from exists, use it; otherwise, fall back to default Support label
    from: options.from || `"Trainistry Support" <${process.env.EMAIL_USER}>`,
    to: options.email,
    subject: options.subject,
    html: options.html,
    // Add replyTo so trainers can reply directly to the company email
    replyTo: options.replyTo || process.env.EMAIL_USER,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("NODEMAILER_ERROR:", error.message);
    throw new Error("Email could not be sent");
  }
};

module.exports = sendEmail;