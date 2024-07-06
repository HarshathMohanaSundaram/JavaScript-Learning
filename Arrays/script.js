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

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a > b) : movements;

  movs.forEach(function (mov, i) {
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

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov);
  labelBalance.textContent = `${acc.balance} €`;
};

const calcDisplaySummary = function (acc) {
  const income = acc.movements
    .filter(mov => mov > 0)
    .reduce((tot, mov) => tot + mov, 0);
  labelSumIn.textContent = `${income}€`;

  const outgoing = acc.movements
    .filter(mov => mov < 0)
    .reduce((tot, mov) => tot + mov, 0);
  labelSumOut.textContent = `${Math.abs(outgoing)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter(int => int >= 1)
    .reduce((amt, int) => amt + int, 0);
  labelSumInterest.textContent = `${interest}€`;
};

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

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc.movements);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

// Event Handlers
let currentAccount;

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome Back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputTransferAmount.value);
  const receiverAccount = accounts.find(
    acc => acc.username === inputTransferTo.value
  );

  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAccount &&
    currentAccount.balance >= amount &&
    receiverAccount?.username !== currentAccount.username
  ) {
    currentAccount.movements.push(-amount);
    receiverAccount.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add the movement
    currentAccount.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }

  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );

    // Delete UI
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputClosePin.value = inputCloseUsername.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

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

/*
// Some and every

// SOME

console.log(movements);

// EQUALITY
console.log(movements.includes(-130));

// CONDITION
console.log(movements.some(mov => mov === -130));

const anyDeposit = movements.some(mov => mov > 40000);
console.log(anyDeposit);

// EVERY
console.log(movements.every(mov => mov > 0));
console.log(account4.movements.every(mov => mov > 0));
*/

/*
// Flat and FlatMap
const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arr.flat());

const arrDeep = [
  [1, [2, 3]],
  [4, [5, 6], 7, 8],
];
console.log(arrDeep.flat());
console.log(arrDeep.flat(2));

const accountMovements = accounts.map(acc => acc.movements);
console.log(accountMovements);
const allMovements = accountMovements.flat();
console.log(allMovements);
// const overalBalance = allMovements.reduce((tot, mov) => tot + mov, 0);
// console.log(overalBalance);

// const overalBalance = accounts
//   .map(acc => acc.movements)
//   .flat()
//   .reduce((tot, mov) => tot + mov, 0);
// console.log(overalBalance);

// flatMap
const overalBalance = accounts
  .flatMap(acc => acc.movements)
  .reduce((tot, mov) => tot + mov, 0);
console.log(overalBalance);
*/

/*
// Sorting Arrays

// Strings
const owners = ['Jonas', 'Deepa', 'Zack', 'Avana'];
console.log(owners.sort());
console.log(owners);

// Numbers
console.log(movements);

movements.sort((a, b) => a > b);
console.log(movements);

movements.sort((a, b) => a < b);
console.log(movements);

movements.sort((a, b) => a - b);
console.log(movements);

movements.sort((a, b) => b - a);
console.log(movements);
*/

/*

// Empty arrays and Fill method
const x = new Array(7);
console.log(x);
console.log(x.map(() => 5)); // Not update the value

// x.fill(1);
// console.log(x);

x.fill(1, 3, 5); // 1-> value, 3 -> start index,  5 -> end index + 1
console.log(x);

const arr = [1, 2, 3, 4, 5, 6, 7];

arr.fill(23, 4, 6);
console.log(arr);

// Array.from
const y = Array.from({ length: 7 }, () => 1);
console.log(y);

const z = Array.from({length: 7}, (_, i) => i + 1)
console.log(z);



labelBalance.addEventListener('click', function(){
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    ele => Number(ele.textContent.replace('€', ''))
  );

  console.log(movementsUI);
})
*/

/*
// Array Methods Practice
//1.
const bankDepositSum = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov > 0)
  .reduce((tot, dep) => tot + dep, 0);
console.log(bankDepositSum);

//2.
//2a.
const numDeposits1000 = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov >= 1000).length;
console.log(numDeposits1000);

//2b.
const numDeposits1000Reduce = accounts
  .flatMap(acc => acc.movements)
  .reduce((count, dep) => (dep >= 1000 ? ++count : count), 0);
console.log(numDeposits1000Reduce);

//3.
const { deposits, withdrawals } = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (sum, cur) => {
      // cur > 0 ? sum.deposits+=cur : sum.withdrawals+=cur;
      sum[cur > 0 ? 'deposits' : 'withdrawals'] += cur;
      return sum;
    },
    { deposits: 0, withdrawals: 0 }
  );

console.log(deposits, withdrawals);

//4.
// this is a nice titile => This Is a Nice Title
const convertTitleCase = function (title) {
  const captialize = str => str[0].toUpperCase() + str.slice(1);
  const expections = ['a', 'an', 'the', 'but', 'and', 'or', 'on', 'in', 'with'];

  const titleCase = title
    .toLowerCase()
    .split(' ')
    .map(word =>
      expections.includes(word) ? word : captialize(word)
    )
    .join(' ');
  return captialize(titleCase);
};

console.log(convertTitleCase('this is a nice titile'));
console.log(convertTitleCase('LONG LONG a title but not a sentence'));
console.log(convertTitleCase('and here is another title with an EXAMPLE'));
*/

/*
// Coding Challenge 4
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

// task 1: Create add node recommenedFoo -> curFood ** 0.75 * 0.28;
dogs.forEach(
  dog => (dog.recommendedFood = Math.trunc(dog.weight ** 0.75 * 28))
);
console.log(dogs);

// task 2: Find Sarah Dogs and log its eat too much or too little
const dogSarah = dogs.find(dog => dog.owners.includes('Sarah'));
console.log(dogSarah);
console.log(
  `Sarah's dog is eating too ${
    dogSarah.curFood > dogSarah.recommendedFood ? 'much' : 'little'
  } `
);

// task 3: array containng owners name separation based on eats too much too little
const ownersEatTooMuch = dogs
  .filter(dog => dog.curFood > dog.recommendedFood)
  .flatMap(dog => dog.owners);
console.log(ownersEatTooMuch);

const ownersEatTooLittle = dogs
  .filter(dog => dog.curFood < dog.recommendedFood)
  .flatMap(dog => dog.owners);
console.log(ownersEatTooLittle);

// task 4: Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much"!
console.log(`"${ownersEatTooMuch.join(' and ')}'s dogs eat too much"!`);
console.log(`"${ownersEatTooLittle.join(' and ')}'s dogs eat too little"!`);

// task 5: find any dog eactly eat recommended food
console.log(dogs.some(dog => dog.curFood == dog.recommendedFood));

// task 6: find dog eat okay recommened food
const checkEatingOkay = function (dog) {
  return dog.curFood > dog.recommendedFood * 0.9 &&
    dog.curFood < dog.recommendedFood * 1.1;
};

console.log(dogs.some(checkEatingOkay));

// task 7: create array of dog eating okay
const dogsEatingOkay = dogs.filter(checkEatingOkay)
console.log(dogsEatingOkay);

// task 8. create array with dogs object whose recommendedFood in ascending order
//1
const dogsSortRecFood1 = dogs.slice().sort((a,b) => a.recommendedFood - b.recommendedFood);
//2
const dogsSortRecFood2 = dogs.slice().sort(
  (a, b) => a.recommendedFood > b.recommendedFood
);
console.log(dogsSortRecFood1);
console.log(dogsSortRecFood2);
*/