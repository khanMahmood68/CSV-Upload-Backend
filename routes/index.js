const express = require('express');
const router = express.Router();

const homeController = require('../controllers/home_controller');

router.get('/',homeController.home);

router.post('/upload',homeController.uploadFile);

router.get('/view/:id',homeController.displayCSV);
router.get('/delete/:id',homeController.deleteCSV);
module.exports = router