import { expect } from '@playwright/test';
import { test} from './fixtures.spec.js';
import testData from '../test-data/login-test-data.json' with { type: 'json' };
import { convertAmount } from '../utils/helpers.js';

test.beforeEach(async ({fixVisitBaseUrl, page}) => {
  const { hp, rp, acc, na, ao } = fixVisitBaseUrl; 
     //use correct login data from json file
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

     await hp.performLogin(d.dataUsername, d.dataPassword); 
});


test('Message on successful checking account creation displayed ',async ({fixVisitBaseUrl, page} ) => {
const { hp, rp, acc, na } = fixVisitBaseUrl;

     await acc.openAccnt();
     await page.waitForURL('https://parabank.parasoft.com/parabank/openaccount.htm');
     await na.openNewAccnt(0, 0);
     
     let checkingAccnt1No = await na.getNewAccntNo();

     await expect(await na.getTitlSuccess()).toBeVisible();     
     await expect(await na.getSuccessText()).toBeVisible();
     await expect(await na.getSuccessText2()).toBeVisible();

  });

test('Checking account - Account no., balance, amount available, amount total & disclaimer are displayed ',async ({ fixVisitBaseUrl, page} ) => {
     const { hp, rp, acc, na, ao } = fixVisitBaseUrl;

 
     //test steps
     await acc.openAccnt();
     await page.waitForURL('https://parabank.parasoft.com/parabank/openaccount.htm');
     await na.openNewAccnt(0, 0);
     await acc.visitAccntsOverview();
    
      
     let tableData = [
                       ao.getAccntNo(2),
                       ao.getBalance(2),
                       ao.getAvAmnt(2),
                       ao.getTotlAmnt(2),
                       ao.getDisclaimer()
                     ];

         //assertions within for-loop
         for(let j = 0; j < tableData.length; j++){
                  await expect(tableData[j]).toBeVisible();
          }
});


test('New checking account has the same number in the message as in the account overview',async ({fixVisitBaseUrl, page } ) => {

const { hp, rp, acc, na, ao } = fixVisitBaseUrl;
 
     //test steps & variables collected during test steps
     await acc.openAccnt();
     await page.waitForURL('https://parabank.parasoft.com/parabank/openaccount.htm');
     await na.openNewAccnt(0, 0);

     //wait until account no is visible
     await expect(na.getNewAccntNo()).toBeVisible();
     
     //variables
     const msgAccntNoInMsg = await na.getNewAccntNo().textContent();
     const cleanAccntNo = msgAccntNoInMsg?.trim(); 
     
     //final test step
     await acc.visitAccntsOverview();
     
     //assertion
     await expect(ao.getAccntNo(2)).toHaveText(cleanAccntNo);
});


test('Total amount for initial and checking account is correct',async ({fixVisitBaseUrl,page } ) => {
        const { hp, rp, acc, na, ao } = fixVisitBaseUrl;

     //test steps
     await acc.openAccnt();
     await page.waitForURL('https://parabank.parasoft.com/parabank/openaccount.htm');
     await na.openNewAccnt(0, 0);
     await acc.visitAccntsOverview();

	//remove '$'-sign & convert type to numbers
	const initBalance_txt = (await ao.getBalance(1).textContent());
        const chkBalance_txt = (await ao.getBalance(2).textContent());

        const initBalance = convertAmount(initBalance_txt);
        const chkBalance = convertAmount(chkBalance_txt);

        const actualTotal = initBalance + chkBalance; //already has correct type

        const expectedTotal_txt = (await ao.getTotlAmnt(2).textContent());
        const expectedTotal = convertAmount(expectedTotal_txt);

        //assertion
	await expect(actualTotal).toBe(expectedTotal);
});


test('Message on successful savings account creation displayed ',async ({fixVisitBaseUrl, page} ) => {
     const { hp, rp, acc, na } = fixVisitBaseUrl;

     //test steps
     await acc.openAccnt();
     await page.waitForURL('https://parabank.parasoft.com/parabank/openaccount.htm');
     await na.openNewAccnt(1, 0);

     //assertions          
     await expect(na.getTitlSuccess()).toBeVisible();     
     await expect(na.getSuccessText()).toBeVisible();
     await expect(na.getSuccessText2()).toBeVisible();
  });