require("dotenv").config()
const User = require("../models/userModel")
const jwt = require("jsonwebtoken")
const apiGenerator = require("generate-api-key")
const userError = require("../utils/userError")

const tokenVerifier = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace("Bearer ", "");
        const user = jwt.verify(token, process.env.JWT_SECRET);
        const { name, apiKey } = await User.findById(user.id);
        user.name = name
        user.apiKey = apiKey
        res.status(200).json({ user })
    } catch (err) {
        next(err)
    }
}
const newApiKeyGenerator = async (req, res, next) => {
    try {
        // Verify token
        const token = req.header("Authorization").replace("Bearer ", "");
        const user = jwt.verify(token, process.env.JWT_SECRET);

        // Generate new API key
        if (user) {
            const currentTime = Date.now();
            const currUser = await User.findById(user.id);
            const oneDay = 24 * 60 * 60 * 1000;

            // Check if the user has recently updated the API key
            if (Math.abs(currentTime - currUser.apiKeyUpdatedAt) >= oneDay) {

                newApiKey = apiGenerator.generateApiKey({ length: 32 });
                const updatedUser = await User.findByIdAndUpdate(user.id, { apiKey: newApiKey, apiKeyUpdatedAt: Date.now() });

                user.name = updatedUser.name;
                user.apiKey = newApiKey;

                res.status(200).json({ user })
            } else {
                next(new userError("API Key is updated recently, please try again later!", 400))
            }
        } else {
            next(new userError("JWT Token verification failed!", 400))
        }
    } catch (err) {
        next(err)
    }
}

module.exports = { tokenVerifier, newApiKeyGenerator }