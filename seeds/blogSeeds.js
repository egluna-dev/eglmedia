const titles = ['The philosophy of street photography', 'Compositions in street photography', 'Creative ruts and how to get out', 'Using available light'];
const categories = ['travel','photography','gear','cinematic','cinematography', 'landscape photography', 'editing', 'business', 'data science', 'computer science', 'engineering', 'software', 'philosophy', 'australia', 'canada', 'asia']
const BlogPost = require('../models/BlogPost.js');
const mongoose = require('mongoose');
const connectDB = require('../config/db');

connectDB();

const seedDB = async () => {
    for(let i = 0; i < 4; i++) {
        const randomNum = Math.floor(Math.random() * 4);
        const random20 = Math.floor(Math.random() * 20 + 1);
        const categoryLength = categories.length;
        const randomCategory = Math.floor(Math.random() * categoryLength + 1)       
        const randomTitle = titles[randomNum];
        const date = new Date();
        const post = new BlogPost({
            title: `${randomTitle}`,
            author: 'Giovanni Luna',
            image: 'https://images.unsplash.com/photo-1574769364990-b9179810b6f0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1477&q=80',
            date: `${date}`,
            readlength: `${random20}`,
            category: `${randomCategory}`,
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut etiam sit amet nisl purus in mollis nunc. Ultricies leo integer malesuada nunc vel. Morbi tincidunt augue interdum velit euismod in. Tempus iaculis urna id volutpat lacus laoreet non. Etiam dignissim diam quis enim lobortis scelerisque. Phasellus vestibulum lorem sed risus ultricies tristique. Mattis molestie a iaculis at erat pellentesque adipiscing commodo. Ut eu sem integer vitae justo eget magna. Amet dictum sit amet justo donec enim diam vulputate ut. Adipiscing commodo elit at imperdiet dui accumsan. Tristique senectus et netus et malesuada. Commodo nulla facilisi nullam vehicula ipsum. Accumsan in nisl nisi scelerisque eu. Non nisi est sit amet facilisis magna etiam. Orci sagittis eu volutpat odio facilisis mauris. Ullamcorper a lacus vestibulum sed arcu non odio. Maecenas pharetra convallis posuere morbi leo urna. Nunc aliquet bibendum enim facilisis gravida neque convallis a. Lacinia quis vel eros donec ac. Magnis dis parturient montes nascetur ridiculus mus mauris vitae. Faucibus et molestie ac feugiat sed lectus vestibulum mattis ullamcorper. Egestas quis ipsum suspendisse ultrices gravida dictum fusce ut. Erat nam at lectus urna duis convallis convallis tellus. Eu augue ut lectus arcu bibendum at. Lacus sed viverra tellus in hac. Augue interdum velit euismod in pellentesque massa placerat. Blandit massa enim nec dui nunc mattis. Massa id neque aliquam vestibulum. Ornare suspendisse sed nisi lacus sed viverra. Non sodales neque sodales ut etiam sit amet nisl purus. Sit amet aliquam id diam maecenas. Vel pretium lectus quam id leo. Praesent semper feugiat nibh sed pulvinar proin gravida. Id interdum velit laoreet id donec ultrices tincidunt arcu non. Facilisi nullam vehicula ipsum a arcu cursus vitae congue. Massa tincidunt dui ut ornare lectus sit amet est placerat. Dapibus ultrices in iaculis nunc sed augue lacus viverra. Iaculis eu non diam phasellus vestibulum lorem sed risus. Sagittis nisl rhoncus mattis rhoncus urna. Viverra orci sagittis eu volutpat odio. Ullamcorper morbi tincidunt ornare massa eget egestas purus viverra. Justo eget magna fermentum iaculis eu non diam. Proin sagittis nisl rhoncus mattis rhoncus urna neque viverra justo. Neque laoreet suspendisse interdum consectetur libero id faucibus nisl. Ligula ullamcorper malesuada proin libero nunc consequat. Turpis egestas pretium aenean pharetra magna ac placerat vestibulum lectus. Malesuada fames ac turpis egestas sed tempus urna. Tincidunt dui ut ornare lectus sit amet.'
        });
        await post.save();
    }
}

const deleteData = async () => {
    await BlogPost.deleteMany({});
    console.log('Database deleted');
}

// deleteData();

seedDB();

module.exports = seedDB;
