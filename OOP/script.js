'use strict';

/*
const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;

  // Never Create functions inside constructor
  // this.calcAge = function(){
  //   console.log(2037 - this.birthYear);
  // }
};

const jonas = new Person('Jonas', '1991');
console.log(jonas);

const harshath = new Person('Harshath', '2002');
const jack = new Person('Jack', '2003');
console.log(harshath, jack);

console.log(jonas instanceof Person);

// Prototypes
Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

jonas.calcAge();
harshath.calcAge();
jack.calcAge();

console.log(jonas.__proto__);
console.log(jonas.__proto__ == Person.prototype);

console.log(Person.prototype.isPrototypeOf(jonas));
console.log(Person.prototype.isPrototypeOf(harshath));
console.log(Person.prototype.isPrototypeOf(Person));

Person.prototype.species = 'Homo';
console.log(jonas.species);
console.log(jonas.hasOwnProperty('firstName'));
console.log(jonas.hasOwnProperty('species'));

console.log(jonas.__proto__);
// Object.prototype (top of prototype chain)
console.log(jonas.__proto__.__proto__);

console.dir(Person.prototype.constructor);

const arr = [3, 6, 5, 3, 1, 6, 8];
console.log(arr.__proto__);
console.log(arr.__proto__ == Array.prototype);
console.log(arr.__proto__.__proto__);

Array.prototype.unique = function () {
  return [...new Set(this)];
};

console.log(arr.unique());
console.dir(x => x + 1);

// Coding Challenge 1
const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function(){
  this.speed+=10;
  console.log(`${this.make} is going at ${this.speed} km/hr`);
}

Car.prototype.brake = function(){
  this.speed -= 5;
  console.log(`${this.make} is going at ${this.speed} km/hr`);
}

const bmw = new Car('BMW', 120);
const benz = new Car('Benz', 95);

bmw.accelerate();
bmw.accelerate();
bmw.brake();
bmw.accelerate();
*/

// class expression
const PersonExp = class {};

// class declaration
class PersonCl {
  constructor(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  }

  calcAge() {
    console.log(2037 - this.birthYear);
  }
  greet() {
    console.log(`Hey ${this.firstName}`);
  }
}

const joey = new PersonCl('Joey', 1991);
console.log(joey);
joey.calcAge();

// PersonCl.prototype.greet = function() {
//   console.log(`Hey ${this.firstName}`);
// }
joey.greet();
