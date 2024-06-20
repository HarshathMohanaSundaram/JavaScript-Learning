'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
const weekDays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
const openingHours = {
  [weekDays[3]]: {
    open: 12,
    close: 22,
  },
  [weekDays[4]]: {
    open: 11,
    close: 23,
  },
  [weekDays[5]]: {
    open: 0, // Open 24 hours
    close: 24,
  },
};

const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],
  openingHours,
  order(starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  orderDelivery({ starterIndex = 1, mainIndex = 0, time = '20:00', address }) {
    const [starter, main] = this.order(starterIndex, mainIndex);
    console.log(
      `Order Received! ${starter} and ${main} will be delivered to ${address} at ${time}`
    );
  },

  orderPasta(ing1, ing2, ing3) {
    console.log(
      `Here is your delicious pasta with ${ing1}, ${ing2} and ${ing3}`
    );
  },

  orderPizza: function (mainIngredient, ...otherIngredient) {
    console.log(mainIngredient);
    console.log(otherIngredient);
  },
};

/*
//////////////////////////////////////////////////////////////////////////////////////
// String Practice
console.log(flights.split('+'));

const getCode = str => str.slice(0,3).toUpperCase()

for(const flight of flights.split('+')){
  const[type, from, to, time] = flight.split(';');
  
  const output = `${type.startsWith('_Delayed') ? ':( ':''}${type.replaceAll('_', ' ')} ${getCode(from)} ${getCode(to)} (${time.replace(':','h')})`.padStart(36);

  console.log(output);

}
//////////////////////////////////////////////////////////////////////////////////////
*/

/////////////////////////////////////////////////////////////////////////////////////
// Strings

/*
// Part 1
const airline = 'TAP Air Portuagal';
// const plane = 'A320';

// console.log(plane[0]);
// console.log(plane[1]);
// console.log(plane[2]);
console.log('B737'[0]);
console.log(airline.length);
console.log('B737'.length);

console.log(airline.indexOf('r'));
console.log(airline.lastIndexOf('r'));
console.log(airline.indexOf('Portuagal'));
console.log(airline.indexOf('portuagal'));

console.log(airline.slice(4));
console.log(airline.slice(4, 7));


console.log(airline.slice(0, airline.indexOf(' ')));
console.log(airline.slice(airline.lastIndexOf(' ')+1));

console.log(airline.slice(-2));
console.log(airline.slice(1, -1));



const checkMiddleSeat = function(seat) {
  // B and E are Middle seat

  const s = seat.slice(-1);
  if (s==='B' || s==='E')
    console.log('You got the middle seat');
  else  console.log('You got lucky');
}

checkMiddleSeat('11B');
checkMiddleSeat('23C');
checkMiddleSeat('3E');

console.log(new String('Harshath'));
console.log(typeof new String('Harshath'));
console.log(typeof new String('Harshath').slice(1));
*/

