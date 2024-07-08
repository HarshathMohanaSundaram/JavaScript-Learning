'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2024-07-01T17:01:17.194Z',
    '2024-07-07T23:36:17.929Z',
    '2024-07-08T20:01:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-07-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
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

/////////////////////////////////////////////////
// Functions

const formattedCur = (value, locale, currency) => { return new Intl.NumberFormat(locale, {
  style: 'currency',
  currency: currency,
}).format(value) };

const formatMovementDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);

  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;
  // const day = `${date.getDate()}`.padStart(2, 0);
  // const month = `${date.getMonth() + 1}`.padStart(2, 0);
  // const year = date.getFullYear();

  // return `${day}/${month}/${year}`;

  return new Intl.DateTimeFormat(locale).format(date)
};

const displayMovements = function (account, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort
    ? account.movements.slice().sort((a, b) => a - b)
    : account.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(account.movementsDates[i]);
    const displayDate = formatMovementDate(date, account.locale);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedCur(
          mov,
          account.locale,
          account.currency
        )}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  const formattedMov = formattedCur(acc.balance, acc.locale, acc.currency)
  labelBalance.textContent = formattedMov;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formattedCur(incomes, acc.locale, acc.currency);

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = Math.abs(formattedCur(out, acc.locale, acc.currency));

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = formattedCur(interest, acc.locale, acc.currency);
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

///////////////////////////////////////
// Event handlers
let currentAccount;

// FAKE LOGIN
currentAccount = account1;
updateUI(currentAccount);
containerApp.style.opacity = 100;

// Internationalization API
const now = new Date();
const options = {
  hour: 'numeric',
  minute: 'numeric',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  weekday: 'long',
};

const locale = navigator.language
labelDate.textContent = new Intl.DateTimeFormat(locale, options).format(now);

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === +inputLoginPin.value) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Update UI
    updateUI(currentAccount);

    // Internationalization Date and Time
    const now = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      // weekday: 'long',
    };

    labelDate.textContent = new Intl.DateTimeFormat(currentAccount.locale, options).format(
      now
    );
    // // Create Current Date and Time
    // const now = new Date();
    // const day = `${now.getDate()}`.padStart(2, 0);
    // const month = `${now.getMonth() + 1}`.padStart(2, 0);
    // const year = now.getFullYear();
    // const hour = `${now.getHours()}`.padStart(2, 0);
    // const min = `${now.getMinutes()}`.padStart(2, 0);
    // labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    // Add transfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    setTimeout(function(){
      // Add movement
      currentAccount.movements.push(amount);

      // Add loan date
      currentAccount.movementsDates.push(new Date().toISOString());

      // Update UI
      updateUI(currentAccount);
    }, 2500);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

/*
//Numbers
console.log(23 === 23.0);
console.log(0.1 + 0.2); //0.30000000000000004
console.log(0.3 == (0.1+0.2)); //false

console.log(Number('23')); // 23 type number
console.log(+'23'); // 23 type number

//Parsing
console.log(Number.parseInt('45.00002'));// 45
console.log(Number.parseInt('30px')); // 30
console.log(Number.parseInt('e23')); // NaN

console.log(Number.parseFloat('45.00002'));// 45.00002
console.log(Number.parseFloat('30px')); // 30
console.log(Number.parseFloat('e23')); // NaN

// Check value is Not a Number
console.log(Number.isNaN(20)); // false
console.log(Number.isNaN('20')); // false
console.log(Number.isNaN(+'20X')); // true
console.log(Number.isNaN(23/0)); // false

console.log(Number.isFinite(20)); // true
console.log(Number.isFinite('20')); // false
console.log(Number.isFinite(+'20X')); // false
console.log(Number.isFinite(23/0)); // false


console.log(Number.isInteger(23)); // true
console.log(Number.isInteger(23.0)); // 
*/

/*
// Math and Rounding
console.log(Math.sqrt(25)); //5
console.log(25 ** (1 / 2)); // 5
console.log(8 ** (1 / 3)); // Cube root  output: 2

console.log(Math.max(5, 18, 23, 11, 2)); //23
console.log(Math.max(5, 18, '23', 11, 2)); //23
console.log(Math.max(5, 18, '23px', 11, 2)); //NaN

console.log(Math.min(5, 18, 23, 11, 2)); //2
console.log(Math.min(5, 18, '23', 11, 2)); //2
console.log(Math.min(5, 18, '23px', 11, 2)); //NaN

console.log(Math.PI); // 3.141592653589793
console.log(Math.PI * Number.parseFloat('10px') ** 2); // 314.1592653589793

console.log(Math.trunc(Math.random() * 6) + 1);

const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min) + 1) + min;
// 0...1 -> 0...(max-min) -> 0...(max-min) + min -> min...max
console.log(randomInt(10, 20));

// Round integers
console.log(Math.trunc(23.3)); // 23

console.log(Math.round(23.4)); // 23 (decimal 0 to 4)
console.log(Math.round(23.5)); // 24 (decimal 5 to 9)

console.log(Math.ceil(23.2)); // 24
console.log(Math.ceil(23.9)); // 24

console.log(Math.floor(23.2)); // 23
console.log(Math.floor(23.9)); // 23
console.log(Math.floor('23.9')); // 23


console.log(Math.trunc(-23.3)); // -23
console.log(Math.floor(-23.4)); // -24
console.log(Math.ceil(-23.7)); // -23

// rounding decimals
console.log((2.7).toFixed(0)); // 3 - string
console.log((2.345).toFixed(2)); // 2.35 - string
console.log((2.3799).toFixed(2)); // 2.38 - string
console.log(+(2.345).toFixed(2)); // 2.35 - Number
*/

