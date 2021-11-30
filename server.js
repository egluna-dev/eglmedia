const express = require('express');
const path = require('path');
const connectDB = require('./config/db')
const methodOverride = require('method-override');
const ExpressError = require('./utilities/ExpressError');
const ejsMate = require('ejs-mate');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy
const User = require('./models/User');
const getYear = require('./utilities/getYear');

const MongoDBStore = require('connect-mongo');
require('dotenv').config();

const app = express();

// Connect to database
connectDB();

// Express Session Config
const secret = process.env.SESSION_SECRET || 'super secret secret';
const dbUrl = process.env.MONGO_URI;

const store = MongoDBStore.create({
    mongoUrl: dbUrl,
    secret,
    touchAfter: 24 * 60 * 60
});

store.on('error', function(e) {
    console.log("CONNECTTION ERROR!", e)
});

const sessionConfig = {
    store,
    name: 'session',
    secret, 
    resave: false, 
    saveUninitialized: true ,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}

app.use(session(sessionConfig));

// Flash middleware
app.use(flash());
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});
// ^ End of flash middleware

// Passport config
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Data Parsing for Forms
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Override middleware for PUT/DELETE requests
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
app.use('/svg', express.static(__dirname + 'public/svg'));

// Homepage Route
app.get('/', (req, res) => {
    res.render('landingpage');
});

//  @route  GET /privacypolicy
//  @desc   Legal privacy policy content
//  @access Public
app.get('/privacypolicy', (req, res) => {
    const currentYear = getYear();
    res.render('legal/privacypolicy', { title: 'Privacy Policy', year: currentYear });
});

//  @route  GET /privacypolicy
//  @desc   Legal privacy policy content
//  @access Public
app.get('/termsandconditions', (req, res) => {
    const currentYear = getYear();
    res.render('legal/termsandconditions', { title: 'Terms & Conditions', year: currentYear});
});

// Define routes
const webdevelopmentRouter = require('./routes/webdevelopment/webdevelopment.js');
const photographyRouter = require('./routes/photography/photography');
const authRouter = require('./routes/auth');
app.use('/webdevelopment', webdevelopmentRouter);
app.use('/photography', photographyRouter);
app.use('/', authRouter);

app.all('*', (req, res, next) => {
    next(new ExpressError('Page not found', 404))
});

app.use((err, req, res, next) => {
    const { statusCode = 500, message = 'Something went wrong' } = err;
    const currentYear = getYear();
    if(!err.message) err.message = 'It looks like something went wrong';
    res.status(statusCode).render('error', { err, title: 'Error', year: currentYear, statusCode });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));