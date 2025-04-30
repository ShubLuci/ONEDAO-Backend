function checkRequestBody(req,res,next) {
    const {email,password,affiliate_name} = req.body;
    const BLOCKED_COUNTRIES = process.env.BLOCKED_COUNTRIES.split(',');
    if(!email) {
        res.status(400).send({
            statusCode: 400,
            message: "'email' parameter required in request body."
        });
    } else if(!password) {
        res.status(400).send({
            statusCode: 400,
            message: "'password' parameter required in request body."
        });
    } else if(!affiliate_name) {
        res.status(400).send({
            statusCode: 400,
            message: "'affiliate_name' parameter required in request body."
        });
    } else if(BLOCKED_COUNTRIES.includes(affiliate_name.toLowerCase())) {
        res.status(400).send({
            statusCode: 400,
            message: `${affiliate_name} is an unauthorized country.`
        });
    } else {
        next();
    }
};

module.exports = {
    checkRequestBody
}