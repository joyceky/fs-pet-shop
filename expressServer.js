"use strict";

//Lets require/import the HTTP module
var http = require('http');
var fs = require('fs');
var pets = JSON.parse(fs.readFileSync('./pets.json', 'utf8'));

//Lets define a port we want to listen to
const PORT=8000;


const petRegExp = /^\/pets\/(.*)$/;

//We need a function which handles requests and send response
function handleRequest(request, response){
    response.end('It Works!! Path Hit: ' + request.url);
    console.log(pets);

    server.on('request', function(request, response) {
      // the same kind of magic happens here!
      if(request === "GET" && request.url === "/pets") {
        console.log(pets);
      }
      else {
        //do something else
      }
    });
}

//Create a server
var server = http.createServer(handleRequest);

//Lets start our server
server.listen(PORT, function(){
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", PORT);
});
