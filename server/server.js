var timeoutTime = 200000000;

var fib = function(x, time) {
	if (new Date().getTime() - time > timeoutTime) throw "Timeout";
	if (x < 2) return x;
	else return fib(x-1, time) + fib(x-2, time);
}

var squareRoot = function(number){
	if(number < 1){
		return -1;
	}

	var minValue = 0.00001;
	var low = 1.0;
	var high = number;

	while(high - low > minValue){
		var middle = low + (high - low) / 2;
		if(middle * middle - number > minValue){
			high = middle;
		} else {
			low = middle;
		}
	}
	return low;
}

var getPrimeFactors = function(number) {
    num = Math.floor(number);
    var root, factors = [], x, sqrt = Math.sqrt, doLoop = 1 < num;
    
    while( doLoop ){
        root = sqrt(num);
        x = 2;
        if (num % x) {
            x = 3;
            while ((num % x) && ((x += 2) < root));
        }
        x = (x > root) ? num : x;
        factors.push(x);
        doLoop = ( x != num );
        num /= x;
    }
    return factors;
}

var isPrimeNumber = function(number)
{
    if (number < 2) {
	    return false;
	}

    var q = squareRoot(number);

    for (var i = 2; i <= q; i++)
    {
        if (number % i == 0)
        {
            return false;
        }
    }

    return true;
}

var nextHigherPrimeNumber = function(number){
	var tmp = number;

	do{
		tmp++;
		check = isPrimeNumber(tmp);

	}while(!check)

	return tmp;
}

var http = require('http');
var url = require("url");
http.createServer(function (req, res) {
	res.writeHead(200, {'Content-Type': 'text/json'});
	
	var parsedUrl = url.parse(req.url, true); // true to get query as object
	var queryAsObject = parsedUrl.query;
	var timeout = false;
	if (typeof parsedUrl.query != 'undefined' && !isNaN(parseInt(parsedUrl.query.number))) {
		input = parseInt(parsedUrl.query.number);
		var start = new Date().getTime();
		try {
			fibNumber = fib(input, start);
			squareNumber = squareRoot(input);
			isPrimeNumber = isPrimeNumber(input);
			//higherPrimeNumber = nextHigherPrimeNumber(input);
			primeFactors = getPrimeFactors(input);
		} catch(e) {
			timeout = true;
			error = e.message;
		}
		var fibTime = new Date().getTime() - start;
		if (!timeout) {
			result = {
				"fibonacci": {
					"time": fibTime,
					"result": fibNumber,
					"description": "The n-th fibonacci number."
				},
				"Square Root":{
					"time": fibTime,
					"result": squareNumber,
					"description": "The Square number"
				},
				"Prime Number":{
					"time": fibTime,
					"result": isPrimeNumber,
					"description": "Is the Number a Prime Number"			
				},
				"Prime Factors":{
					"time": fibTime,
					"result": primeFactors,
					"description": "The Prime Factors"			
				}/*,
				"Next Higher Prime Number":{
					"time": fibTime,
					"result": higherPrimeNumber,
					"description": "The next Higher Prime Number"			
				}*/
			}
		} else {
			result = {
				"fibonacci": {
					"time": fibTime,
					"result": -1,
					"description": error//"The calculation for the fibonacci number timed out."
				}
			}
		}
	} else {
		result = {
		"failure": {
			"result": "Input not a number",
			"description": "The parameter with the name \"number\" has to be of type number"
		}
	}
  }
  res.end(JSON.stringify(result));
}).listen(8080, '127.0.0.1');
console.log('Server running at http://127.0.0.1:8080/');