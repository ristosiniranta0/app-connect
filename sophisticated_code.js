/*
   Filename: sophisticated_code.js
   Purpose: A complex and sophisticated JavaScript code demonstrating various advanced concepts and functionalities.
*/

// Define a class representing a Person
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  introduce() {
    console.log(`My name is ${this.name} and I am ${this.age} years old.`);
  }
}

// Create instances of the Person class
const person1 = new Person("John", 28);
const person2 = new Person("Alice", 32);

person1.introduce();  // Output: My name is John and I am 28 years old.
person2.introduce();  // Output: My name is Alice and I am 32 years old.

// Define a class representing a Book
class Book {
  constructor(title, author, year) {
    this.title = title;
    this.author = author;
    this.year = year;
  }

  getBookInfo() {
    return `${this.title} by ${this.author}, published in ${this.year}.`;
  }
}

// Create instances of the Book class
const book1 = new Book("The Great Gatsby", "F. Scott Fitzgerald", 1925);
const book2 = new Book("To Kill a Mockingbird", "Harper Lee", 1960);

console.log(book1.getBookInfo());  // Output: The Great Gatsby by F. Scott Fitzgerald, published in 1925.
console.log(book2.getBookInfo());  // Output: To Kill a Mockingbird by Harper Lee, published in 1960.

// Define a function to calculate the factorial of a number using recursion
function factorial(n) {
  if (n <= 1) {
    return 1;
  } else {
    return n * factorial(n - 1);
  }
}

console.log(factorial(5));  // Output: 120

// Create an array of numbers
const numbers = [2, 4, 6, 8, 10];

// Use higher-order functions to perform operations on the array
const doubledNumbers = numbers.map(num => num * 2);
const sum = numbers.reduce((acc, curr) => acc + curr, 0);
const evenNumbers = numbers.filter(num => num % 2 === 0);

console.log(doubledNumbers);  // Output: [4, 8, 12, 16, 20]
console.log(sum);  // Output: 30
console.log(evenNumbers);  // Output: [2, 4, 6, 8, 10]

// Perform asynchronous operations using Promises
const fetchUserData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ name: "John Doe", age: 25 });
    }, 2000);
  });
};

fetchUserData().then(userData => {
  console.log(userData);  // Output: { name: "John Doe", age: 25 }
});

// Use the async/await syntax with Promises
const getUserData = async () => {
  const userData = await fetchUserData();
  console.log(userData);  // Output: { name: "John Doe", age: 25 }
};

getUserData();

// Implement a function to check if a number is prime
function isPrime(num) {
  if (num <= 1) {
    return false;
  }
  for (let i = 2; i < num; i++) {
    if (num % i === 0) {
      return false;
    }
  }
  return true;
}

console.log(isPrime(17));  // Output: true

// Use regular expressions to validate email addresses
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

console.log(validateEmail("john.doe@example.com"));  // Output: true

// ... continue with more sophisticated code
// (Additional functionalities, complex algorithms, advanced ES6 features, etc.)

// End of sophisticated_code.js