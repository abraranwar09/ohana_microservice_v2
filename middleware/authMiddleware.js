// apiKeyAuthMiddleware.js
require('dotenv').config();

const API_KEY = process.env.API_KEY;

exports.authenticateApiKey = (req, res, next) => {
    const apiKey = req.headers['x-api-key'];

    if (!apiKey || apiKey !== API_KEY) {
        console.log(API_KEY);
        return res.status(401).json({ message: "Unauthorized: Invalid API key" });
    }

    next();
};