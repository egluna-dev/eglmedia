const express = require('express');
const path = require('path');
const connectDB = require('./config/db')
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
require('dotenv').config();

const app = express();

// Connect to database
connectDB();

// Data Parsing for Forms
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Override for PUT/DELETE requests
app.use(methodOverride('_method'));

// View Engine Setup
app.engine('ejs', ejsMate);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Serve static assets
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(__dirname + 'public/images'));
app.use('/javascript', express.static(__dirname + 'public/javascript'));
app.use('/stylesheets', express.static(__dirname + 'public/stylesheets'));
app.use('/logos', express.static(__dirname + 'public/logos'));



// Homepage Route
app.get('/', (req, res) => {
    res.render('landingpage');
});

// Define routes
const blogRouter = require('./routes/blog')
const webdevelopmentRouter = require('./routes/webdevelopment/webdevelopment.js');
const photographyRouter = require('./routes/photography/photography');
app.use('/webdevelopment', webdevelopmentRouter);
app.use('/blogs', blogRouter);
app.use('/photography', photographyRouter);


// Serve static assets if in production
// if(process.env.NODE_ENV === 'production') {
//     // Set static folder
// }

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));