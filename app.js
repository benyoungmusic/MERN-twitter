

// This creates a new Express server:
const express = require("express");
const app = express();

const mongoose = require('mongoose');
const db = require('./config/keys').mongoURI;

const users = require("./routes/api/users");
const tweets = require("./routes/api/tweets");
const passport = require('passport');

const bodyParser = require('body-parser');
// setup a basic route so that we can render some information on our page:
app.use(passport.initialize());
require('./config/passport')(passport);
app.use("/api/users", users);
app.use("/api/tweets", tweets);
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
app.use(express.urlencoded());
app.use(express.json());

// tell our app which port to run on. We will later be deploying to Heroku,
// which requires us to run our server on process.env.PORT
// Locally our server will now run on localhost:5000


mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));





const port = process.env.PORT || 5000;

// tell Express to start a socket and listen for connections on the path

app.listen(port, () => console.log(`Server is running on port ${port}`));

