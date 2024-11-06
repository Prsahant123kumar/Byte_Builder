const mongoose=require('mongoose')

const mongoDB=async()=>{
    mongoose.connect('mongodb://localhost:27017/Tresure')
    console.log("MongoDb connected");
    mongoose.connection.once('open', async () => {
        try {
            console.log("hello")
            await mongoose.connection.db.collection("Question");
        } catch (err) {
            console.error("Error fetching data:", err);
        }
    });
}
module.exports=mongoDB;