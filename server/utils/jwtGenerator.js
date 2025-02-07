const jwt = require("jsonwebtoken");
require("dotenv").config();

function jwtGenerator(user_id) {
    const payload = {
        user: {
            id: user_id
        }
    };
    
    // Make sure process.env.jwtSecret is available
    if (!process.env.jwtSecret) {
        throw new Error('JWT Secret is not defined in environment variables');
    }

    return jwt.sign(
        payload, 
        process.env.jwtSecret,
        { expiresIn: "2h" }
    );
}

module.exports = jwtGenerator;