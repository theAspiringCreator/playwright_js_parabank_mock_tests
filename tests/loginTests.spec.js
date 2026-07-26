import { expect } from '@playwright/test';
import { test} from './fixtures.spec.js';
import testData from '../test-data/login-test-data.json' with { type: 'json' };


  test('Logging in with the correct data',async ({fixVisitBaseUrl} ) => {
  const { hp, rp, acc } = fixVisitBaseUrl;


   //variable to get login data from json file
  const d = testData.correctData;

  //test steps  
     await hp.initializeDb();
     await hp.goToRegistration();
   
     await rp.performReg(
                     d.dataFirstName,
                     d.dataLastName,
                     d.dataStreet,
                     d.dataCity,
                     d.dataState,
                     d.dataZip,
                     d.dataPhone,
                     d.dataSsn,
                     d.dataUsername,
                     d.dataPassword,
                     d.dataConfPassword
                     );

      /**
       * after sucessful registration the app logs the user in automatically
       * to test login feature one has to perform logout first
       */
     await hp.performLogout();

     await hp.performLogin(d.dataUsername, d.dataPassword);

     //no error msg appears
     await expect(hp.getErrorMsgTitle()).not.toBeVisible();  
     await expect(hp.getErrorMsgText()).not.toBeVisible();

     //welcome message in left panel appears 
     await expect(acc.getTextWelcomeTitlLeft()).toBeVisible();

     //logout after performing validations
     await hp.performLogout();
});

testData.incorrectData.forEach((scenario) => {
   test.only(`Logging in with the incorrect data - ${scenario.description}`,async ({fixVisitBaseUrl, page} ) => {
       const { hp,rp } = fixVisitBaseUrl;

       //variables to read login data from json file
       const d = scenario.data;
       const txtUsername = d.dataUsername_login;
       const txtPassword = d.dataPassword_login;   

       const errorText = scenario.expectedErrorMsg;   

     //test steps
     await hp.initializeDb();
     await hp.goToRegistration();

     await rp.performReg(
                     d.dataFirstName,
                     d.dataLastName,
                     d.dataStreet,
                     d.dataCity,
                     d.dataState,
                     d.dataZip,
                     d.dataPhone,
                     d.dataSsn,
                     d.dataUsername_reg,
                     d.dataPassword_reg,
                     d.dataPassword_reg
                     );


       
       /**
       * after sucessful registration the app logs the user in automatically
       * to test login feature one has to perform logout first
       */

       await hp.performLogout();
    

       await hp.performLogin(txtUsername, txtPassword);

       //error msg appears
       await expect(hp.getErrorMsgTitle()).toBeVisible();  
       await expect(hp.getErrorMsgText()).toBeVisible(); 
       await expect(hp.getErrorMsgTitle()).toContainText('Error!');
       await expect(hp.getErrorMsgText()).toContainText(errorText);
});
});