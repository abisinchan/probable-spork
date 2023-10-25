// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8]
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9]
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6]
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5]
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6]

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5]
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3]
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4]
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5]
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4]

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4]
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9]
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3]
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3]
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3]

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5]

//---------------------------------------------------------------------------

// Add your functions below:

//function as an Arrow function
const validateCred = (cardNumber)  =>{

// Create a copy of the card number to avoid mutating the original array.

  /* 
    ... is the spread operator
    spread operator creates shallow copies of arrays, merging arrays, and spreading the elements of an array or iterable into another array or function parameters.
  */

 const cardCopy = [...cardNumber];

  /* 
    The spread operator can also be used to combine arrays, like merging two arrays
    const array1 = [1, 2, 3];
    const array2 = [4, 5, 6];
    const mergedArray = [...array1, ...array2]; 
  */

// Iterate from the rightmost digit (check digit) to the left.

  /*
    1.  for Loop Initialization:
      let i = cardCopy.length - 2;: 
        This line initializes a variable i to the value of cardCopy.length - 2. 
        cardCopy is assumed to be an array, so cardCopy.
        length gives you the number of elements in the array. 
        By subtracting 2, it starts at the second-to-last element in the array. 

    2.  for Loop Condition:
      i >= 0;: 
        This is the loop condition. 
        The loop will continue as long as the value of i is greater than or equal to 0. 
        This ensures that the loop will run until it reaches the first element of the array.

    3.  for Loop Iteration:
      i -= 2: 
        This line decrements the value of i by 2 in each iteration. 
        It means that in each loop iteration, i will move two positions backward in the array.

  Inside the loop:

    1.  let doubledDigit = cardCopy[i] * 2;:
      cardCopy[i]
        retrieves the value at the current position of i in the cardCopy array. 
        Since i starts at the second-to-last element and decreases by 2 in each iteration, it effectively selects every other element in reverse order.

      * 2 
        multiplies the selected value by 2. 
        This line calculates double the value of the element at the current position.

  */ 

 for (let i = cardCopy.length - 2; i >= 0; i -= 2) {
   let doubledDigit = cardCopy[i] * 2;

// If doubling results in a number greater than 9, subtract 9.

  /*
    1.  if (doubledDigit > 9): 
          This condition checks if the doubledDigit is greater than 9. 
          In the context of the Luhn algorithm, doubling a digit can result in a number greater than 9, especially when the original digit is 5 or greater (e.g., doubling 6 results in 12).
    
    2.  { cardCopy[i] = doubledDigit - 9; }:
           If the doubledDigit is greater than 9, this block of code is executed. 
           It subtracts 9 from the doubledDigit and assigns the result back to the same position in the cardCopy array. 
           By subtracting 9, you effectively "reduce" the doubled digit back to a value in the range of 0 to 9.

    3.  else { cardCopy[i] = doubledDigit; }:
          If the doubledDigit is not greater than 9, this block of code is executed. In this case, there's no need to subtract 9, so the doubledDigit remains the same, and it's assigned back to the same position in the cardCopy array.
    
    This step helps normalize the digits for further processing and validation of the credit card number.
  */

   if (doubledDigit > 9) {
     cardCopy[i] = doubledDigit - 9;
   } else {
     cardCopy[i] = doubledDigit;
   }
 }

// Sum up all the digits in the modified card number.

 /*
    1.  const sum = cardCopy.reduce((acc, digit) => acc + digit, 0);: 
          This line of code utilizes the reduce method on the cardCopy array to calculate the sum of its elements.

    2.  .reduce(): 
          The reduce method is used to "reduce" an array to a single value. 
          It takes a callback function as an argument, which is called for each element in the array.

    3.  (acc, digit) => acc + digit: 
          This is the callback function. 
          It takes two parameters: acc (which stands for "accumulator") and digit (which represents each element in the array). 
          In this case, the function adds the current digit to the acc.

    4.  , 0: 
          The 0 at the end of the reduce function is the initial value of the accumulator (acc). 
          In this case, it starts with 0, so the summation begins from zero.
*/

 const sum = cardCopy.reduce((acc, digit) => acc + digit, 0);

// Check if the sum modulo 10 is 0 to determine validity.

 /*
    % is the modulo operator

    If sum % 10 is equal to 0, the === operator evaluates to true, and the function returns true, indicating that the credit card number is valid.

    If sum % 10 is not equal to 0, the === operator evaluates to false, and the function returns false, indicating that the credit card number is invalid.
*/

 return sum % 10 === 0;
}

