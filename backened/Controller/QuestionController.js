const express = require('express');
const router = express.Router();
const Question = require('../models/Question')

router.post('/CreateContest',

    async (req, res) => {

        try {
            await Question.create({
                ID:req.body.ID,
                Level:req.body.Level,
                Question:req.body.Question
            })
            res.json({ success: true })
        } catch (error) {
            res.status(400).json({ message: error.message });
        }

    })




module.exports = router