var express = require("express");
const os = require("os");
const fs = require("graceful-fs");
var Logger = exports.Logger = {};


// Create 3 sets of write streams for the 3 levels of logging we wish to do
// every time we get an error we'll append to our error streams, any debug message
// to our debug stream etc...
var infoStream = fs.createWriteStream('logs/info.json');
// Notice we set the path of our log files in the first parameter of 
// fs.createWriteStream. This could easily be pulled in from a config
// file if needed.
var errorStream = fs.createWriteStream('logs/error.json');
var debugStream = fs.createWriteStream('logs/debug.json');



// we create 3 functions for logging requests, only info will be used for now
//our function takes 2 params, one for msg which can be anything and a request object where we will take the bulk of logging data
Logger.info = function(msg, req) {
    // we check if any of the required params are empty
    if(typeof(msg) === 'string' && req != null){
        //we get the full URL requested for verbosity
        var fullURL = req.protocol + '://' + req.get('host') + req.originalUrl;
        // we set all the data needed for our logs
        // note we hard set the "Level", this was done just to add the base of 'logging levels'
        var log = loggerWriter(new Date().toISOString(),msg,2,0,req.id,req.method, fullURL,req.hostname,req.get('connection'), req.connection.remoteAddress, req.connection.remotePort);
    }
    else{
        log = "no log can be produced, data incomplete";
    }
    infoStream.write(JSON.stringify(log));
 //console.log(log);
};

Logger.debug = function(msg ,req) {
    if(typeof(msg) === 'string' && req != null){
        //we get the full URL requested for verbosity
        var fullURL = req.protocol + '://' + req.get('host') + req.originalUrl;
        // we set all the data needed for our logs
        // note we hard set the "Level", this was done just to add the base of 'logging levels'
        var log = loggerWriter(new Date().toISOString(),msg,1,0,req.id,req.method, fullURL,req.hostname,req.get('connection'), req.connection.remoteAddress, req.connection.remotePort);
    }
    else{
        log = "no log can be produced, data incomplete";
    }
 //console.log(log);
};

Logger.error = function(msg ,req) {
    if(typeof(msg) === 'string' && req != null){
        //we get the full URL requested for verbosity
        var fullURL = req.protocol + '://' + req.get('host') + req.originalUrl;
        // we set all the data needed for our logs
        // note we hard set the "Level", this was done just to add the base of 'logging levels'
        var log = loggerWriter(new Date().toISOString(),msg,0,0,req.id,req.method, fullURL,req.hostname,req.get('connection'), req.connection.remoteAddress, req.connection.remotePort);
    }
    else{
        log = "no log can be produced, data incomplete";
    }
 //console.log(log);
};

// here we create and return an object that is formatted correctly and we can stringify the object
var loggerWriter = function(time, msg, level, v, reqid , reqMethod , reqURL, reqHeaderHost, reqHeaderConn ,remoteAddress ,remotePort){
    var jsonlog = {
                    pid: process.pid,
                    hostname: os.hostname(),
                    level: level,
                    msg: msg,
                    time: time,
                    v: v,
                    req: {
                        id: reqid,
                        method: reqMethod,
                        url: reqURL,
                        headers: {
                            host: reqHeaderHost,
                            connection: reqHeaderConn
                                },
                    remoteAddress: remoteAddress,
                    remotePort: remotePort
                    }
                }
                
    return jsonlog;
};