/*
// Part 2
console.log(airline.toLowerCase());
console.log(airline.toUpperCase());

// Fix captialization
const passenger = 'hArsHath';

const passengerLower = passenger.toLowerCase();
const passengerCorrect = passengerLower[0].toUpperCase()+passengerLower

console.log(passengerCorrect);

const email = 'hello@harsha.com';
const loginEmail = '  Hello@Harsha.Com\n';

// const lowerEmail = loginEmail.toLowerCase();
// const trimmedEmail = lowerEmail.trim();

// console.log((trimmedEmail));


const normalizedEmail = loginEmail.toLowerCase().trim();

console.log(normalizedEmail);

console.log(email === normalizedEmail);

const priceGB = '288,97*';
const priceUs = priceGB.replace('*', '$').replace(',','.');
console.log(priceUs);

const announcement = 'All passengers come to boarding door 23. Boarding door 23!'

console.log(announcement.replace('door', 'gate'));
console.log(announcement.replaceAll('door', 'gate'));

const plane = 'Airbus A320neo';
console.log(plane.includes('A320'));
console.log(plane.includes('Boeing'));
console.log(plane.includes('Air'));

if(plane.startsWith('Airbus') && plane.endsWith('neo')) {
  console.log('Part of the new airbus family');
}

// Practice
const checkBaggage = function(items){
 const baggage = items.toLowerCase();
 if(baggage.includes('knife') || baggage.includes('gun')){
  console.log('You are NOT allowed on board');
 }
 else{
  console.log('Welcome aboard!');
 }
}
checkBaggage('I have a laptop, some Food and a pocket Knife');
checkBaggage('socks and camera');
checkBaggage('Got some snacks and gun for protection');
*/
/*
// Part 3
console.log('a+very+nice+string'.split('+'));
console.log('Harshath Mohana Sundaram'.split(' '));

const [firstName, lastName] = 'Harshath Mohanasundaram'.split(' ');

const newName = ['Mr.', firstName, lastName.toUpperCase()].join(' ');
console.log(newName);

const captializeName = function (name) {
  const names = name.split(' ');
  const capName = [];
  for (const n of names) {
    //capName.push(n[0].toUpperCase()+n.slice(1));
    capName.push(n.replace(n[0], n[0].toUpperCase()));
  }

  console.log(capName.join(' '));
};

captializeName('jessica ann smith davis');

// Padding
const message = 'Go to gate 23!';
console.log(message.padStart(23, '+').padEnd(35, '+'));
console.log('Harshath'.padStart(20, '+').padEnd(35, '+'));

const maskCreditCard = function(number){
  const str = number + '';
  const last = str.slice(-4);
  return last.padStart(str.length, '*')
}

console.log(maskCreditCard(423448949588949899));
console.log(maskCreditCard('787876754654789567856876987896598'));

//Repeat
const message2 = 'Bad weather... All Departures Delayed... ';
console.log(message2.repeat(5));


const planeInLine = function(n) {
  console.log(`There are ${n} planes in line ${':(   '.repeat(n)}`);
}

planeInLine(5);
planeInLine(3);
planeInLine(12);
*/
////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////
// Maps
/* Fundamentals
const rest = new Map();
rest.set('name', 'Classico');
rest.set(1, 'Italy')
console.log(rest.set(2, 'Rome'))

rest.set('categories',['Italian', 'Chinese', 'Indian'])
    .set('open', 11)
    .set('close', 23)
    .set(true, 'We are open')
    .set(false, 'We are closed')

console.log(rest.get('name'));;
console.log(rest.get(true));
console.log(rest.get(1));

const time = 21;
console.log(rest.get(time > rest.get('open') && time < rest.get('close')));

console.log(rest.has('categories'));
const arr = [1,2];
rest.set(arr, 'test');

rest.set(document.querySelector('h1'), 'Heading')
rest.delete(2);
console.log((rest));
console.log(rest.size);

console.log(rest.get(arr));
*/

/*
// Iterartion
const question = new Map([
  ['question', 'What is best programming Language in the worlds'],
  [1, 'C'],
  [2, 'Java'],
  [3, 'Javascript'],
  ['correct', 3],
  [true, 'Correct'],
  [false, 'Try again']
]);
console.log(question);

//Convert Objects to Maps
console.log(Object.entries(openingHours));
const hoursMap = new Map(Object.entries(openingHours));
console.log(hoursMap);


//Quiz app
console.log(question.get('question'));
for (const [key, value] of question) {
  if (typeof key === 'number') console.log(`Answer ${key}: ${value}`);
}

const answer = 3
console.log(answer);

console.log(question.get(answer === question.get('correct')))

//Convert Map to array
console.log([...question]);
console.log([...question.keys()]);
console.log([...question.values()]);
////////////////////////////////////////////////////////////////////////////////////
*/

/*
///////////////////////////////////////////////////////////////////////////////////
// Sets

const orderSet = new Set(['Pasta', 'Pizza', 'Risotto', 'Pizza', 'Pasta'])
console.log(orderSet);

console.log(new Set('Jonas'));

console.log(orderSet.size);

console.log(orderSet.has('Pizza'));
console.log(orderSet.has('Bread'));

orderSet.add('Garlic Bread');
orderSet.add('Garlic Bread');

orderSet.delete('Risotto');

console.log(orderSet);

for(const order of orderSet) console.log(order);


// Example

const staff = ['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter'];

const staffUnique =[...new Set(staff)]
console.log(staffUnique);
console.log(new Set(['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter']).size);
console.log(new Set('harshath').size);
///////////////////////////////////////////////////////////////////////////////////
*/

