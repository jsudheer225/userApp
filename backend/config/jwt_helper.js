const JWT = require('jsonwebtoken');

module.exports = {
    signAccessToken: (userId) => {
        return new Promise((resolve, reject) => {
            const payload = {};
            const secert = process.env.ACCESS_TOKEN_SECERT;
            const options = {
                expiresIn: "1hr",
                issuer: "myapp.com",
                audience: userId
            };
            JWT.sign(payload, secert, options, (err, token) => {
                if(err) {
                    console.log(err.message);
                    reject(message);
                }
                resolve(token);
            });
        });
    },

    verifyAccessToken: (req, res, next) => {
        if(!req.headers['authorization']) {
            res.status(400).json({ status: 400, message: "Unauthorized" });
            const authHeader = req.headers['authorization'];
            const bearerToken = authHeader.split(' ');
            const token = bearerToken[1];
            JWT.verify(token, process.env.ACCESS_TOKEN_SECERT, (err, payload) => {
                if(err) {
                    const message = err.message === 'JsonWebTokenError' ? 'Unauthorized' : err.message;
                    console.log(message);
                    return next(message);
                }
                req.payload = payload;
                next();
            })
        }
    }
}