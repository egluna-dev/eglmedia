const express = require('express');
const path = require('path');
const connectDB = require('./config/db')
require('dotenv').config();

const app = express();

// Connect to database
connectDB();


// Data Parsing for Forms
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// View Engine Setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Serve static assets
app.use(express.static('public'));
app.use('/images', express.static(__dirname + 'public/images'));
app.use('/javascript', express.static(__dirname + 'public/javascript'));
app.use('/stylesheets', express.static(__dirname + 'public/stylesheets'));
app.use('/logos', express.static(__dirname + 'public/logos'));


// Homepage Route
app.get('/', (req, res) => {
    res.render('index');
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));