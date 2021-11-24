const express = require('express');
const router = express.Router();
const nodemailer = require("nodemailer");
const emailAuth = process.env.EMAIL_AUTH;
const getYear = require('../../utilities/getYear');


//  @route  GET /webdevelopment
//  @desc    Main page for web development and design
//  @access Public
router.get('/', (req, res) => {
    const currentYear = getYear();
    res.render('webdevelopment/webdevmain', { title: "Web Development", year: currentYear });
});

//  @route  GET /webdevelopment/:equilibriumremedial
//  @desc   Showcase page for equilibrium remedial
//  @access Public
router.get('/equilibrium-remedial', (req, res) => {
    const currentYear = getYear();
    res.render('webdevelopment/equilibriumremedial', { title: "Equilibrium Remedial", year: currentYear });
});

//  @route  POST /webdevelopment/contact
//  @desc   Contact form 
//  @access Public
router.post('/send', (req, res) => {
    const output = `
    <p>You have a new contact request.</p>
    <h3> Contact Details </h3>
    <ul>
        <li>First Name: ${req.body.firstname}</li>
        <li>Last Name: ${req.body.lastname}</li>
        <li>Subject: ${req.body.subject}</li>
    </ul>
    <h3>Message</h3>
    <p>
        ${req.body.message}
    </p>
    `

    async function main() {
        // create reusable transporter object using the default SMTP transport
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: 'whitney14@ethereal.email', // generated ethereal user
                pass: emailAuth, // generated ethereal password
            },
            tls: {
                rejectUnauthorized: false
            }
        });
      
        // send mail with defined transport object
        let info = await transporter.sendMail({
          from: '"Contact sender" <whitney14@ethereal.email>', // sender address
          to: "egluna@live.ca", // list of receivers
          subject: "Hello ✔", // Subject line
          text: "Hello world?", // plain text body
          html: output, // html body
        });

        req.flash('success', 'Email sent successfully!');
        res.redirect('/webdevelopment#webdev-contact')
      
        console.log("Message sent: %s", info.messageId);
    }
    main().catch(console.error);
})

module.exports = router;