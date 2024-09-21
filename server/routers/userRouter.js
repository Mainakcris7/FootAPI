const express = require("express")
const { tokenVerifier, newApiKeyGenerator } = require("../controllers/jwtTokenVerifier")

const router = express.Router({ mergeParams: true })

router.route("/details").get(tokenVerifier)
router.route("/updateApiKey").get(newApiKeyGenerator)

module.exports = router