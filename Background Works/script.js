//scope and scope chain
const myName = 'Jonas';

function first(){
  const  age = 30;

  if (age >= 30){
    const decade = 3; //block scope only applied to let and const
    var millenial = true //var not applicable for block scope
  }

  function second(){
    const job = 'teacher';

    console.log(`${myName} is a ${age} - old ${job}`); //the variable of parent scope can be accessed
  }

  second();
}

//job and decade are sibiling scope for first cannot be accessed by each other

//decade and job are child scope to parent first it cannot be accessed by first

first();


