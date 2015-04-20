var timeoutTime = 2000;

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
  var compare;
  do{
    tmp++;
  }while(!isPrimeNumber(tmp));
  
  return tmp;
}

var calcPI = function(number){
  var Pi=0;
  var n=1;
  
  for (i=0;i<=number;i++)
  {
    Pi=Pi+(4/n)-(4/(n+2))
    n=n+4
  }

  return Pi;
}

var findNumberInPI = function(number){
  var pi = calcPI(1000).toString();
  return pi.indexOf(number.toString()) - 2;
}


module.exports = {
  isPrimeNumber: isPrimeNumber,
  nextHigherPrimeNumber: nextHigherPrimeNumber,
  getPrimeFactors: getPrimeFactors,
  squareRoot: squareRoot,
  fib: fib
}