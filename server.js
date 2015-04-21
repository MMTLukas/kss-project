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
    var fibTime = 0;
    var squareTime = 0;
    var primeTime = 0;
    var nextPrimeTime = 0;
    var piTime = 0;
    var primeFacTime = 0;
    var hexTime = 0;
    var binTime = 0;
        
    try {
      var fibNumber = serverMethods.fib(input, start);
      fibTime = new Date().getTime() - start;
      start = new Date().getTime();
      var squareNumber = serverMethods.squareRoot(input);
      squareTime = new Date().getTime() - start;
      start = new Date().getTime();
      var isPrimeNumber = serverMethods.isPrimeNumber(input);
      primeTime = new Date().getTime() - start;
      start = new Date().getTime();
      var getNextPrimeNumber = serverMethods.nextHigherPrimeNumber(input);
      nextPrimeTime = new Date().getTime() - start;
      start = new Date().getTime();
      var findNumberInPi = serverMethods.findNumberInPi(input)
      piTime = new Date().getTime() - start;
      start = new Date().getTime();
      var primeFactors = serverMethods.getPrimeFactors(input);
      primeFacTime = new Date().getTime() - start;
      start = new Date().getTime();
      var hex = serverMethods.decimalToHex(input);
      hexTime = new Date().getTime() - start;
      start = new Date().getTime();
      var binary = serverMethods.decimalToBinary(input);
      binTime = new Date().getTime() - start;
    } catch (e) {
      timeout = true;
      var error = e.message;
      fibTime = new Date().getTime() - start;
    }

    if (!timeout) {
      var result = {
        "fibonacci": {
          "time": fibTime,
          "result": fibNumber,
          "description": "The n-th fibonacci number."
        },
        "Square Root": {
          "time": squareTime,
          "result": squareNumber,
          "description": "The Square root"
        },
        "Prime Number": {
          "time": primeTime,
          "result": isPrimeNumber,
          "description": "Is the Number a Prime Number"
        },
        "Next Prime Number": {
          "time": nextPrimeTime,
          "result": getNextPrimeNumber,
          "description": "The next Prime Number"
        },
        "Prime Factors": {
          "time": primeFacTime,
          "result": primeFactors,
          "description": "The Prime Factors"
        },
        "Find Number in PI": {
          "time": piTime,
          "result": findNumberInPi,
          "description": "Search Number in PI"
        },
        "Binary notation": {
          "time": binTime,
          "result": binary,
          "description": "Number in binary notation"
        },
        "Hexadecimal notation": {
          "time": hexTime,
          "result": hex,
          "description": "Number in hex notation"
        }
      }
    } else {
      var result = {
        "fibonacci": {
          "time": fibTime,
          "result": -1,
          "description": error
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