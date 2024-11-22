const nodemailer = require('nodemailer');
require('dotenv').config(); // .env dosyasını okuyabilmek için

const sendMail = async (options) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    });

    const mailOptions = {
        from: process.env.SMTP_USER,
        to: options.to,
        subject: options.subject,
        html: options.html
    };

    await transporter.sendMail(mailOptions);
};

module.exports = sendMail;
