const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    post: {
        type: Schema.Types.ObjectId,
        ref: 'BlogPost'
    },
    email: {
        type: String,
        required: [true, 'email required']
    },
    date: {
        type: Date,
        required: [true, 'date required'],
        default: Date.now
    },
    likes: {
        type: Number,
        required: false
    }
});

module.exports = mongoose.model('Comment', commentSchema);