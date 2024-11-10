const mongoose =require('mongoose');
const {Schema} =mongoose;
const QuestionSchema=new Schema({
    ID:{
        type:String,
        required:true
    },
    Level:{
        type:Number,
        required:true
    },
    Question: [
        {
            question: {
                type: String,
                required: true
            },
            answer: {
                type: String,
                required: true
            }
        }
    ],
    TimeStart:{
        type: Date,
        required: true
    },
    Duration: {
        type: Number,
        required: true
      }
});

QuestionSchema.pre('save', function (next) {
    if (this.Question.length !== this.Level) {
        // Throw a validation error if they don't match
        return next(new Error(`The number of questions (Question array) must match the Level value of ${this.Level}.`));
    }
    next();
});

module.exports=mongoose.model('question',QuestionSchema);