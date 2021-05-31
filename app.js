const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

require('dotenv/config')
const app = express();

//import routes

const postRoute = require('./routes/posts')

app.use('/posts', postRoute)

//Routes

app.get('/', (req, res) => {
  res.send('Hello World');
});

//Connect to DB

mongoose.connect(
    process.env.DB_CONNECT,
    { useNewUrlParser: true,
    useUnifiedTopology: true},
    () => console.log("coonect db")
)

//app listening

app.listen(3000)
