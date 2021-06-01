const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

require('dotenv/config');

const app = express();

const port = process.env.PORT || 3000

app.use(bodyParser.json());

// Import routes

const postRoute = require('./routes/posts');

app.use('/posts', postRoute)

// Connect to DB

mongoose
    .connect(process.env.DB_CONNECT, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,   })
    .then(() => console.log("Database connected"))
    .catch(err => console.log(err));

// Routes

app.get('/' , (req,res) => {
    res.send('Welcome Home Page');
});


// Listening

app.listen(port);
