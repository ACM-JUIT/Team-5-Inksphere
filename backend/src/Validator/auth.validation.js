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
    body('username')
    .trim()
    .notEmpty()
    .withMessage('Usename is required'),
    

    body('password')
    .notEmpty()
    .withMessage('Password is required')
]


module.exports = {registervalidation,loginvalidation}