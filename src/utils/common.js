const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

async function checkPassword(password,hashedPassword) {
    const response = await bcrypt.compare(password,hashedPassword);
    return response;
}

async function generateJwtToken(req,res,next) {
    try {
        req.jwtToken = await jwt.sign(
            {data: req.userData},
            process.env.JWT_AUTH,
            {expiresIn: process.env.JWT_EXPIRY}
        );
        res.send(req.jwtToken)
        next();
    } catch(err) {
        res.status(400).send(err.message);
    }
}


module.exports = {
    hashPassword
}