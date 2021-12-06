const express = require('express');
const router = express.Router({ mergeParams: true });
const nodemailer = require("nodemailer");
const catchAsync = require("../../utilities/catchAsync");
const emailAuth = process.env.EMAIL_AUTH;

const getYear = () => {
    const date = new Date;
    const currentYear = date.getFullYear();
    return currentYear;
}

//  @route      GET /photography
//  @desc       Photography home page
//  @access     Public
router.get('/', (req, res) => {
    const currentYear = getYear();
    res.render('photography/photographymain', { title: 'Photography | Home', year: currentYear, success: null });
});

//  @route      GET /photography/travel-landscape
//  @desc       Photography home page
//  @access     Public
router.get('/travel-landscape', (req, res) => {
    const currentYear = getYear();
    res.render('photography/landscape', { title: 'Photography | Landscape', year: currentYear, success: null });
});

//  @route      GET /photography/streetphotography
//  @desc       Street photography gallery
//  @access     Public
router.get('/streetphotography', (req, res) => {
    const currentYear = getYear();
    res.render('photography/street', { title: 'Photography | Street', year: currentYear, success: null });
});

//  @route      GET /photography/australia
//  @desc       Portrait photography gallery
//  @access     Public
router.get('/australia', (req, res) => {
    const currentYear = getYear();
    res.render('photography/australia', { title: 'Photography | Australia', year: currentYear, success: null });
});

//  @route      GET /photography/canada
//  @desc       Portrait photography gallery
//  @access     Public
router.get('/canada', (req, res) => {
    const currentYear = getYear();
    res.render('photography/canada', { title: 'Photography | Canada', year: currentYear, success: null });
});

//  @route      GET /photography/myanmar
//  @desc       Portrait photography gallery
//  @access     Public
router.get('/myanmar', (req, res) => {
    const currentYear = getYear();
    res.render('photography/myanmar', { title: 'Photography | Myanmar', year: currentYear, success: null });
});

//  @route      GET /photography/gippsland
//  @desc       Portrait photography gallery
//  @access     Public
router.get('/gippsland', (req, res) => {
    const currentYear = getYear();
    res.render('photography/gippsland', { title: 'Photography | South Gippsland', year: currentYear, success: null });
});

//  @route      GET /photography/vietnam
//  @desc       Portrait photography gallery
//  @access     Public
router.get('/vietnam', (req, res) => {
    const currentYear = getYear();
    res.render('photography/vietnam', { title: 'Photography | Vietnam', year: currentYear, success: null });
});

//  @route      GET /photography/manila
//  @desc       Portrait photography gallery
//  @access     Public
router.get('/manila', (req, res) => {
    const currentYear = getYear();
    res.render('photography/manila', { title: 'Photography | Manila', year: currentYear, success: null });
});

//  @route      GET /photography/about
//  @desc       Photography about page
//  @access     Public
router.get('/about', (req, res) => {
    const currentYear = getYear();
    res.render('photography/about', { title: 'Photography | About', year: currentYear, success: null });
});

//  @route      GET /photography/contact
//  @desc       Contact form for photography
//  @access     Public
router.get('/contact', (req, res) => {
    const currentYear = getYear();
    res.render('photography/contact', { title: 'Photography | Contact', year: currentYear, success: null});
});

//  @route      POST /photography/send
//  @desc       Contact form for photography
//  @access     Public
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
        res.redirect('/photography/contact')
      
        console.log("Message sent: %s", info.messageId);
    }
    main().catch(console.error);
});



module.exports = router;