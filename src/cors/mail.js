const nodemailer = require("nodemailer");
const config = require('config');

let sendMail = (to, subject, html, text, attachments) => {
  return new Promise((resolve, reject) => {

    let transporter = nodemailer.createTransport({
      host: config.get(`${mode}.email.host`),
      port: config.get(`${mode}.email.port`),
      secure: false, // true for 465, false for other ports
      auth: {
        user: config.get(`${mode}.email.username`),
        pass: config.get(`${mode}.email.password`)
      }
    });

    let mailOptions = {
      from: `${mode}.email.username`,
      to: to,
      subject: subject,
      html: html,
      text: text,
      attachments: attachments
    }

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        reject("There is error in mail:- " + error);
      } else {
        console.log("Mail has been sent to", to)
        resolve("Mail Sent!!!");
      }
    });
    
  })
};

module.exports = {
  sendMail
}