/*
labelBalance.addEventListener('click', () => {
  [...document.querySelectorAll('.movements__row')].forEach((row, i) => {
    if (i % 2 == 0) row.style.backgroundColor = 'orangered';
    if (i % 3 == 0) row.style.backgroundColor = 'blue';
  });
});
*/

/*
// Numeric Separators

//287,460,000,000
const diameter = 287_460_000_000;
console.log(diameter);

const price = 345_99;
console.log(price);

const transferFee1 = 15_00;// 1500
const transferFee2 = 1_500;// 1500

const PI = 3.14_15
console.log(PI); 

console.log(Number('230_000'));// NaN
console.log(parseInt('230_000'));// 230
*/

/*
// BigInt
console.log(2 ** 53 - 1); // 9007199254740991
console.log(Number.MAX_SAFE_INTEGER); // 9007199254740991
console.log(2 ** 53 + 1); // 9007199254740992
console.log(2 ** 53 + 2); // 9007199254740994
console.log(2 ** 53 + 3); // 9007199254740996
console.log(2 ** 53 + 4); // 9007199254740996

console.log(78837478634987678684598646856898948544); // 7.883747863498768e+37
console.log(78837478634987678684598646856898948544n); // 78837478634987678684598646856898948544n
console.log(BigInt(78837478634987678684598646856898948544)); // 78837478634987683013741142304303874048n

// Operations
console.log(10000n + 10000n); // 20000n
console.log(9758893453896943868456845689549498898595949n * 1000000000000n); //9758893453896943868456845689549498898595949000000000000n

const huge = 8758743679869598n;
const num = 23
//console.log(huge + num); // Uncaught TypeError: can't convert BigInt to number
console.log(huge + BigInt(num)); // 8758743679869621n

// Exceptions
console.log(20n > 15); // true
console.log(20n === 20); // false
console.log(20n == 20); // true
console.log(typeof 20n); // bigint

console.log(huge + ' is REALLY big!!!!'); // 8758743679869598 is REALLY big!!!!

// Divisions
console.log(10n/3n); // 3n
console.log(11n / 3n); // 3n
*/

/*
// Creating Date
const now = new Date();
console.log(now);

console.log(new Date('Tue Jul 02 2022 1:56:20'));

console.log(new Date('May 17 2002'));

console.log(new Date(account1.movementsDates[0]));

console.log(new Date(2037, 11, 19, 15, 23, 5)); // Here month is zero based we need give month - 1

console.log(new Date(2037, 10, 40)); // it auto correc the data

console.log(new Date(0));
console.log(new Date(3 * 24 * 60 * 60 * 1000));

// working with dates
const future = new Date(2037, 10, 19, 15, 23);
console.log(future);
console.log(future.getFullYear());
console.log(future.getMonth());
console.log(future.getDate());
console.log(future.getDay());
console.log(future.getHours());
console.log(future.getMinutes());
console.log(future.getSeconds());
console.log(future.getMilliseconds());
console.log(future.toISOString());
console.log(future.getTime());

console.log(new Date(2142237180000));

console.log(Date.now());

future.setFullYear(2040);

console.log(future)
*/

/*
// Operation With Dates
const future = new Date(2037, 10, 19, 15, 23);
console.log(+future);

const calcDaysPassed = (date1, date2) =>
  Math.abs(date2 - date1) / (1000 * 60 * 60 * 24);

const days1 = calcDaysPassed(
  new Date(2037, 3, 4),
  new Date(2037, 3, 14, 10, 8)
); // date library moment.js
console.log(days1);
*/

/*
const num = 658933.65

const option = {
  style: 'currency',
  unit: 'celsius',
  currency: 'EUR',
}

console.log('US: ',new Intl.NumberFormat('en-US',option).format(num));
console.log('Germany: ', new Intl.NumberFormat('en-DE', option).format(num));
console.log('Syria: ', new Intl.NumberFormat('ar-SY', option).format(num));
console.log('Browser: ', new Intl.NumberFormat(navigator.language, option).format(num));
*/

/*
// Set timout and Interval
// setTimeOut
const ingrdients = ['olives', 'spinar']
const pizzaTimer  = setTimeout((ing1, ing2)=>console.log(`Here your pizza with ${ing1} and ${ing2}`), 3000, ...ingrdients);
console.log('Waiting');

if (ingrdients.includes('spinach')) clearTimeout(pizzaTimer);

// setInterval
setInterval(function(){
  const now = new Date();
  console.log(now.getHours(), ':', now.getMinutes(), ':', now.getSeconds())
}, 1000);
*/