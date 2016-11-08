'use strict';

var fs = require('fs');
var path = require('path');
var petsPath = path.join(__dirname, 'pets.json');

var node = path.basename(process.argv[0]);
var file = path.basename(process.argv[1]);
var cmd = process.argv[2];
var index = process.argv[3];


if (cmd === 'read') {
fs.readFile(petsPath, 'utf8', function(err, data) {
  var dataP = JSON.parse(data);

  if (err) {
    throw err;
  }

  else if (index === undefined) {
    var pets = dataP;
    console.log(pets);
    process.exit(1);
  }

  else if (index > dataP.length - 1 || index < 0) {
    console.error(`Usage: ${node} ${file} index`);
    process.exit(1);
  }

    console.log(index);
    var pet = dataP;
    console.log(pet[index]);
 });
}
  else {
    console.error(`Usage: ${node} ${file} read`);
    process.exit(1);
  }
