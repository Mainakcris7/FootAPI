const express = require("express")
const { validateSchema, contactSchema } = require("../middlewares/validateSchema")
const handleContact = require("../controllers/contactController")

const router = express.Router({ mergeParams: true })

router.route("/").post(validateSchema(contactSchema), handleContact)

module.exports = router