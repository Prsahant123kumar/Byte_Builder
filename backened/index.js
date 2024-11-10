const express = require('express')
const mongoDB=require('./db')
const cors = require('cors');
mongoDB();
const app = express()
const port = 8000

app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/Contest',require('./Controller/Contest'))

app.use('/Contest',require('./Controller/LeaderBoard'))

app.use('/Contest',require('./Controller/FetchQuestion'))

app.use('/api',require('./Controller/Control'))

app.use('/host',require('./Controller/QuestionController'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})