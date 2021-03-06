'use strict';

var fs = require('fs');
var path = require('path');
var petsPath = path.join(__dirname, 'pets.json');

var express = require('express');
var app = express();

app.disable('x-powered-by');
app.set('port', process.env.PORT || 8000);

var bodyParser = require('body-parser');
app.use(bodyParser.json());

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


app.post('/pets', function(req, res) {
    var kind = req.body.kind;
    var age = req.body.age;
    var name = req.body.name;
    var pets;

    var pet = {
        "age": age,
        "kind": kind,
        "name": name
    };

    fs.readFile(petsPath, 'utf8', function(err, petsJSON) {
        if (err) {
            console.error(err.stack);
            return res.sendStatus(500);
        }

        if (kind && age && name) {
            pets = JSON.parse(petsJSON);

            pets.push(pet);

            pets = JSON.stringify(pets);

            fs.writeFile(petsPath, pets, function(writeErr) {
                if (writeErr) {
                    throw writeErr;
                }
            });
            res.send(pet);
        } else {
            return res.sendStatus(400);
        }
    }); //readfile
});


app.use(function(req, res) {
  res.sendStatus(404);
});

app.listen(app.get('port'), function() {
  console.log('Listening on port', app.get('port'));
});

module.exports = app;
