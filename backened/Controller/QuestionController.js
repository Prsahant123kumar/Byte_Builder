const express = require('express');
const router = express.Router();
const Question = require('../models/Question')

router.post('/CreateContest',

    async (req, res) => {

        try {
            const ID=req.body.ID
            let CreateID = await Question.findOne({ ID });
            if (CreateID) {
                return res.status(400).json({ error: "This ID already exists" });
            }
            await Question.create({
                ID:req.body.ID,
                Level:req.body.Level,
                Question:req.body.Question,
                TimeStart:req.body.TimeStart,
                Duration:req.body.Duration
            })
            res.json({ success: true })
        } catch (error) {
            res.status(400).json({ message: error.message });
        }

    })




module.exports = router