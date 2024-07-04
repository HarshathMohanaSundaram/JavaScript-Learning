'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements) {
  containerMovements.innerHTML = '';

  movements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `<div class="movements__row">
                    <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
                    <div class="movements__value">${mov}€</div>
                  </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

displayMovements(account1.movements);

const calcDisplayBalance = function (movements) {
  const balance = movements.reduce((acc, mov) => acc + mov);
  labelBalance.textContent = `${balance} €`;
};

calcDisplayBalance(account1.movements);

const calcDisplaySummary = function (movements) {
  const income = movements
    .filter(mov => mov > 0)
    .reduce((tot, mov) => tot + mov, 0);
  labelSumIn.textContent = `${income}€`;

  const outgoing = movements
    .filter(mov => mov < 0)
    .reduce((tot, mov) => tot + mov, 0);
  labelSumOut.textContent = `${Math.abs(outgoing)}€`;

  const interest = movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * 1.2) / 100)
    .filter((int, _, arr) => {
      return int >= 1;
    })
    .reduce((amt, int) => amt + int, 0);
  labelSumInterest.textContent = `${interest}€`;
};

calcDisplaySummary(account1.movements);

const createUserNames = accs => {
  accs.forEach(acc => {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};

createUserNames(accounts);

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

/*
// SLICE
let arr = ['a', 'b', 'c', 'd', 'e'];
console.log(arr.slice(2));
console.log(arr.slice(2, 4));
console.log(arr.slice(-2));
console.log(arr.slice(-1));
console.log(arr.slice(1, -2));

// SPLICE
arr.splice(-1)
console.log(arr)
arr.splice(1,2)
console.log(arr);

// REVERSE
arr = ['a', 'b', 'c', 'd', 'e'];
let arr2 = ['j', 'i', 'h', 'g', 'f']
console.log(arr2.reverse());
console.log(arr2);

// CONCAT
const letters = arr.concat(arr2);
console.log(letters);
console.log([...arr, ...arr2]);

// JOIN
console.log(letters.join('*'));
*/

/*
const arr = [23, 11, 64];
console.log(arr[0]);
console.log(arr.at(0));
console.log(arr[arr.length - 1]);
console.log(arr.slice(-1)[0]);
console.log(arr.at(-1));
*/

/*
// forEach
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

//for (const movement of movements) {
for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`Movement ${i + 1}, You deposited ${movement}`);
  } else {
    console.log(`Movement ${i + 1}, You withdrew ${Math.abs(movement)}`);
  }
}

console.log('---- FOREACH ---------');
movements.forEach(function (mov, i, arr) {
  console.log('Array: ', arr);
  if (mov > 0) {
    console.log(`Movement ${i + 1}, You deposited ${mov}`);
  } else {
    console.log(`Movement ${i + 1}, You withdrew ${Math.abs(mov)}`);
  }
});
*/

/*
//MAP
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach(function (value, key) {
  console.log(`${key}: ${value}`);
});

//SET
const currenciesUnique = new Set(['USD', 'USD', 'GBP', 'EUR', 'EUR']);
console.log(currenciesUnique);

currenciesUnique.forEach(function(value){
  console.log(`${value}`);
})
*/

/*
// Coding Challenge 1
const juilaData1 = [3, 5, 2, 12, 7];
const juliadData2 = [9, 16, 6, 8, 3];

const kateData1 = [4, 1, 15, 8, 3];
const kateData2 = [10, 5, 6, 1, 4];

const checkDogs = function (dogsJulia, dogsKate) {
  const correctJuliaData = dogsJulia.slice();
  correctJuliaData.splice(0,1);
  correctJuliaData.splice(-2);
  // dogsJulia.slice(1,3)
  const wholeData = correctJuliaData.concat(dogsKate);

  wholeData.forEach(function (dog, i) {
    if (dog < 3) {
      console.log(`Dog ${i + 1} is still a puppy`);
    } else {
      console.log(`Dog ${i + 1} is an adult, and is ${dog} years old`);
    }
  });
};
console.log('---------------DATA 1-------------------');
checkDogs(juilaData1, kateData1);
console.log('---------------DATA 2------------------');
checkDogs(juliadData2, kateData2)
*/

/*
// Map
const euroToUsd = 1.1;

const movementsUsd = movementsAmount.map(amount => {
  return amount * euroToUsd;
});

const movementsUsdMapArrow = movements.map(amount => amount * euroToUsd);

console.log(movements);
console.log(movementsUsd);
console.log(movementsUsdMapArrow);

const movementsUsdfor = [];
for (const move of movements) movementsUsdfor.push(move * euroToUsd);

console.log(movementsUsdfor);

const movementsDescriptions = movements.map((mov, i) => {
  return `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdraw'} ${Math.abs(
    mov
  )}`;
});

console.log(movementsDescriptions);
*/

/*
// filter
const deposits = movements.filter(mov => mov > 0);
console.log(deposits);
const withdraws = movements.filter(mov => mov < 0);
console.log(withdraws);
*/

/*
//Reducer
/*
// reducer example
const balance = movements.reduce(function(accumalator, current, index, array){
  console.log(`Iteration ${index}: ${accumalator}`);
  return accumalator + current
}, 0); //Here is the intial accumalator value

const balance = movements.reduce((acc, cur) => {
  return acc + cur;
}, 0);

console.log(balance);

// Maximum value
const maxMovement = movements.reduce((max, curr) => {
  return max > curr ? max : curr
}, movements[0]);
console.log(maxMovement);
*/

/*
// Coding Challenge 2


const calcAverageHumanAge = (ages) => {
  const humanAges = ages.map((age) => age <= 2 ? 2 * age: 16 + age * 2);
  const adults = humanAges.filter((age) => age >= 18);
  const avgAges = adults.reduce((sum, age,_,arr) => sum + age/arr.length, 0);
  return avgAges;
}
console.log('---------------DATA 1------------------');
console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));

console.log('---------------DATA 2------------------');
console.log(calcAverageHumanAge([16, 6, ,10, 5, 6, 1, 4]));
*/

/*
// Chaining Methods
const euroToUsd = 1.1;

// PIPELINE
const totalDepositUsd = movements
  .filter(mov => mov > 0)
  .map(mov => mov * euroToUsd)
  .reduce((tot, mov) => tot + mov, 0);
console.log(totalDepositUsd);
*/
/*
// Coding Challeng 3
const calcAverageHumanAge = ages => {
  return ages
    .map(age => (age <= 2 ? 2 * age : 16 + age * 2))
    .filter(age => age >= 18)
    .reduce((sum, age, _, arr) => sum + age / arr.length, 0);
};
console.log('---------------DATA 1------------------');
console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));

console.log('---------------DATA 2------------------');
console.log(calcAverageHumanAge([16, 6, , 10, 5, 6, 1, 4]));
*/

/*
// Find Method
const firstWithdrawal = movements.find(mov => mov < 0);

console.log(movements);
console.log(firstWithdrawal);

console.log(accounts);

const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account);
*/