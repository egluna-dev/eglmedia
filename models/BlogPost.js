const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Comment = require('./Comment');
const marked = require('marked');
// const slugify = require('slugify');
const createDomPurify = require('dompurify');
const { JSDOM } = require('jsdom');
const domPurify = createDomPurify(new JSDOM().window);

const BlogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    image: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    categories: [
        {
            type: String,
            required: false
        }
    ],
    text: {
        type: String,
        required: true
    },
    sanitizedHtml: {
        type: String,
        rquired: true
    },
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
});

BlogSchema.post('findOneAndDelete', async function(doc) {
    if(doc) {
        await Comment.deleteMany({
            _id: {
                $in: doc.comments
            }
        })
    }
});

BlogSchema.pre('validate', function(next) {
    if(this.text) {
        this.sanitizedHtml = domPurify.sanitize(marked(this.text));
    }

    next();
});

module.exports = mongoose.model('BlogPost', BlogSchema);