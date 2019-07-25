const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const routes = require("./routes");
const users = require("./routes/api/users");
const logger = require("morgan");
const bodyParser = require('body-parser');
const path = require('path');
const products = require('./routes/api/products');


const app = express();

// db connection
require('./DB/dbConnection');

app.use(logger("dev"));

// Bodyparser middleware
// app.use(express.urlencoded({  extended: true}));
// app.use(express.json());

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Middleware for shopping cart
app.use(require('helmet')());
app.use(require('cors')());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// If in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));
    
    app.get('*', (req, res) => {
        res.sendfile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

// Routes
app.use("/api/users", users);
app.use('/api/products', products);

const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`Server up and running on port ${port} !`));
