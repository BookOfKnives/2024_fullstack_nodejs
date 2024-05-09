//NB: this setup uses a Haraka SMTP server.
// https://haraka.github.io/getting_started

// import { createRequire } from "module";
// const require = createRequire(import.meta.url);
// const nodemailer = require("nodemailer");

import nodemailer from "nodemailer";

const startUpMessage = "Mailer online."

const transportOptions = {
    port: 587, 
    secure: false,
    requireTLS: true, 
    auth: {
      user: "hans", 
      pass: "verysecret",
    },
    tls: {
      rejectUnauthorized: false,
    },
    logger: false,   
};

const transporter = nodemailer.createTransport(transportOptions); 

async function mailer(address) {
  const info = await transporter.sendMail({
    from: "1618 Admin <hvmw@127.0.0.1>",
    to: address,
    subject: "Congratulations on your sign-up to 1618 Design Services!",
    text: "You sure are one lucky fella! Your password is 123, write it down somewhere safe!",
  });
};

export default mailer;

console.log(startUpMessage);