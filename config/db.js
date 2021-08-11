const mongoose = require('mongoose');
const config = require('config');
// require('dotenv').config();
// const db = process.env.MONGO_URI

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://luna:12345@cluster0.naege.mongodb.net/eglmedia?retryWrites=true&w=majority', { 
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB Connected')
    } catch (e) {
        console.error(e.message)
        // Exit process with failure
        process.exit(1);
    }
}

module.exports = connectDB;