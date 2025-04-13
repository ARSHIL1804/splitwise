const express = require('express');
const router = express.Router();

const { register, login } = require('../controllers/auth');
const validate = require('../middleware/validator/validator');
const registerValidation = require('../middleware/validator/register');
const loginValidation = require('../middleware/validator/login');


router.post('/register', validate(registerValidation) ,register);
router.post('/login',  validate(loginValidation),login);

module.exports = router;
