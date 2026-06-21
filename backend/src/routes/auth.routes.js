
const router = require('express').Router();
const authController = require('../Controllers/authController');
const authvalidator = require('../Validator/auth.validation')
const validator = require('../Validator/validation.error')
router.post('/register',authvalidator.registervalidation,validator,authController.register);
router.post('/login',authvalidator.loginvalidation,validator,authController.login);
router.post('/logout',authController.logout);


module.exports = router;