var express = require('express');
var router = new express.Router;
var addRequestId = require('express-request-id')();
 


// here we require our very simple logger that
var logger = require("./logger").Logger;
// we add a request UUID to the req object, this part is needed
router.use(addRequestId);

router.use(function timeLog(req, res, next) {
    // here we call the logger itself and pass in our req object
    logger.info("TestfromInfo", req);
  next();
});



router.get('/', function(req, res) {
  res.send('Home Page');
});

module.exports = router;
//module.exports = addRequestId;