const mongoose = require("mongoose")

const contactSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
})

const contactModel = mongoose.model("contact", contactSchema);

module.exports = contactModel