/*
/////////////////////////////////////////////////////////////////////////////////
// Looping Objects

const properties = Object.keys(openingHours);
console.log(properties);

let openStr = `We are open on ${properties.length} days: `

for(const day of properties) openStr += `, ${day}`;

console.log(openStr);

const values = Object.values(openingHours);
console.log(values);

//Entrie object
const entries = Object.entries(openingHours)

console.log(entries);

for(const [key, {open, close}] of entries) console.log(`On ${key} we open at ${open} and close at ${close}`);;
/////////////////////////////////////////////////////////////////////////////////
*/

/*
///////////////////////////////////////////////////////////
// Optional Chaining
//normal

if(restaurant.openingHours.mon) console.log(restaurant.openingHours.mon.open);

// using optional chaining
console.log(restaurant.openingHours.mon?.open);

const days = weekDays;

for(const day of days) {
  const open = restaurant.openingHours[day]?.open ?? 'closed';
  console.log(`On ${day}, we open at ${open}`);
}

//Methods
console.log(restaurant.order?.(0,1) ?? 'Methods does not exist');
console.log(restaurant.orderRiscoto?.(0,1) ?? 'Methods does not exist');

//Array
const users = [
  {name: 'Jonas', email: 'hello@jonas.com'}
];

console.log(users[0]?.name ?? 'User array is empty');

///////////////////////////////////////////////////////////
*/

/*
//////////////////////////////////////////////////////////////////////
// for-of loop
const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];

for (const item of menu) console.log(item);

for (const [i, e] of menu.entries()) {
  console.log(`${i+1}: ${e}`)
}
//////////////////////////////////////////////////////////////////////
*/

/*
////////////////////////////////////////////////////////////////////
// Logical Assignment Operator
const rest1 = {
  name: 'Capri',
  numGuests: 0,
};

const rest2 = {
  name: 'La Pizza',
  owner: 'Basil'
};


// OR assignment Operator
// rest1.numGuests =  rest1.numGuests || 10;
// rest2.numGuests = rest2.numGuests || 10;

// rest1.numGuests ||= 10;
// rest2.numGuests ||=10;

rest1.numGuests ??= 10;
rest2.numGuests ??= 10;

// rest1.owner = rest1.owner && '<ANONYMOUS>';
// rest2.owner = rest2.owner && '<ANONYMOUS>';

rest1.owner &&= '<ANONYMOUS>';
rest2.owner &&= '<ANONYMOUS>';


console.log(rest1);
console.log(rest2);
////////////////////////////////////////////////////////////////////////////
*/

/*
///////////////////////////////////////////////////////////////////////////
// Nullish Coalescing Operator(??)
restaurant.numGuests = 0;
const guests = restaurant.numGuests || 10;
console.log(guests);

const guestCorrect = restaurant.numGuests ?? 10;
console.log(guestCorrect);
//////////////////////////////////////////////////////////////////////////
*/

/*
///////////////////////////////////////////////////////////////////////////
// Short Circuiting (&& and ||)

console.log('------------OR------------------------------');
// use ANY data type, return ANY data type
console.log(3 || 'Jonas');
console.log('' || 'Jonas');
console.log(true || 0);
console.log(undefined || null);
console.log(undefined || 0 || '' || 'Hello' || 23 || null);

const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
console.log(guests1);

const guests2 = restaurant.numGuests || 10;
console.log(guests2);

console.log('------------------AND---------------------------');
console.log(0 && 'Jonas');
console.log(7 && 'Jonas');

console.log('Hello' && 23 && null && 'jonas');

//example
if (restaurant.orderPizza) {
  restaurant.orderPizza('mushrooms', 'spinashc');
}

restaurant.orderPizza && restaurant.orderPizza('mushrooms', 'spinach');

//////////////////////////////////////////////////////////////////////////
*/

