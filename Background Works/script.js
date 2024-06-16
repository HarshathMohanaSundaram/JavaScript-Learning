"use-strict";

// //scope and scope chain
// const myName = 'Jonas';

// function first(){
//   const  age = 30;

//   if (age >= 30){
//     const decade = 3; //block scope only applied to let and const
//     var millenial = true //var not applicable for block scope
//   }

//   function second(){
//     const job = 'teacher';

//     console.log(`${myName} is a ${age} - old ${job}`); //the variable of parent scope can be accessed
//   }

//   second();
// }

// //job and decade are sibiling scope for first cannot be accessed by each other

// //decade and job are child scope to parent first it cannot be accessed by first

// first();

// //anohter example
// const a = 'jonas';

// function first() {
//   const b = 'Hello';
//   second();

//   function second(){
//     const c = 'Hi';
//     third();
//   }
// }

// function third(){
//   const d = 'Hey!';
//   console.log(d+c+b+a);
//   //show reference error
// }

//callstack - third(4) -> second(3) -> first(2) -> global(1)
// Here function second is lexical scoping with first so second cannot access global so second can access all the variable is first
// third is global sibiling to first
// so it cannnot access first and second variables
// so callstack cannot affect scope chain

//Scope Practice
//function is global scope
// function calcAge(birthYear) {
//   const age = 2037 - birthYear; //function scope

//   function printAge() {
//     //it cannot access gloably
//     let output = `${firstName}, You are ${age}, born in ${birthYear}`;
//     console.log(output);

//     if (birthYear >= 1981 && birthYear <= 1996) {
//       var millenial = true;
//       //creating new variable name same as outter scope variable
//       output = "NEW OUTPUT!"; //reasssigng outer scope variable
//       const firstName = "Steven"; //if variable is not present only it look for it is parent scope
//       const str = `Oh, and you're a millenial, ${firstName}`;
//       console.log(str);
//     }

//     function add(a, b) {
//       return a + b;
//     }

//     // console.log(str) it cannot be accessed becaues it is block scoped
//     console.log(millenial); // it can be accessed because let and const only block scoped

//     console.log(output);
//   }

//   printAge();

//   // console(add(2,3)) // only if we are using use-strict mode function only block scoped otherwise fuctions are not block scoped

//   return age; //here we cannot access inner scope variable output
// }

// const firstName = "Jonas"; //global scope
// calcAge(1991);

//Variable Environment Hoisting and Temporal Dead Zone (TDZ)

// console.log(me); //Undefined
// console.log(job); //ReferenceError: can't access lexical declaration 'job' before initialization
// console.log(year); //ReferenceError: can't access lexical declaration 'year' before initialization

// var me = 'Jonas';
// let job = 'teacher';
// const year = 1991;

//Functions
// console.log(addDecl(2, 3)); // It is accessible
// console.log(addArrow(2, 3)); // it throws typeerror and show erro it is not function
// console.log(addExpr(2, 3)); // it is declared in const so it in temperol dead zone before initialization throw reference error

// function addDecl(a, b) {
//   return a + b;
// }

// const addExpr = function (a, b) {
//   return a + b;
// };

// var addArrow = (a, b) => a + b;

//Example
// if(!numProducts) deleteShoppingCart();// here var is hoisted and set undefined so it calls function it is not a good practice to declare variable in var

// var numProducts = 10;

// function deleteShoppingCart(){
//   console.log('All products deletedQ')
// }

// var x=1;
// let y=2;
// const z=3;

// console.log(x===window.x);
// console.log(y === window.y);
// console.log(z === window.z);

// `this` keyword

// console.log(this);

// const calcAge = birthYear => {
//   console.log(2037-birthYear)
//   console.log(this);
// }

// calcAge(1991);

// const jonas = {
//   year: 1991,
//   calcAge: function () {
//     console.log(this);
//     console.log(2037 - this.year);
//   },
// };

// jonas.calcAge();

// const harsha = {
//   year: 2017,
// };

// harsha.calcAge = jonas.calcAge;

// harsha.calcAge();

// const f = jonas.calcAge;

// f();

// var firstName = "Harsha";

// const jonas = {
//   firstName: "Jonas",
//   year: 1991,
//   calcAge: function () {
//     console.log(this);
//     console.log(2037 - this.year);
//     //using this child scope solution 1
//     // const self = this;
//     // const isMillenial = function () {
//     //   console.log(self.year >= 1981 && self.year <= 1996);
//     // };

//     //solution 2
//     const isMillenial = () => {
//       console.log(this.year >= 1981 && this.year <= 1996);
//     };

//     isMillenial();
//   },

//   // greet: () => {
//   //   console.log(this);
//   //   console.log(`Hey ${this.firstName}`); //arrow function does not have its own `this` it access it from parent scope
//   // },
//   greet: function () {
//     console.log(this);
//     console.log(`Hey ${this.firstName}`);
//   },
// };

// jonas.greet();
// jonas.calcAge();

// //arguments keyword

// const addExpr = function (a, b) {
//   console.log(arguments);
//   return a + b;
// };

// const addArrow = (a, b) => {
//   // console.log(arguments);// It is not accessible in arrow function
//   return a + b;
// };

// addExpr(2,4);
// addExpr(2,4,5,7);
// addArrow(2, 5);

//Primitive vs Objects(Reference)

//Primitive types
let lastName = "Williams";
let oldLastName = lastName;
lastName = "Davis";
console.log(lastName, oldLastName);

//Referece types
const jessica = {
  firstName: "Jessica",
  lastName: "Williams",
  age: 27,
};

const marriedJessica = jessica;
marriedJessica.lastName = "Davis";

console.log("Before Marriage", jessica);
console.log("After Marriage", marriedJessica);

//Copying Objects
const jessica2 = {
  firstName: "Jessica",
  lastName: "Williams",
  age: 27,
  family: ["Alice", "Bob"],
};

const jessicaCopy = Object.assign({}, jessica2);
jessicaCopy.lastName = "Davis";

jessicaCopy.family.push("Mary");
jessicaCopy.family.push("John");

console.log("Before Marriage", jessica2);
console.log("After Marriage", jessicaCopy);
