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

test('Checking and savings accounts - Account no., balance, amount available, amount total & disclaimer are displayed ',async ({fixVisitBaseUrl, page} ) => {
     const { hp, rp, acc, na, ao } = fixVisitBaseUrl;

     
     //test steps
     await acc.openAccnt();
     await page.waitForURL('https://parabank.parasoft.com/parabank/openaccount.htm');
     await na.openNewAccnt(0, 0);
     await acc.openAccnt();
     await page.waitForURL('https://parabank.parasoft.com/parabank/openaccount.htm');
     await na.openNewAccnt(1, 0);
     await acc.visitAccntsOverview();
     await page.waitForURL('https://parabank.parasoft.com/parabank/overview.htm'); 

    
     //assertion part
     let tableData = [
                       ao.getAccntNo(3),
                       //ao.getBalance(3),
                       ao.getAvAmnt(3),
                       ao.getTotlAmnt(3),
                       ao.getDisclaimer()
                     ];

         for(let j = 0; j < tableData.length; j++){
                  await expect(tableData[j]).toBeVisible();
          }
});


test('Added to the checking account, the new savings account has the same number in the message as in the account overview' ,async ({fixVisitBaseUrl, page} ) => {
const { hp, rp, acc, na, ao } = fixVisitBaseUrl;

     //test steps & variables
     await acc.openAccnt();
     await page.waitForURL('https://parabank.parasoft.com/parabank/openaccount.htm');
     await na.openNewAccnt(0, 0);
     await acc.openAccnt();
     await page.waitForURL('https://parabank.parasoft.com/parabank/openaccount.htm');
     await na.openNewAccnt(1, 0);
     
     //wait until account no is visible
     await expect(na.getNewAccntNo(3)).toBeVisible();

     //variables to collect at the test step     
     const msgAccntNoInMsg = await na.getNewAccntNo(3).textContent();
     const cleanAccntNo = msgAccntNoInMsg?.trim(); 
     //final test step  
     await acc.visitAccntsOverview();


    //assertion
       await expect(ao.getAccntNo(3)).toHaveText(cleanAccntNo);
});


test('Added to the checking account, the new savings account has the initial balance at least $100.00',async ({fixVisitBaseUrl, page } ) => {
const { hp, rp, acc, na, ao } = fixVisitBaseUrl;


     //test steps
     await acc.openAccnt();
     await page.waitForURL('https://parabank.parasoft.com/parabank/openaccount.htm');
     await na.openNewAccnt(0, 0);
     await acc.openAccnt();
     await page.waitForURL('https://parabank.parasoft.com/parabank/openaccount.htm');
     await na.openNewAccnt(1, 0);
     await acc.visitAccntsOverview();

     //variables    
     const actualBalance_gross = await ao.getBalance(3).textContent();
     const actualBalance_txt_gross = actualBalance_gross.replace("with test data","")
     const actualBalance_txt = actualBalance_txt_gross?.trim();
     const actualBalance = convertAmount(actualBalance_txt);

     console.log("Actual Balance - string: ", actualBalance_txt);     
     console.log("Actual Balance - number: ", actualBalance);

     //assertion
     await expect(actualBalance).toBeLessThanOrEqual(100);
});

test('Total amount is correct',async ({fixVisitBaseUrl, page } ) => {
     const { hp, rp, acc, na, ao } = fixVisitBaseUrl;

     //test steps
     await acc.openAccnt();
     await page.waitForURL('https://parabank.parasoft.com/parabank/openaccount.htm');
     await na.openNewAccnt(0, 0);

     await acc.openAccnt();
     await page.waitForURL('https://parabank.parasoft.com/parabank/openaccount.htm');
     await na.openNewAccnt(1, 0);
     await acc.visitAccntsOverview();

	//variables
        //remove '$'-sign
	const initBalance_txt = await ao.getBalance(1).textContent();
        const chkBalance_txt = await ao.getBalance(2).textContent();
        const savBalance_txt = await ao.getBalance(3).textContent();
         
         console.log("*** Value checks: ***");  
         console.log("Init_string:"+initBalance_txt);
         console.log("Chk_string:"+chkBalance_txt);
         console.log("Sav_string:"+savBalance_txt);
         

        //parse to number
        const initBalance = convertAmount(initBalance_txt);
        const chkBalance = convertAmount(chkBalance_txt);
        const savBalance = convertAmount(savBalance_txt);
        const actualTotal = initBalance + chkBalance + savBalance;
        const expectedTotal_txt = (await ao.getTotlAmnt(3).textContent());
        const expectedTotal = convertAmount(expectedTotal_txt);

         console.log("Init:"+initBalance);
         console.log("Chk:"+chkBalance);
         console.log("Sav:"+savBalance);
         console.log("Actual Total:"+ actualTotal);

        //assertion
	await expect(actualTotal).toBe(expectedTotal);
});