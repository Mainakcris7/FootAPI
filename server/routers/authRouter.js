const express = require('express')
const authenticate = require("../controllers/authentication")
const { signUpSchema, logInSchema, validateSchema } = require("../middlewares/validateSchema")

const router = express.Router({ mergeParams: true })

router.route("/signup").post(validateSchema(signUpSchema), authenticate.signUp)
router.route("/login").post(validateSchema(logInSchema), authenticate.logIn)

module.exports = router