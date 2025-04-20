const { createConnectionPool } = require("../config/database.config");
const LogFactory = require("../logging/logger");
const { APIConstants } = require("../utility/APIConstants");
const { hashPassword, comparePassword } = require("../utility/BCrypt");
const DatabaseIO = require("../utility/DatabaseIO");
const { ErrorCodes, ErrorMessage } = require("../utility/Error");
const SPConstants = require("../utility/SPConstants");
const jwt = require('jsonwebtoken');

async function register(req, res) {
    const data = req.body;
    const spname = SPConstants.CREATE_USER;
    const passwordHash = await hashPassword(data.password);
    const parameters = [data.username, data.email, passwordHash, data.phone, data.profileImage, data.currency];
    const resp = await DatabaseIO.Query(spname, parameters);
    res.json({ message: "REGISTRATION_SUCCESSFULL" });
}



async function login(req, res) {
    const data = req.body;
    const spname = SPConstants.GET_USER_DETAILS_FOR_SIGNIN;
    const parameters = [data.usernameOrEmail];
    const [{ password: hashPassword }, loginResponse] = await DatabaseIO.Query(spname, parameters);
    const isValid = await comparePassword(data.password, hashPassword);
    if (!isValid) return res.status(ErrorCodes.SERVER_ERROR).json({ message: ErrorMessage.INVALID_PASSWORD });
    const token = jwt.sign(loginResponse, process.env.JWT_SECRET);
    res.cookie('Splitwise.Auth', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: process.env.JWT_EXPIRATION
    });
    res.json({ message: "LOGIN_SUCCESSFULL" });
}

module.exports = {
    register,
    login
}