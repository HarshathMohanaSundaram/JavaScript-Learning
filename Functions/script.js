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

const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  booking: [],
  //book: function(){}
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} fight ${this.iataCode}${flightNum}`
    );

    this.booking.push({ flight: `${this.iataCode}${flightNum}`, name });
  },
};

lufthansa.book(239, 'Harshath');
lufthansa.book(639, 'Jonty Rhodes');

const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  booking: [],
};

const book = lufthansa.book;
// Not work
//book(23, 'Sarah Williams');

/* Call, Apply, and Bind Method for setting `this` keyword explictly
// Call Method
book.call(eurowings, 23, 'Sarah Williams');
console.log(eurowings);

book.call(lufthansa, 56, 'Marry Cooper');
console.log(lufthansa);

const swiss = {
  airline: 'Swiss Airlines',
  iataCode: 'SWA',
  booking: [],
};

book.call(swiss, 78, 'Johan');
console.log(swiss);

// Apply method
const flightData = [583, 'Francis George'];
book.apply(swiss, flightData);
console.log(swiss);

//  Bind Method
// book.call(eurowings, 23, 'Sarah Williams');
const bookEw = book.bind(eurowings);
const bookLH = book.bind(lufthansa);
const bookSWA = book.bind(swiss);
bookEw(28, 'Hawkings');
console.log(eurowings);
bookLH(34, 'Daniel');
console.log(lufthansa);
bookSWA(2134, 'Sophia');
console.log(swiss);

const bookEw23 = book.bind(eurowings, 23);
bookEw23('Harshath');
bookEw23('George');

// with Event Listeners

lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  console.log(this);

  this.planes++;
  console.log(this.planes);
};

document
  .querySelector('.buy')
  .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));

// Partial application

const addTax = (rate, value) => value + value * (rate / 100);

console.log(addTax(10, 200));

const addVAT = addTax.bind(null, 23);

console.log(addVAT(100));
console.log(addVAT(23));

const taxCalculator = (VAT) => (value) => VAT(value);

const vatCalculator = taxCalculator(addVAT);

console.log(vatCalculator(100));

const addTaxRate = function(rate) {
  return function(value) {
    return value + (value * (rate/100))
  }
}

const addVAT2 = addTaxRate(23);
console.log(addVAT2(199));
console.log(addVAT2(100));

*/
