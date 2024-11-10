const express = require('express');
const router = express.Router();
const Participants = require('../models/Participants');

// Endpoint to add/update a Participants's score and completion time
let c;
router.post('/submit', async (req, res) => {
  const { name, score, completionTime ,ID} = req.body;

  try {
    // Check if Participants exists and update their data, or create a new record
    let participants = await Participants.findOne({ name });
    if (participants) { 
      participants.score = score;
      participants.completionTime = completionTime; // Update completion time
      participants.ID=ID;
      c=ID;
      await participants.save();
    } else {
      participants = new Participants({ name, score, completionTime,ID});
      await participants.save();
    }

    res.status(200).json({ success:true });
  } catch (err) {
    res.status(500).json({ success:false });
  }
});
router.get('/final-leaderboard', async (req, res) => {
    try {
      // Find the most recent `ID` based on the latest participant entry
      const latestParticipant = await Participants.findOne().sort({ _id: -1 }).select('ID');
  
      if (!latestParticipant) {
        return res.status(400).json({ message: 'No participants found' });
      }
  
      const activeID = c;
  
      // Retrieve leaderboard filtered by the latest `ID`
      const leaderboard = await Participants.find({ ID: activeID }).sort({ score: -1, completionTime: 1 });
      res.status(200).json(leaderboard);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching leaderboard', error: err });
    }
  });
  
  module.exports = router;