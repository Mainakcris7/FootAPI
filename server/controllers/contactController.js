const Contact = require("../models/contactModel")

const handleContact = async (req, res, next) => {
    const data = req.body;
    try {
        await Contact.create(data);
        res.status(200).json({ message: "Message sent successfully!" })
    } catch (err) {
        next(err)
    }
}

module.exports = handleContact