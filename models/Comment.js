const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    firstname : {
        type: String,
        required: [true, 'Please provide your name']
    },
    lastname: {
        type: String,
        required: false
    },
    email: {
        type: String,
        unique: [true, 'Please provide your email']
    },
    date: {
        type: Date,
        default: Date.now
    },
    text: {
        type: String,
        required: [true, 'Comment text required']
    }
});

module.exports = mongoose.model('Comment', commentSchema);