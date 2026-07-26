import { expect } from '@playwright/test';
import { test } from './fixtures.spec.js'; 
import testData from '../test-data/reg-test-data.json' with { type: 'json' };


for (const scenario of testData.correctData) {
 test(`Success Registration - ${scenario.description}`, async ({ fixVisitBaseUrl }) => {
        const { hp, rp, acc } = fixVisitBaseUrl;
        // choose correct data only
        const d = scenario.data;

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
                     d.dataConfPassword);

        await expect.soft(acc.getTextWelcomeTitlRight()).not.toBeEmpty();
        await expect.soft(acc.getTextWelcomeRight()).not.toBeEmpty();
 });
}

test('Submitting an empty form',async ({fixVisitBaseUrl, page}) => {
     const { hp, rp } = fixVisitBaseUrl;
     await hp.goToRegistration();
     await rp.clickRegisterBtn();
       
     let regFormFields = ['Fn','Ln', 'Street', 'City', 'State','Zip', 'Ssn', 'Username','Password', 'RepeatedPassword'];
     for (const field of regFormFields) {

         // 2. Construct the property name as a string
         const errorMethodName = `get${field}Error`;
         const errorLocator = rp[errorMethodName]();


         // 3. Access the property dynamically using bracket notation
          await expect(errorLocator).toBeVisible();
     }
});


testData.incorrectData.forEach((scenario) => {

   test(`Registering with incomplete data - ${scenario.description} displays an error message`, async ({ fixVisitBaseUrl }) => {

         const { hp, rp, acc } = fixVisitBaseUrl;
         const d = scenario.data;   
         const errorText = scenario.expectedErrorMsg;     

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
           await expect(rp.getAllErrors()).toHaveCount(1); //only 1 error message displayed at a time
           await expect(rp.getErrorMessageByText(errorText)).toBeVisible();
        });
   });
