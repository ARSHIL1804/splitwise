const {check,body} = require('express-validator');

const loginValidation = [
    check('usernameOrEmail')
        .notEmpty().withMessage('Username or Email is Required'),
    check('password')
        .notEmpty().withMessage('Password is Required')
];


module.exports = loginValidation