// 'use-strict'

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
function calcAge(birthYear) { 
  const age = 2037 - birthYear;//function scope
  
  function printAge(){
    //it cannot access gloably
    let output = `${firstName}, You are ${age}, born in ${birthYear}`;
    console.log(output);

    if (birthYear >= 1981 && birthYear <= 1996) {
      var millenial = true;
      //creating new variable name same as outter scope variable
      output = "NEW OUTPUT!"; //reasssigng outer scope variable
      const firstName = "Steven"; //if variable is not present only it look for it is parent scope
      const str = `Oh, and you're a millenial, ${firstName}`;
      console.log(str);
    }

    function add(a, b){
      return a+b;
    }

    
    // console.log(str) it cannot be accessed becaues it is block scoped
    console.log(millenial) // it can be accessed because let and const only block scoped
    
    console.log(output)
  }


  printAge();

  // console(add(2,3)) // only if we are using use-strict mode function only block scoped otherwise fuctions are not block scoped 

  return age; //here we cannot access inner scope variable output
}

const firstName = 'Jonas';//global scope
calcAge(1991);

