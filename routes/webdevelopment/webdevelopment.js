const express = require('express');
const router = express.Router();


//  @route  GET api/users
//  @desc    Test route
//  @access Public
router.get('/', (req, res) => {
    res.render('webdevelopment/webdevmain');
})

module.exports = router;