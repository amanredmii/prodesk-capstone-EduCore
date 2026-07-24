const asyncHandler = require("../utils/asyncHandler");
const { generateSuggestion } = require("../services/aiServices");

exports.getSuggestion = asyncHandler(async (req, res) => {

    const { prompt } = req.body;

    const answer = await generateSuggestion(prompt);

    res.status(200).json({
        success: true,
        data: answer
    });

});