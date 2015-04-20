var express = require('express');
var app = express();
var serverMethods = require("./modules/serverMethods.js")

//Add directory for file lockup
app.use(express.static(__dirname + '/'));

//Response get on root with main index.html
app.get('/', function (req, res) {
  res.sendfile('./app/index.html');
});

app.use('/query', function(req, res) {

  res.writeHead(200, {'Content-Type': 'text/json'});
  var timeout = false;

  if (typeof req.query != 'undefined' && !isNaN(parseInt(req.query.number))) {
    var input = parseInt(req.query.number);

    var start = new Date().getTime();

    try {
      var fibNumber = serverMethods.fib(input, start);
      var squareNumber = serverMethods.squareRoot(input);
      var isPrimeNumber = serverMethods.isPrimeNumber(input);
      var primeFactors = serverMethods.getPrimeFactors(input);
    } catch (e) {
      timeout = true;
      var error = e.message;
    }

    var fibTime = new Date().getTime() - start;

    if (!timeout) {
      var result = {
        "fibonacci": {
          "time": fibTime,
          "result": fibNumber,
          "description": "The n-th fibonacci number."
        },
        "Square Root": {
          "time": fibTime,
          "result": squareNumber,
          "description": "The Square number"
        },
        "Prime Number": {
          "time": fibTime,
          "result": isPrimeNumber,
          "description": "Is the Number a Prime Number"
        },
        "Prime Factors": {
          "time": fibTime,
          "result": primeFactors,
          "description": "The Prime Factors"
        }
      }
    } else {
      var result = {
        "fibonacci": {
          "time": fibTime,
          "result": -1,
          "description": error  //"The calculation for the fibonacci number timed out."
        }
      }
    }
  } else {
    var result = {
      "failure": {
        "result": "Input not a number",
        "description": "The parameter with the name \"number\" has to be of type number"
      }
    }
  }

  res.end(JSON.stringify(result));
});

var port = 8080;
app.listen(port, function () {
  console.log("Listening on port", port, "...");
});