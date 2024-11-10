const express = require('express');
const router = express.Router();
const Question = require('../models/Question')
router.get('/Contest', async (req, res) => {
    let date = Date.now();
try {
    let question = await Question.find({ TimeStart: { $gt: date } });
    if (!question) {
        return res.status(400).json({ error: "No questions found with a future date." });
    }
    res.json(question);
    // Proceed with further logic if a question is found
} catch (error) {
    return res.status(500).json({ error: "An error occurred." });
}
});

module.exports = router