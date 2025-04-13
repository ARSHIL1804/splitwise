const { createConnectionPool } = require("../config/database.config");
const { APIConstants } = require("../utility/APIConstants");
const { hashPassword, comparePassword } = require("../utility/BCrypt");
const DatabaseIO = require("../utility/DatabaseIO");
const SPConstants = require("../utility/SPConstants");
const axios = require('axios')

async function register(req, res) {
    const data = req.body;
    const spname = SPConstants.CREATE_USER;
    const passwordHash = await hashPassword(data.password);
    console.log(passwordHash);
    const parameters = [data.username, data.email, passwordHash, data.phone, data.profileImage, data.currency];
    await DatabaseIO.Query(spname, parameters);
    res.send(200)
}



async function login(req, res) {
    const data = req.body;
    const spname = SPConstants.GET_USER_HASHED_PASSWORD;
    const parameters = [data.usernameOrEmail];
    const { password: hashPassword } = await DatabaseIO.Query(spname, parameters);
    console.log(hashPassword);

    const isValid = await comparePassword(data.password, hashPassword);
    console.log(isValid)
    // const passwordHash = await comparePassword(data.password);
    // console.log(passwordHash);
    res.send(200);
}

module.exports = {
    register,
    login
}