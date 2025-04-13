const {check,body} = require('express-validator');

const registerValidation = [
    check('username')
        .notEmpty().withMessage('Name is required')
        .isLength({ min: 3 }).withMessage('Name must be at least 3 characters'),
    check('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Must be a valid email address'),
    check('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/).withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'),
    body('profileImage')
        .default('')
        .isString().withMessage('Profile image must be a string'),
    body('phoneNo')
        .default('')
        .isString().withMessage('Profile image must be a string')

];


module.exports = registerValidation