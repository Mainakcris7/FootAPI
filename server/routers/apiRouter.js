const express = require('express')
const router = express.Router({ mergeParams: true })
const { sendData } = require("../controllers/apiControllers")
const User = require("../models/userModel")
const FootBaller = require("../models/footballerModel")

router.route("/v1/data").get(sendData)

// Just for dev
router.route("/v1/data").post(async (req, res, next) => {
    try {
        await FootBaller.insertMany(req.body);
        res.status(201).json({ message: "Saved!" })
    } catch (err) {
        next(err)
    }
})

module.exports = router;