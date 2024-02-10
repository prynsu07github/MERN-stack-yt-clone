import nodemailer from "nodemailer";

function sendMail(email) {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "prynsu879@gmail.com",
      pass: "vkuy qzbh jdeg aplc",
    },
  });

  var mailOptions = {
    from: "prynsu879@gmail.com",
    to: email,
    subject: "Sending Email using Node.js",
    text: "That was easy!",
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

export default sendMail