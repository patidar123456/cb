const Joi = require('joi');
const mongoose = require('mongoose');
const { formatErrorMessage, toObjectId, sendEmail } = require('../../../helper/common');

const sendContactMail = async (req, res) => {
  try {
    const { email, subject, message } = req.body;
    const result = await sendEmail(email, subject, '', message);
    if (result.success) {
      return res.status(200).json({ status: true, response_code: 200, message: `Success`, data: result.data });
    } else {
      return res.status(400).json({ status: false, response_code: 400, message: result.data, data: result.data });
    }
  } catch (err) {
    console.error(err);
    return res.status(400).json({ status: false, response_code: 400, message: err, data: [] });
  }
};


module.exports = {
  sendContactMail,
};
