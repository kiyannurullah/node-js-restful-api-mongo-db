const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    userId: {
        type: Number
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {timestamp: true})

userSchema.plugin(AutoIncrement, {inc_field: 'userId'});
userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Users', userSchema)
