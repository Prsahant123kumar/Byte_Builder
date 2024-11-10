const mongoose = require('mongoose');
const { Schema } = mongoose;
const ParticipantsSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    score: {
        type:Number,
        required: true
    },
    completionTime: {
        type:Number,
        required: true
    },
    ID:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('participants', ParticipantsSchema);