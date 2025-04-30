const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// Hash the password using bcrypt
async function hashPassword(password) {
    try {
        const hashedPassword = await bcrypt.hash(password,10);
        console.log(hashedPassword);
        return hashedPassword;
    } catch (err) {
        return {
            statusCode: 400,
            message: `Password Hash failed with message = ${err.message}` 
        }
    }
}

// Unhash the password and return the unhashed password
async function checkPassword(password,hashedPassword) {
    const response = await bcrypt.compare(password,hashedPassword);
    return response;
}

// generate JWT token
async function generateJwtToken(req,res,next) {
    try {
        jwtToken = await jwt.sign(
            {data: req.userData},
            process.env.JWT_AUTH,
            {expiresIn: process.env.JWT_EXPIRY}
        );
        res.send({
            statusCode: 200,
            message: `JWT Token Generated`,
            token: jwtToken
        });
        next();
    } catch(err) {
        res.status(400).send(err.message);
    }
}


module.exports = {
    hashPassword,
    generateJwtToken,
    checkPassword
}