//----------------------------------------------------------------------
//function expression
const findInvalidCards = function(batch) {

// Create an array to store invalid card numbers.
const invalidCards = [];

// Iterate through the batch of card numbers.

/*
    1.  for Loop Initialization:
      let i = 0;:
        This initializes a variable i to 0. 
        This variable is often used as an index to keep track of your current position in the array.

    2.  for Loop Condition:
      i < batch.length;:
        This is the loop condition. 
        The loop will continue as long as i is less than the length of the batch array. 
        This condition ensures that the loop will iterate over all elements in the batch array.

    3.  for Loop Iteration:
      i++: 
        This part increments i by 1 after each iteration, effectively moving to the next element in the batch array.

  Inside the loop:

    1.  const cardNumber = batch[i];:
          This line declares a constant variable cardNumber and assigns it the value of the element at the current position i in the batch array. 
          In each iteration, it gets the card number at the current index i.

  */ 

for (let i = 0; i < batch.length; i++) {
  const cardNumber = batch[i];

// Check the validity of each card using the validateCred function.

  /* 
    ! (Exclamation Mark): 
      The exclamation mark in front of the expression negates it. 
      It effectively means "not." 
      So, !validateCred(cardNumber) checks if the result of validateCred(cardNumber) is not true.
  */

  if (!validateCred(cardNumber)) {

    // If the card is invalid or false, add it to the invalidCards array.
    invalidCards.push(cardNumber);

  }
}

return invalidCards;                                                                                                         
}

//------------------------------------------------------------------------

//function
function idInvalidCardCompanies(invalidNumbers) {

//Creates empty arrary to store the names of the companies that issued the invalid card numbers
  const companies = [];

// Define a mapping of first digits to company names

  /*object that maps the first digit of a credit card number to the name of the company that typically issues cards with that first digit
  */

  const companyMappings = {
    3: "Amex (American Express)",
    4: "Visa",
    5: "Mastercard",
    6: "Discover",
  };

// Loop through the nested array

  /*
    1.  for Loop Initialization:
      let i = 0;:
        This initializes a variable i to 0. 
        This variable is often used as an index to keep track of your current position in the array.

    2.  for Loop Condition:
      i < invalidNumbers.length;:
        This is the loop condition. 
        The loop will continue as long as i is less than the length of the invalidNumbers array. 
        This condition ensures that the loop will iterate over all elements in the invalidNumbers array.

    3.  for Loop Iteration:
      i++: 
        This part increments i by 1 after each iteration, effectively moving to the next element in the invalidNumbers array.

  Inside the loop:

    1.   const firstDigit = invalidNumbers[i][0];:
      invalidNumbers[i]
         Accesses an element from the invalidNumbers array at the current index i. 
         This allows you to get one of the elements from the array during each iteration of the loop.
      [0]
        used to access the first character of the string that is stored at invalidNumbers[i]. 
        In JavaScript, strings are similar to arrays of characters, and you can access individual characters using square brackets and an index. 
        In this case, [0] means you are getting the first character of the string stored in invalidNumbers[i].
  */ 

  for (let i = 0; i < invalidNumbers.length; i++) {
    const firstDigit = invalidNumbers[i][0];

// Check if the first digit corresponds to a known company
    if (companyMappings[firstDigit]) {
      companies.push(companyMappings[firstDigit]);
    } else {
      companies.push("Company not found");
    }
  }

// Remove duplicates from the companies array

 /* 
    ... is the spread operator
    spread operator creates shallow copies of arrays, merging arrays, and spreading the elements of an array or iterable into another array or function parameters.

    new: This is the keyword used to create a new instance of an object, in this case, a Set.

    Set: Set is a built-in object in JavaScript, introduced in ECMAScript 6 (ES6). It's designed to store unique values.

    companies: This is the array from which you want to create a Set. The Set constructor accepts an iterable object (like an array) as an argument, and it will automatically extract the unique values from that iterable.

  */

  const uniqueCompanies = [...new Set(companies)];

  return uniqueCompanies;
}

// ---------------------------------------------------------------------------------

// Test the validateCred function for a single card
console.log("Is valid1 a valid card?", validateCred(valid1)); // Should print true
console.log("Is invalid1 a valid card?", validateCred(invalid1)); // Should print false

// Test the findInvalidCards function
const invalidCards = findInvalidCards(batch);
console.log("Invalid cards:", invalidCards); // Should print an array of invalid card numbers

// Test the idInvalidCardCompanies function
const invalidCardCompanies = idInvalidCardCompanies(invalidCards);
console.log("Companies associated with invalid cards:", invalidCardCompanies); // Should print the associated companies for each invalid card

// Test the findInvalidCards function on the mystery cards
const invalidMysteryCards = findInvalidCards([mystery1, mystery2, mystery3, mystery4, mystery5]);

// Test the idInvalidCardCompanies function for the invalid mystery cards
const invalidMysteryCardCompanies = idInvalidCardCompanies(invalidMysteryCards);
console.log("Companies associated with invalid mystery cards:", invalidMysteryCardCompanies); // Should print the associated companies for each invalid mystery card