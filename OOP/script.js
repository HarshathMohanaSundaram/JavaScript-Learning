'use strict';

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