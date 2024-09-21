const User = require("../models/userModel")
const FootBaller = require("../models/footballerModel")
const UserError = require("../utils/userError")

const sendData = async (req, res, next) => {
    const { apiKey, sortBy, sortByDesc, limitBy, filterBy, value } = req.query;
    // If API key is present
    if (apiKey) {
        try {
            const user = await User.findOne({ apiKey: apiKey });
            // If API key is valid
            if (user) {
                try {
                    let data = null;
                    if (filterBy && value) {
                        data = await FootBaller
                            .find({ [filterBy]: { $regex: value, $options: 'i' } })
                            .sort({ [sortBy]: 1 })
                            .sort({ [sortByDesc]: -1 })
                            .limit(parseInt(limitBy))
                    } else {
                        data = await FootBaller
                            .find()
                            .sort({ [sortBy]: 1 })
                            .sort({ [sortByDesc]: -1 })
                            .limit(parseInt(limitBy))
                    }

                    res.status(200).json({ count: data.length, data })
                } catch (err) {
                    console.log(err)
                    next(new UserError("Something went wrong. Please check the API documentation !", 500))
                }
            } else {
                next(new UserError("Invalid API key", 400))
            }
        } catch (err) {
            next(err)
        }
    } else {
        next(new UserError("Please provide your API key", 400))
    }
}

module.exports = { sendData }