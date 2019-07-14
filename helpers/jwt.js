const expressJwt = require('express-jwt');

const userService = require('../users/services');

module.exports = jwt;

function jwt() {
    const secret = process.env.SECRET;
    return expressJwt({ secret, isRevoked }).unless({
        path: [
            // public routes that don't require authentication
            '/api/login',
            '/api/signup'
        ]
    });
}

async function isRevoked(req, payload, done) {
    const user = await userService.getById(payload.sub);

    // revoke token if user no longer exists
    if (!user) {
        return done(null, true);
    }

    done();
};