const express = require('express');
const categoryController = require('../controller/categoriesController');
// const authenticateJWT = require('../../../helper/authenticateJWT');
const multerUpload = require('../../../helper/multer');

const router = express.Router();

router.post('/get-all', categoryController.getAllCategories);
router.post('/get', categoryController.getCategory);
router.post('/add', categoryController.addCategory);

module.exports = router;
