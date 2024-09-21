require("dotenv").config()
const mongoose = require('mongoose')

const connectToDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        return "Connected to MongoDB successfully!";
    } catch (err) {
        console.error(err.message)
        return "MongoDB connection failed!";
    }
}

module.exports = connectToDB

