const express = require('express')
const app = express();
const db = require('./db');


// calling .env file
require('dotenv').config();


const bodyParser = require('body-parser');  //jo bhi data backend pr aarha hoga body parser use jason format me convert kar deta hai
app.use(bodyParser.json()); // req.body
const PORT = process.env.PORT || 3000;

app.get('/', function (req, res) {
    res.send('Welcome to our Hotel');
})

// Import the router files
const personRoutes = require('./routes/personRoutes');
const menuItemRoutes = require('./routes/menuItemRoutes');

// Use the routers
app.use('/person', personRoutes);
app.use('/menu', menuItemRoutes);




//   comment added again so that we can push in github
app.listen(PORT, ()=>{
    console.log('listening on port 5000');
})