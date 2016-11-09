'use strict';

var fs = require('fs');
var path = require('path');
var petsPath = path.join(__dirname, 'pets.json');

var express = require('express');
var app = express();
var port = process.env.PORT || 8000;

app.disable('x-powered-by');

app.get('/pets', function(req, res) {
  fs.readFile(petsPath, 'utf8', function(err, petsJSON) {
    if (err) {
      console.error(err.stack);
      return res.sendStatus(500);
    }

    var pets = JSON.parse(petsJSON);

    res.send(pets);
  });
});

app.get('/pets/:id', function(req, res) {
  fs.readFile(petsPath, 'utf8', function(err, petsJSON) {
    if (err) {
      console.error(err.stack);
      return res.sendStatus(500);
    }

    var id = Number.parseInt(req.params.id);
    var pets = JSON.parse(petsJSON);

    if (id < 0 || id >= pets.length || Number.isNaN(id)) {
      return res.sendStatus(404);
    }

    res.set('Content-Type', 'application/json');
    res.send(pets[id]);
  });
});

app.use(function(req, res) {
  res.sendStatus(404);
});

app.listen(port, function() {
  console.log('Listening on port', port);
});

module.exports = app;









//
// var server = http.createServer(function(req, res) {
//   if (req.method === 'GET' && req.url === '/pets') {
//     fs.readFile(petsPath, 'utf8', function(err, petsJSON) {
//       if (err) {
//         console.error(err.stack);
//         res.statusCode = 500;
//         res.setHeader('Content-Type', 'text/plain');
//         return res.end('Internal Server Error');
//       }
//
//       res.setHeader('Content-Type', 'application/json');
//       res.end(petsJSON);
//     });
//   }
//   else if (req.method === 'GET' && req.url === '/pets/0') {
//     fs.readFile(petsPath, 'utf8', function(err, petsJSON) {
//       if (err) {
//         console.error(err.stack);
//         res.statusCode = 500;
//         res.setHeader('Content-Type', 'text/plain');
//         return res.end('Internal Server Error');
//       }
//
//       var pets = JSON.parse(petsJSON);
//       var petJSON = JSON.stringify(pets[0]);
//
//       res.setHeader('Content-Type', 'application/json');
//       res.end(petJSON);
//     });
//   }
//   else if (req.method === 'GET' && req.url === '/pets/1') {
//     fs.readFile(petsPath, 'utf8', function(err, petsJSON) {
//       if (err) {
//         console.error(err.stack);
//         res.statusCode = 500;
//         res.setHeader('Content-Type', 'text/plain');
//         return res.end('Internal Server Error');
//       }
//
//       var pets = JSON.parse(petsJSON);
//       var petJSON = JSON.stringify(pets[1]);
//
//       res.setHeader('Content-Type', 'application/json');
//       res.end(petJSON);
//     });
//   }
//   else {
//     res.statusCode = 404;
//     res.setHeader('Content-Type', 'text/plain');
//     res.end('Not found');
//   }
// });
//
// server.listen(port, function() {
//   console.log('Listening on port', port);
// });
