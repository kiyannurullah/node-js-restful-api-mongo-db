const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors')

require('dotenv/config');

const app = express();

const port = process.env.PORT || 3000

app.use(bodyParser.json());
app.use(cors())

// Import routes

const postRoute = require('./routes/posts');
const authRoute = require('./routes/auth')


app.use('/', postRoute)
app.use('/', authRoute)

// Connect to DB

mongoose
    .connect(process.env.DB_CONNECT, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,   })
    .then(() => console.log("Database connected"))
    .catch(err => console.log(err));

// Routes

app.get('/' , (req,res) => {
    res.send('Welcome Home Page');
});


// Listening

app.listen(port);
