const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: process.env.EMAIL_ADDRESS, 
    pass: process.env.EMAIL_PASSWORD,
  },
});

const readHbsTemplate = (templateName) => {
  const templatePath = path.join(__dirname, `../email-templates/${templateName}.hbs`);
  const templateString = fs.readFileSync(templatePath, "utf-8")
  return handlebars.compile(templateString);
}

const testTemplate = () => {
  const template = readHbsTemplate("template");
  console.log(template({name: "Barbara"}));
  console.log(template({name: "Laia"}));
}

const sendWelcomeEmail = async (email, name) => {
  console.log("ENTRO A MANDAR EL MAIL")
  const welcomeTemplate = readHbsTemplate("welcome");
  return sendEmail(email, `Welcome to Lumatic ${name}!`, welcomeTemplate({ name }));
}

const sendEmail = async (email, subject, template) => {
  const mailOptions = {
    from: process.env.EMAIL_ADDRESS,
    to: email,
    subject: subject,
    html: template,
  };

  return transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email: ", error);
    } else {
      console.log("Email sent: ", info.response);
    }
  });

}

module.exports = {
  sendWelcomeEmail,
  testTemplate
}