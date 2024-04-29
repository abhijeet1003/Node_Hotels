const express = require("express");
const app = express();
const db = require("./db");
// const Person = require("./models/Person");

// calling authentication
const passport = require("./auth");


// calling .env file
require("dotenv").config();

const bodyParser = require("body-parser"); //jo bhi data backend pr aarha hoga body parser use jason format me convert kar deta hai
app.use(bodyParser.json()); // req.body
const PORT = process.env.PORT || 3000;

// middleware function
const logRequest = (req, res, next) => {
  console.log(
    `${new Date().toLocaleString()} Request made to ${req.originalUrl}`
  );
  next();
};

// using with all routes
app.use(logRequest);



// initialize passport  so that we can use and then use it in any route
app.use(passport.initialize());

// using authentication with "/" route
// const localAuthMiddelware = passport.authenticate("local", { session: false });
// app.get("/", localAuthMiddelware, function (req, res) {
//   res.send("Welcome to our Hotel");
// });


const localAuthMiddelware = passport.authenticate("local", { session: false });

app.get("/", function (req, res) {
  res.send("Welcome to our Hotel");
});

// Import the router files
const personRoutes = require("./routes/personRoutes");
const menuItemRoutes = require("./routes/menuItemRoutes");

// Use the routers
// using authentication with person
// this require username password every time so know we will use tokens and not this type
// so comment it
// app.use("/person", localAuthMiddelware,  personRoutes);



app.use("/person",   personRoutes);
app.use("/menu", menuItemRoutes);

//   comment added again so that we can push in github
app.listen(PORT, () => {
  console.log("listening on port 5000");
});
 