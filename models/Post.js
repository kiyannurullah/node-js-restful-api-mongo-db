const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const uniqueValidator = require('mongoose-unique-validator');

const postSchema = mongoose.Schema({
    bookId: {
        type: Number
    },
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

postSchema.plugin(AutoIncrement, {inc_field: 'bookId'});
postSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Posts', postSchema)
