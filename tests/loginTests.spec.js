import { expect } from '@playwright/test';
import { test} from './fixtures.spec.js';
import testData from '../test-data/login-test-data.json' with { type: 'json' };

test('Logging in with the correct data',async ({fixVisitBaseUrl, page} ) => {
       const { hp, rp, acc } = fixVisitBaseUrl;
       const d = testData.correctData;

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
     await test.step('Přihlášení uživatele', async () => {
  await hp.performLogin(txtUsername, txtPassword);
}, { timeout: 5000 });

     await expect(hp.getErrorMsgTitle()).not.toBeVisible();  
     await expect(hp.getErrorMsgText()).not.toBeVisible();
     await expect(acc.getTextWelcomeTitlLeft()).toBeVisible();
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
     await page.waitForURL('https://parabank.parasoft.com/parabank/register.htm');
  
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

         
       
       //
       // after sucessful registration the app logs the user in automatically
       //to test login feature one has to perform logout first
       
       await page.waitForURL('https://parabank.parasoft.com/parabank/register.htm');
       await hp.performLogout();
       await page.goto('https://parabank.parasoft.com/parabank/index.htm?ConnType=JDBC');
       await hp.performLogin(txtUsername, txtPassword);       
       await page.waitForURL('https://parabank.parasoft.com/parabank/login.htm'); 

       await expect(hp.getErrorMsgTitle()).toBeVisible();  
       await expect(hp.getErrorMsgText()).toBeVisible(); 
       await expect(hp.getErrorMsgTitle()).toContainText('Error!');
       await expect(hp.getErrorMsgText()).toContainText(errorText);
       await expect(hp.getErrorMsgTitle()).toHaveCount(1);
       await expect(hp.getErrorMsgText()).toHaveCount(1);
});
});