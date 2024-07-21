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

// Static Method
Person.hey = function () {
  console.log('Hey There!!');
};

Person.hey();


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


// class expression
const PersonExp = class {};

// class declaration
class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  greet() {
    console.log(`Hey ${this.fullName}`);
  }

  get age() {
    return this.calcAge();
  }

  set fullName(name) {
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a full name!`);
  }

  get fullName() {
    return this._fullName;
  }

  // Static Method
  static hey() {
    console.log('Hey There!!');
    console.log(this);
  }
}

const joey = new PersonCl('Joey Tribbiani', 1991);
console.log(joey);

// PersonCl.prototype.greet = function() {
//   console.log(`Hey ${this.firstName}`);
// }
joey.greet();

const account = {
  owner: 'jonas',
  movements: [200, 530, 120, 300],

  get latest() {
    return this.movements.slice(-1).pop();
  },

  set latest(movement) {
    this.movements.push(movement);
  },
};

console.log(account.latest);
account.latest = 50;
console.log(account.movements);

console.log(PersonCl.hey());

const PersonProto = {
  calcAge() {
    return 2037 - this.birthYear;
  },

  init(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(PersonProto);
console.log(steven);

steven.name = 'Steven';
steven.birthYear = 2002;

console.log(steven.calcAge());

const sara = Object.create(PersonProto);
sara.init('Rachel', 1991);
console.log(sara.calcAge());
console.log(sara);

// Coding Challenge 2
class Car {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  get speedUS() {
    return this.speed/1.6;
  }

  set speedUS(speed) {
    this.speed = speed * 1.6;
  }

  accelerate() {
    this.speed += 10;
    console.log(`${this.make} is going at ${this.speed} km/hr`);
  }

  brake() {
    this.speed -= 5;
    console.log(`${this.make} is going at ${this.speed} km/hr`);
  }
}

const car = new Car('Ford', 120);
car.speedUS = 100;
console.log(car.speedUS);

car.accelerate();
car.brake();
car.accelerate();
console.log(car.speedUS);
*/

///////////////////////////////////////////////////////////////////////////////////////////////
//// Inheritance Between "Classes": Constructor
/*
const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

// Prototypes
Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

const Student = function (firstName, birthYear, course) {
  Person.call(this, firstName, birthYear);
  this.course = course;
};

//Linking Prototype
Student.prototype = Object.create(Person.prototype);

Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const mike = new Student('Mike', 2002, 'Computer Science');
console.log(mike);
mike.introduce();
mike.calcAge();

console.log(mike.__proto__);
console.log(mike.__proto__.__proto__);
console.log(mike instanceof Student);
console.log(mike instanceof Person);
console.log(Student.prototype.constructor);

Student.prototype.constructor = Student;
console.log(Student.prototype.constructor);
*/

/*
// Coding Challenge 3
const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.make} is going at ${this.speed} km/hr`);
};

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`${this.make} is going at ${this.speed} km/hr`);
};

const EV = function(make, speed, charge){
  Car.call(this, make, speed)
  this.charge = charge
}

EV.prototype = Object.create(Car.prototype);

EV.prototype.chargeBattery = function(chargeTo){
  this.charge = chargeTo;
}

EV.prototype.accelerate = function(){
  this.speed += 20;
  this.charge--;
  console.log(`${this.make} is going at ${this.speed} km/hr with a charge of ${this.charge}`);
}
const tesla = new EV('Tesla', 120, 23);

console.log(tesla);
tesla.chargeBattery(90);
console.log(tesla);
tesla.brake();
tesla.accelerate();


//// Inheritance Between "Classes": ES6 Classes

class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  calcAge() {
    console.log(2037 - this.birthYear);
  }

  greet() {
    console.log(`Hey ${this.fullName}`);
  }

  get age() {
    return this.calcAge();
  }

  set fullName(name) {
    this._fullName = name;
  }

  get fullName() {
    return this._fullName;
  }

  // Static Method
  static hey() {
    console.log('Hey There!!');
  }
}

class StudentCl extends PersonCl {
  constructor(fullName, birthYear, course) {
    // Always happens first
    super(fullName, birthYear);
    this.course = course;
  }

  introduce() {
    console.log(`My name is ${this.fullName} and I study ${this.course}`);
  };

  calcAge(){
    console.log(`I'm ${2037 - this.birthYear} years old, but as a student I feel more like ${2037 - this.birthYear + 10}`);
  }
}

const harsha = new StudentCl('Harshath', 2002, 'Software Engineering');
harsha.introduce();
harsha.calcAge();
console.log(StudentCl.hey());


//// Inheritance Between "Classes": Object.create
const PersonProto = {
  calcAge() {
    return 2037 - this.birthYear;
  },

  init(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(PersonProto);
const StudentProto = Object.create(PersonProto);

StudentProto.init = function(firstName, birthYear, course ){
  PersonProto.init.call(this, firstName, birthYear);
  this.course = course;
}

StudentProto.introduce = function(){
  console.log(`My name is ${this.fullName} and I study ${this.course}`);
}
const jay = Object.create(StudentProto);
jay.init('Jay', 2012, 'Computer Science');
jay.introduce();
console.log(jay.calcAge());
*/