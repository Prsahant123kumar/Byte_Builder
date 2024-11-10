const express = require('express');
const router = express.Router();
const Question = require('../models/Question')

router.get('/Start',

    async (req, res) => {

        try {
            const ID=req.body.ID
            let CreateID = await Question.findOne({ ID });
            if (!CreateID) {
                return res.status(400).json({ error: "Error Occured" });
            }
            res.json(CreateID)
        } catch (error) {
            res.status(400).json({ message: error.message });
        }

    })




module.exports = router