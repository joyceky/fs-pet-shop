'use strict';

var fs = require('fs');
var path = require('path');
var petsPath = path.join(__dirname, 'pets.json');

var node = path.basename(process.argv[0]);
var file = path.basename(process.argv[1]);
var cmd = process.argv[2];
var index = process.argv[3];


if (cmd === 'read'){
  read();
}

else if (cmd === "create") {
  create();
}

else if (cmd === "update") {
  update();
}

else if (cmd === "destroy") {
  destroy();
}

  else {
    console.error(`Usage: ${node} ${file} [read | create | update | destroy]`);
    process.exit(1);
  }



  function read() {
    fs.readFile(petsPath, 'utf8', function(err, data) {
      var dataP = JSON.parse(data);

      if (err) {
        throw err;
      }

      else if (index === undefined) {
        var pets = dataP;
        console.log(pets);
      }

      else if (index > dataP.length - 1 || index < 0) {
        console.error(`Usage: ${node} ${file} INDEX`);
        process.exit(1);
      }
      else {
        var pet = dataP;
        console.log(pet[index]);
       }
     });
  }

  function update() {
    var index = process.argv[3];
    var age = process.argv[4];
    var kind = process.argv[5];
    var name = process.argv[6];


    fs.readFile(petsPath, 'utf8', function(readErr, data) {
      if (readErr) {
        throw readErr;
      }

      else if (!age && !kind && !name) {
        console.error(`Usage: ${node} ${file} ${cmd} AGE KIND NAME`);
        process.exit(1);
      }

      else if (index < JSON.parse(data).length) {
        var pets = JSON.parse(data);

        pets[index] = {
          "age": parseInt(age),
          "kind": kind,
          "name": name
        };

        var petsJSON = JSON.stringify(pets);

        fs.writeFile(petsPath, petsJSON, function(writeErr) {
          if (writeErr) {
            throw writeErr;
        }
        console.log(pets[index]);
      });
     }
   });
  }

  function create () {
    var age = process.argv[3];
    var kind = process.argv[4];
    var name = process.argv[5];

    fs.readFile(petsPath, 'utf8', function(readErr, data) {
      if (readErr) {
        throw readErr;
      }

      else if (!age || !kind || !name) {
        console.error(`Usage: ${node} ${file} ${cmd} AGE KIND NAME`);
        process.exit(1);
      }

      else {
        var pets = JSON.parse(data);

        var pet = {
          "age": parseInt(age),
          "kind": kind,
          "name": name
        };

        pets.push(pet);

        var petsJSON = JSON.stringify(pets);

        fs.writeFile(petsPath, petsJSON, function(writeErr) {
          if (writeErr) {
            throw writeErr;
        }
        console.log(pet);
      });
     }
    });
  }

  function destroy() {

    fs.readFile(petsPath, 'utf8', function(err, data) {
      var dataP = JSON.parse(data);

      if (err) {
        throw err;
      }

      else if (index === undefined) {
        console.error(`Usage: ${node} ${file} ${cmd} INDEX`);
        process.exit(1);
      }

      else if (index > dataP.length - 1 || index < 0) {
        console.error(`Usage: ${node} ${file} INDEX`);
        process.exit(1);
      }

        var pets = dataP;

         pets.splice(index, 1);

         console.log(pets);

         var petsJSON = JSON.stringify(pets);

         fs.writeFile(petsPath, petsJSON, function(writeErr) {
           if (writeErr) {
             throw writeErr;
         }
       });
     });
  }
