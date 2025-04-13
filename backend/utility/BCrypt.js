const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;


function hashPassword(password){
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, SALT_ROUNDS, (err, hash)=> {
            if(err)reject(err);
            else resolve(hash)
        })
    })
}

function comparePassword(password, hash){
    return new Promise((resolve, reject) =>{
        bcrypt.compare(password, hash, (err, result) => {
            if(err)reject(err);
            else resolve(result);
        })
    })
}

module.exports = { hashPassword, comparePassword };
