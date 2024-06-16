'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },

  orderDelivery: function ({
    starterIndex = 1,
    mainIndex = 0,
    time = '20:00',
    address,
  }) {
    const [starter, main] = this.order(starterIndex, mainIndex);
    console.log(
      `Order Received! ${starter} and ${main} will be delivered to ${address} at ${time}`
    );
  },

  orderPasta: function (ing1, ing2, ing3) {
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