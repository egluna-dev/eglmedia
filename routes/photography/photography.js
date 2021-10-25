const express = require('express');
const router = express.Router({ mergeParams: true });
const nodemailer = require("nodemailer");
const emailAuth = process.env.EMAIL_AUTH

//  @route      GET /photography
//  @desc       Photography home page
//  @access     Public
router.get('/', (req, res) => {
    res.render('photography/photographymain', { title: null });
});

//  @route      GET /photography/travel-landscape
//  @desc       Photography home page
//  @access     Public
router.get('/travel-landscape', (req, res) => {
    res.render('photography/landscape', { title: 'Photography | Landscape'});
});

//  @route      GET /photography/streetphotography
//  @desc       Street photography gallery
//  @access     Public
router.get('/streetphotography', (req, res) => {
    res.render('photography/street', { title: 'Photography | Street'});
});

//  @route      GET /photography/portraits
//  @desc       Portrait photography gallery
//  @access     Public
router.get('/people', (req, res) => {
    res.render('photography/people', { title: 'Photography | People'});
});

//  @route      GET /photography/events
//  @desc       Event photography gallery
//  @access     Public
// router.get('/events', (req, res) => {
//     res.render('photography/events');
// });

//  @route      GET /photography/about
//  @desc       Photography about page
//  @access     Public
router.get('/about', (req, res) => {
    res.render('photography/about', { title: 'Photography | About'});
});

//  @route      GET /photography/contact
//  @desc       Contact form for photography
//  @access     Public
router.get('/contact', (req, res) => {
    res.render('photography/contact', { title: 'Photography | Contact'});
});

//  @route      POST /photography/send
//  @desc       Contact form for photography
//  @access     Public
router.post('/send', (req, res) => {
    const output = `
    <p>You have a new contact request.</p>
    <h3> Contact Details </h3>
    <ul>
        <li>First Name: ${req.body.contact.firstname}</li>
        <li>Last Name: ${req.body.contact.lastname}</li>
        <li>Subject: ${req.body.contact.subject}</li>
    </ul>
    <h3>Message</h3>
    <p 
    style=
    'color: red; 
    background-color: pink;'>
        ${req.body.contact.message}
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
        res.redirect('/photography/contact')
      
        console.log("Message sent: %s", info.messageId);
    }
    main().catch(console.error);
});



module.exports = router;