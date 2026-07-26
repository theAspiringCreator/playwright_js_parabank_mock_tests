/**
* @returns generates a random number between min & max inclusive.
* @param {number} min - minimum possible number
* @param {number} max - maximum possible number
*
* @example
* ```
* const year = getRandomNumber(1900, 2026);
* ```
*/
export function getRandomNumber(min, max){
     if(typeof min === "number" && typeof max === "number"){
          return Math.floor(Math.random() * (max - min + 1)) + min;
     }
     else{
          throw new TypeError("Function getRandomNumber accepts only numbers as parameters.");
     }
}


/**
* @returns generates a random letter string having specified length
* @param {number} length - length of string
*
* @example
* ```
* const username = getRandomString(4);
* //possible output: "abcd"
* ```
*/
export function getRandomString(length){
     if(typeof length === "number") {
         const characters ="abcdefghijklmnopqrstuvwxyz";
         let result = '';

         for(let i = 0; i < length; i++){
             const randomIndex = getRandomNumber(0, characters.length - 1);
             result += characters.charAt(randomIndex);
         }
       return result;
     } else {
          throw new TypeError("Function getRandomString accepts only number as parameter.");
     }
}


/**
* @returns generates a random special character
* 
* @example
* ```
* const mySpecialChar = getRandomSpecialChar();
* //possible output: "@"
* ```
*/
export function getRandomSpecialChar(){

         const characters = "'!@#%^;~&*?[]:|{}_+()-//";
         let result = '';

         const randomIndex = getRandomNumber(0, characters.length);
         result += characters.charAt(randomIndex);
         return result;            
}