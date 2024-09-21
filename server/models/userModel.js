require("dotenv").config()
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const apiGenerator = require("generate-api-key")

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    apiKey: {
        type: String,
        unique: true
    },
    apiKeyUpdatedAt: {
        type: Date,
        default: Date.now()
    }
})

// Hash the password before saving
userSchema.pre("save", async function () {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword
    } catch (err) {
        throw err
    }
})

// Generate random api key
userSchema.pre("save", async function () {
    try {
        this.apiKey = apiGenerator.generateApiKey({ length: 32 });

    } catch (err) {
        throw err
    }
})

// Compare password
userSchema.methods.comparePassword = async function (givenPassword) {
    try {
        const isMatch = await bcrypt.compare(givenPassword, this.password)
        return isMatch
    } catch (err) {
        throw err;
    }
}

// Generate JWT
userSchema.methods.generateJWT = async function () {
    try {
        const data = {
            id: this._id.toString(),
            email: this.email,
        }

        const jwtToken = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: "15d" })
        return jwtToken

    } catch (err) {
        console.log(err)
    }
}

const User = mongoose.model("user", userSchema);

module.exports = User