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


// Add your functions below:

//function as an Arrow function
const validateCred = (cardNumber)  =>{

// Create a copy of the card number to avoid mutating the original array.
const cardCopy = [...cardNumber];
  
// Iterate from the rightmost digit (check digit) to the left.
for (let i = cardCopy.length - 2; i >= 0; i -= 2) {
  let doubledDigit = cardCopy[i] * 2;
  
  // If doubling results in a number greater than 9, subtract 9.
  if (doubledDigit > 9) {
    cardCopy[i] = doubledDigit - 9;
  } else {
    cardCopy[i] = doubledDigit;
  }
}

// Sum up all the digits in the modified card number.
const sum = cardCopy.reduce((acc, digit) => acc + digit, 0);

// Check if the sum modulo 10 is 0 to determine validity.
return sum % 10 === 0;
}


//function expression
const findInvalidCards = function(batch) {
  
    // Create an array to store invalid card numbers.
    const invalidCards = [];
    
    // Iterate through the batch of card numbers.
    for (let i = 0; i < batch.length; i++) {
      const cardNumber = batch[i];
    
      // Check the validity of each card using the validateCred function.
      if (!validateCred(cardNumber)) {
        // If the card is invalid, add it to the invalidCards array.
        invalidCards.push(cardNumber);
      }
    }
    
    return invalidCards;                                                                                                         
    }

    function idInvalidCardCompanies(invalidNumbers) {
        const companies = [];
      
        // Define a mapping of first digits to company names
        const companyMappings = {
          3: "Amex (American Express)",
          4: "Visa",
          5: "Mastercard",
          6: "Discover",
        };
      
        // Loop through the nested array
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
        const uniqueCompanies = [...new Set(companies)];
      
        return uniqueCompanies;
      }
      
      
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