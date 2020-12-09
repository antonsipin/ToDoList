const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users-controller')

router
  .route('/signUp')
  .get(usersController.renderSignUp)
  .post(usersController.signUp)

router
  .route('/signIn')
  .get(usersController.renderSignIn)
  .post(usersController.signIn)

router.get('/logOut', usersController.logOut)

module.exports = router
