const nodemailer = require('nodemailer');

module.exports.sendEmail = (email, subject, text) => {


    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'dangcuong201004@gmail.com',
            pass: 'zsyk fmuo ykom jgfy'
        }
    });

    const mailOptions = {
        from: 'dangcuong201004@gmail.com',
        to: email,
        subject: subject,
        text: text
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
            // do something useful
        }
    });
}