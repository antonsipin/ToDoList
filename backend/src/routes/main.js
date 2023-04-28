const express = require('express');
const router = express.Router();
const mainController = require('../controllers/main-controller');

router
  .route('/')
  .get(mainController.index);

module.exports = router;