/*
////////////////////////////////////////////////////////////////////////
// Rest Pattern and parameters

// Destructuring
const [a, b, ...others] = [1, 2, 3, 4, 5];

console.log(a, b, others);

const [pizza, , risotto, ...otherFood] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
];
console.log(pizza, risotto, otherFood);

// Objects
const { sat, ...weekdays } = restaurant.openingHours;
console.log(weekdays);

// Functions
const add = function (...numbers) {
  console.log(numbers);
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  console.log(sum);
};

add(2, 3);
add(5, 3, 7, 2);
add(8, 2, 5, 3, 2, 1, 4);

const x = [23, 5, 7];
add(...x);

restaurant.orderPizza('mushrooms', 'onion', 'olivers', 'spinich');

restaurant.orderPizza('mushrooms');

///////////////////////////////////////////////////////////////////////
*/

/*
/////////////////////////////////////////////////////////////////////
// Spread Operator
const arr = [7, 8, 9];
const badNewArr = [1, 2, arr[0], arr[1], arr[2]];
console.log(badNewArr);

const newArr = [1, 2, ...arr];
console.log(newArr);

console.log(...newArr);

const newMenu = [...restaurant.mainMenu, 'Gnocci'];
console.log(newMenu);

// Copy Array
const mainMenuCopy = [...restaurant.mainMenu];

//Join 2 Arrays
const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];
console.log(menu);

// Iterables: arrays, strings, maps, sets, NOT objects
const str = 'Jonas';

const letters = [...str, ' ', 'S.'];
console.log(letters);
console.log(...str);

// Real World Example
const ingredients = [prompt("Let's make pasta! Ingredient !?"), prompt('Inredient 2?'), prompt('Ingredient 3?')];


// restaurant.orderPasta(...ingredients)


//Objects
const newRestaurant = {...restaurant, founder: 'Harshath', foundedIn: '2024'};
console.log(newRestaurant);

//shallow copy
const restaurantCopy = {...restaurant}
restaurantCopy.name = 'One Fine Day';
console.log(restaurantCopy.name, restaurant.name);
/////////////////////////////////////////////////////////////////////////
*/

/*
/////////////////////////////////////////////////////////////////
// Destructuring Objects
restaurant.orderDelivery({
  time: '22:30',
  address: 'via del sole, 21',
  mainIndex: 2,
  starterIndex: 2,
});

restaurant.orderDelivery({
  address: 'via del sole, 21',
  starterIndex: 2
});
const { name, openingHours, categories } = restaurant;
console.log(name, openingHours, categories);

const {
  name: restaurantName,
  openingHours: hours,
  categories: tags,
} = restaurant;

console.log(restaurantName, hours, tags);

const { menu = [], starterMenu: starters = [] } = restaurant;
console.log(menu, starters);

// Mutating variables
let a = 111;
let b = 999;
const obj = { a: 23, b: 7, c: 14 };
({ a, b } = obj);
console.log(a, b);

// Nested Objects

const {
  fri: { open: o, close: c },
} = openingHours;

console.log(o, c);
///////////////////////////////////////////////////////////////////
*/

/* Destructring Arrays
///////////////////////////////////////////////////////////////////////
const arr = [2,3,4];
const [a,b,c] = arr;
console.log(a,b,c);
console.log(arr);

let [main, ,secondary] = restaurant.categories;
console.log(main, secondary);

// Switching variables
// const temp = main;
// main = secondary;
// secondary = temp;

[main, secondary] = [secondary, main]
console.log(main, secondary);

const[starter, mainCourse] = restaurant.order(2, 0)
console.log(starter, mainCourse)

// Nested Destructuring
const nested = [2, 4, [5, 6]];

// const [i,,j] = nested;

const [i, , [j,k]] = nested;
console.log(i, j, k);

//Default values
const[p=1,q=1,r=1] = [0,9];
console.log(p, q, r);
////////////////////////////////////////////////////////////////
*/
