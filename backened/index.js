const express = require('express')
const mongoDB=require('./db')
mongoDB();
const app = express()
const port = 8000

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.use('/api',require('./Controller/Control'))

app.use('/host',require('./Controller/QuestionController'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})