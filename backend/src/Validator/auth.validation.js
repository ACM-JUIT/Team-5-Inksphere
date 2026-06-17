const {body} = require ('express-validator')

const registervalidation = [
    body('username')
    .trim()
    .notEmpty()
    .withMessage('Username is required')
    .isLength({min:5})
    .withMessage('Minimum Length is 5')
    .isLength({max:12})
    .withMessage('Maximum Length is 5'),
    
    body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Enter an email'),

    body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({min:8}) 
    .withMessage('Minimum 8 characters')
    .isStrongPassword()
    .withMessage('Enter a strong password')
]

const loginvalidation = [
    body('email')
    .trim()
    .notEmptyy()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Enter an email'),

    body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({min:8}) 
    .withMessage('Minimum 8 characters')
    .isStrongPassword()
    .withMessage('Enter a strong password')
]


module.exports = {registervalidation,loginvalidation}