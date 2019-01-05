
 Simple Express Logger for all requests


A very basic request detail logger, not checking for error status codes and modifying behaviour etc. just basic logging of requests 
with a request id added to the `request` object


## Usage

To use the logger `require` the logger into your app:

``` js
	var logger = require("./logger").Logger;
```
And then run the corresponding logging function to log all `requests`:

``` js
	logger.info("message string", requestObject);
```

## Running the sample project with the logger

1) Open `app.js` and start your server
2) Make a request to the url where the server is running

---- The sample project serves as a test bench for the logger because of the simplicity of the module

NOTE: remember the package.json shows all the required modules to correctly run the demo app

## Accessing the log files

 the logs are written into specific files instead of the standard stdout/stderr and transports for persistance and ease of navigating the logs by writing them to json files
 

1) Find the log files at /logs
2) the output from the logging will be written to the text files as JSON

## TODO

1) add tests using `chai` and `supertest`

## API

##### logger.info(message, request)

    our logging function take two parameters, one message string which we can glean more information from
    and the request object from an http request for example
    
   ```js
    router.get('/', function(req, res) {
    logger.info("this is our message", req);
    res.send('pageToServe');
    });```


