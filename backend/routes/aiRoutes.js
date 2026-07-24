const express = require("express");

const router = express.Router();

const protect = require("../middleware/auth_middleware");

const { getSuggestion } = require("../controllers/aiController");
const aiSchema = require("../validation/ai_validation");
const validate = require("../middleware/validate");

router.post(
    "/suggest",
    protect,
    validate(aiSchema),
    getSuggestion
);

module.exports = router;