const User = require("../models/userModel")
const UserError = require("../utils/userError")

const signUp = async (req, res, next) => {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email })

    if (userExists) {
        res.status(400).json({ error: { message: "User already registered!" } })
    } else {
        try {
            const newUser = await User.create({ name, email, password })
            const jwtToken = await newUser.generateJWT()
            res.status(201).json({
                message: "User created successfully!",
                userId: newUser._id.toString(),
                token: jwtToken,
                apiKey: newUser.apiKey
            })
        }
        catch (err) {
            next(err)
        }
    }
}

const logIn = async (req, res, next) => {
    const { email, password } = req.body;
    const userExists = await User.findOne({ email })

    if (!userExists) {
        next(new UserError("Invalid credentials!", 400))
    } else {
        try {
            const isMatch = await userExists.comparePassword(password)
            if (isMatch) {
                const jwtToken = await userExists.generateJWT()
                res.status(200).json({
                    user: {
                        name: userExists.name,
                        id: userExists.id.toString(),
                        apiKey: userExists.apiKey
                    },
                    token: jwtToken
                })
            } else {
                next(new UserError("Invalid email or password!", 400))
            }
        } catch (err) {
            next(err)
        }
    }
}

module.exports = { signUp, logIn }