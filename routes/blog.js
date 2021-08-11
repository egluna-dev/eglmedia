const express = require('express');
const { Mongoose } = require('mongoose');
const app = express();
const router = express.Router({ mergeParams: true });
const BlogPost = require('../models/BlogPost.js');

//  @route     GET /blogs
//  @desc      Blog index page
//  @access    Public
router.get('/', async (req, res) => {
    try {
        const posts = await BlogPost.find({});
        posts.forEach((el) => {
            if(el.date = null) {
                el.date = Date.now
            }
        });
        res.render('blogs/blog', { posts });
    } catch (err) {
        console.error(err.message);
    }
});

//  @route      GET /blog/new
//  @desc       Show form for submitting new blog post
//  @access     Private
router.get('/new', (req, res) => {
    res.render('blogs/newblog');
});

//  @route      GET /blog/blog-title
//  @desc       Individual blog post page
//  @access     Public
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const post = await BlogPost.findById(id)
        console.log(post);
        if(post === null) res.redirect('/blogs');
        res.render('blogs/blogpage', { post });
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
});

//  @route      POST /blog/new
//  @desc       Submit new blog post
//  @access     Private
router.post('/', async (req, res) => {
    try {
        let newPost = new BlogPost({
            title: req.body.title,
            author: req.body.author,
            image: req.body.image,
            date: req.body.date,
            readlength: req.body.readlength,
            category: req.body.category,
            text: req.body.text
        });
        newPost = await newPost.save();
        console.log(newPost._id);
        res.redirect(`/blogs/${newPost._id}`);
    } catch (err) {
        console.error(err);
    }
});

//  @route      GET /blog/:id/edit
//  @desc       Show form for editing existing blog post
//  @access     Private
router.get('/:id/edit', async (req, res) => {
    try {
        const post = await BlogPost.findById(req.params.id);
        res.render('blogs/editblog', { post })
    } catch (err) {
        console.error(err.message);
    }

});

//  @route      PUT /blog/:id
//  @desc       Submit changes for existing blog post
//  @access     Private
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const post = await BlogPost.findByIdAndUpdate(id, { ...req.body.blogpost });
        res.redirect(`/blogs/${post._id}`);
    } catch (err) {
        console.error(err.message);
    }
});

//  @route      DELETE /blog/:id/edit
//  @desc       Delete individual blog post
//  @access     Private
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const post = await BlogPost.findByIdAndDelete(id);
        res.redirect('/blogs/blog');
    } catch (err) {
        console.error(err);
    }
    
})



module.exports = router;