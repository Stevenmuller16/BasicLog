
var express = require('express');
var app = express();
var addRequestId = require('express-request-id')();

// require router.js that handles all the routes needed for properly logging all events
var router = require('./router');
//adding the request id to the req object that will follow us 
app.use(addRequestId);

app.use('/', router);
// creating a simple server 
app.listen(process.env.PORT, process.env.IP, function() {
  console.log("Now Listening on port: "+ process.env.PORT );
});