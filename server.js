// Setup empty JS object to act as endpoint for all routes
projectData = {};
const port = 3000;
// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
const { string } = require('yargs');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

// getData endpoint 
const getData = (req, res) => {
    res.send(projectData);
};

app.get('/getData', getData);

// postData endpoint
const postData = (req, res) => {
    let data = req.body;
    console.log(data);
    projectData = data;
};
app.post('/postData', postData);


// Setup Server
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));