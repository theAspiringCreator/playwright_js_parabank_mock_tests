import fs from 'fs';
import path from 'path';
import { getRandomNumber, getRandomString, getRandomSpecialChar } from './helpers.js';

// global variables

// Generate an array with 12 unique random usernames using my helper function
const randomUsernames = Array.from({ length: 12 }, () => getRandomString(8));

const password = `${getRandomString(1).toUpperCase()}${getRandomString(6)}${getRandomNumber(0, 9)}${getRandomSpecialChar()}`;
const badConfPassword = `${getRandomString(1).toUpperCase()}${getRandomString(6)}${getRandomNumber(0, 9)}${getRandomSpecialChar()}`;
const badPassword = `${getRandomString(1).toUpperCase()}${getRandomString(6)}${getRandomNumber(0, 9)}${getRandomSpecialChar()}`;

// generate test data for registration

/**
* generate base correct random registration data
*/
function createBaseCorrectData() {    
     return {
                 dataFirstName: getRandomString(4), 
                 dataLastName: getRandomString(6),
                 dataStreet: `${getRandomString(5)} ${getRandomNumber(1, 500)}`,
                 dataCity: getRandomString(8), 
                 dataState: getRandomString(5), 
                 dataZip:`${getRandomString(3)} ${getRandomNumber(150, 600)}`, 
                 dataPhone: String(getRandomNumber(10000000, 90000000)),
                 dataSsn: String(getRandomNumber(100,999)),
                 dataUsername: randomUsernames[0], 
                 dataPassword: password,
                 dataConfPassword: password
                };
}

/**
* get base correct random registration data
* create test scenarios for registration
*/
function generateRegistrationData() {             

      const baseCorrectDataStatic = createBaseCorrectData(); //for duplicate registration

      const correctDataScenarios = [
             {
              description: "Non-empty phone number",
              data: {...createBaseCorrectData()}
             },
             {
              description: "Empty phone number",
              data: {...createBaseCorrectData(), dataPhone: "", dataUsername: randomUsernames[1]}
             }
            ];


    //Negative scenarios
     const negativeScenarios = [
          { description: "Empty first name", expectedErrorMsg: "First name is required.", data: { ...createBaseCorrectData(), dataFirstName: "", dataUsername: randomUsernames[2] } },
          { description: "Empty last name", expectedErrorMsg: "Last name is required.", data: { ...createBaseCorrectData(), dataLastName: "",  dataUsername: randomUsernames[3] } },
          { description: "Empty street", expectedErrorMsg: "Address is required.", data: { ...createBaseCorrectData(), dataStreet: "", dataUsername: randomUsernames[4] } },
          { description: "Empty city", expectedErrorMsg: "City is required.", data: { ...createBaseCorrectData(), dataCity: "", dataUsername: randomUsernames[5] } },
          { description: "Empty state", expectedErrorMsg: "State is required.", data: { ...createBaseCorrectData(), dataState: "", dataUsername: randomUsernames[6] } },
          { description: "Empty zip code", expectedErrorMsg: "Zip Code is required.", data: { ...createBaseCorrectData(), dataZip: "", dataUsername: randomUsernames[7] } },
          { description: "Empty ssn", expectedErrorMsg: "Social Security Number is required.", data: { ...createBaseCorrectData(), dataSsn: "", dataUsername: randomUsernames[8] } },
          { description: "Empty username", expectedErrorMsg: "Username is required.", data: { ...createBaseCorrectData(), dataUsername: "" } },
          { description: "Empty password", expectedErrorMsg: "Password is required.", data: { ...createBaseCorrectData(), dataUsername: randomUsernames[9], dataPassword: ""} },
          { description: "Empty confirm password field", expectedErrorMsg: "Password confirmation is required.", data: { ...createBaseCorrectData(), dataUsername: randomUsernames[10], dataConfPassword: "" } },
          { 
               description: "Passwords do not match", 
               expectedErrorMsg: "Passwords did not match.", 
               data: { ...createBaseCorrectData(), dataUsername: randomUsernames[11], dataConfPassword: badConfPassword }
          },
{ 
               description: "Duplicate registration attempt", 
               expectedErrorMsg: "Username already exists.", 
               data: { ...baseCorrectDataStatic, dataUsername: randomUsernames[11] }
          },
          
     ];      


     // Structure of JSON file
     const finalData = {
          correctData: correctDataScenarios, 
          incorrectData: negativeScenarios 
     };

     //Write into file
     const dirPath = path.resolve('test-data');
     if (!fs.existsSync(dirPath)){
          fs.mkdirSync(dirPath);
     }

     fs.writeFileSync(
          path.join(dirPath, 'reg-test-data.json'), 
          JSON.stringify(finalData, null, 2)
     );

     console.log(`Generated reg-test-data.json file with test data.`);
}

generateRegistrationData();


// generate login data
function generateLoginData() {
  //get correct registration data

 
  const correctData = {
                       ...createBaseCorrectData(), dataUsername: randomUsernames[0], dataPassword: password
                      };

  const negativeScenarios = [
                             {
                              description: "Correct username, incorrect password",
                              expectedErrorMsg: "The username and password could not be verified.",
                              data: {
                                     ...createBaseCorrectData(),
                                     dataUsername_reg: randomUsernames[1], dataPassword_reg: password,
                                     dataUsername_login: randomUsernames[1], dataPassword_login: badPassword
                                     }
                             },
                             {
                              description: "Incorrect username, correct password",
                              expectedErrorMsg: "An internal error has occurred and has been logged.",
                              data: {
                                     ...createBaseCorrectData(),
                                     dataUsername_reg: randomUsernames[2], dataPassword_reg: password,
                                     dataUsername_login: randomUsernames[1], dataPassword_login: password
                                    }
                             },
                             {
                              description: "Incorrect username, incorrect password",
                              expectedErrorMsg: "The username and password could not be verified.",
                              data: {
                                     ...createBaseCorrectData(),
                                     dataUsername_reg: randomUsernames[3], dataPassword_reg: password,
                                     dataUsername_login: randomUsernames[2], dataPassword_login: badPassword
                                    }
                             },
                             {
                              description: "Correct username, empty password",
                              expectedErrorMsg: "Please enter a username and password.",
                              data: {
                                     ...createBaseCorrectData(), 
                                     dataUsername_reg: randomUsernames[4], dataPassword_reg: password, 
                                     dataUsername_login: randomUsernames[4], dataPassword_login: "" 
                                    }
                             },
                             {
                              description: "Empty username, correct password",
                              expectedErrorMsg: "Please enter a username and password.",
                              data: {
                                     ...createBaseCorrectData(),
                                     dataUsername_reg: randomUsernames[5], dataPassword_reg: password,
                                     dataUsername_login: "", dataPassword_login: password
                                    }
                             },
                             {
                              description: "Empty username, empty password",
                              expectedErrorMsg: "Please enter a username and password.",
                              data: {
                                     ...createBaseCorrectData(),
                                     dataUsername_reg: randomUsernames[6], dataPassword_reg: password,
                                     dataUsername_login: "", dataPassword_login: ""
                                    }
                             } 
                            ];
                   //structure of JSON file
const testData = {
          correctData: correctData, 
          incorrectData: negativeScenarios 
     };

     //Write into file
     const dirPath = path.resolve('test-data');
     if (!fs.existsSync(dirPath)){
          fs.mkdirSync(dirPath);
     }

     fs.writeFileSync(
          path.join(dirPath, 'login-test-data.json'), 
          JSON.stringify(testData, null, 2)
     );

     console.log(`Generated login-test-data.json file with test data.`);                      
}

generateLoginData();