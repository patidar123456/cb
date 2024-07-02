const express = require('express');
const emailController = require('../controller/emailController');

const router = express.Router();

router.post('/send-contact-email', emailController.sendContactMail);

module.exports = router;
