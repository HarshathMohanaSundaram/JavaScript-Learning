/* Default Parameters
const bookings = [];
const createBooking = function (flightNum, numPassengers = 1, price = 199 * numPassengers) {
  // ES 5
  // numPassengers = numPassengers || 1;
  // price = price || 199;

  const booking = {
    flightNum,
    numPassengers,
    price,
  };

  console.log(booking);

  bookings.push(booking);
};

createBooking('LH123');
createBooking('LH123', 2, 800);
createBooking('LH123', 2);
createBooking('LH123', 5);
createBooking('LH123',undefined,1000);
*/

/* Pass By Argument Vs References
const flightNum = 'LH123';
const jonas = {
  name: 'Harshath',
  passport: 7657385883,
};

const checkIn = function (flightNum, passenger) {
  flightNum = 'LH999';
  passenger.name = 'Mr. ' + passenger.name;

  if (passenger.passport === 7657385883) {
    alert('Check IN');
  } else {
    alert('Wrong Passpoert');
  }
};
// checkIn(flightNum, jonas);
// console.log(flightNum);
// console.log(jonas);

const newPassport = function (person) {
  person.passport = Math.trunc(Math.random() * 10000000000000000);
};

newPassport(jonas);
checkIn(flightNum, jonas);
*/

/* CallBack and Higher Order Functions

// Higher Order Functions

const oneWord = function (str) {
  return str.replace(/ /g, '').toLowerCase();
};

const upperWordFirst = function (str) {
  const [first, ...others] = str.split(' ');
  return [first.toUpperCase(), ...others].join(' ');
};

// Higher order function
const transformer = function (str, fn) {
  console.log(`Original String: ${str}`);
  console.log(`Transformed string: ${fn(str)}`);

  console.log(`Transformed by: ${fn.name}`);
};

transformer('Javscript is the best', upperWordFirst);
transformer('Javascript is the best!', oneWord);

//Js using Callbacks all the time
const highFive = function () {
  console.log(':):):)');
};

document.body.addEventListener('click', highFive);

['Jonas', 'Martha', 'Adam'].forEach(highFive);

*/

/* Functions Returning Functions
const greet = function(greeting){
  return function(name) {
    console.log(`${greeting} ${name}`);
  }
}

// Challenge
const greetArr = greeting => name => console.log(`${greeting} ${name}`);
const greeterHey = greet('Hey');

greeterHey('Jonas');
greeterHey('Harshath');

greetArr('Hello')('Harshath');

*/
