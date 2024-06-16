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


