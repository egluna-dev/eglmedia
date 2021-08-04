const express = require('express');
const path = require('path');

const app = express();


// Data Parsing for Forms
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// View Engine Setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Homepage Route
app.get('/', (req, res) => {
    res.send('This is the home page for EGL Media');
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));