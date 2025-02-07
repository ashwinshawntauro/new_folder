const jwt = require("jsonwebtoken");
require("dotenv").config();

const authorization = async (req, res, next) => {
    try {
        // Get token from header
        const token = req.header("Authorization")?.replace("Bearer ", "");
        
        if (!token) {
            return res.status(401).json({ message: "No token, authorization denied" });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'Zosh@2021');

        console.log('Decoded JWT:', decoded); 
        
        // Add user info to request
        req.user = decoded;
        
        next();
    } catch (err) {
        return res.status(401).json({ message: "Token is not valid" });
    }
};

module.exports = {
    authorization
};