import { expect } from '@playwright/test';
import { test} from './fixtures.spec.js';
import testData from '../test-data/login-test-data.json' with { type: 'json' };

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

test('Page title and table headings are visible ', async ({fixVisitBaseUrl, page} ) => {
    const { acc, ao } = fixVisitBaseUrl;
     await acc.visitAccntsOverview();
     await page.waitForURL('https://parabank.parasoft.com/parabank/overview.htm'); 

     let headings = [ao.getTitl(), ao.getTHaccnt(), ao.getTHbalance(), ao.getTHamnt()];
    
     for(let i = 0; i < headings.length; i++){
           await expect(headings[i]).toBeVisible();     
     }
  });

test('Account no., balance, amount available, amount total & disclaimer are displayed ', async ({fixVisitBaseUrl, page} ) => {
     const { acc, ao } = fixVisitBaseUrl;

     await acc.visitAccntsOverview();
     await page.waitForURL('https://parabank.parasoft.com/parabank/overview.htm'); 

     let tableData = [
         ao.getAccntNo(1),
         ao.getBalance(1),
         ao.getAvAmnt(1),
         ao.getTotlAmnt(1),
         ao.getDisclaimer()
       ];

         for(let j = 0; j < tableData.length; j++){
                  await expect(tableData[j]).toBeVisible();
          }
});


test('Initial balance equals to initial total and available amount', async ({fixVisitBaseUrl, page } ) => {
     const { acc, ao, hp } = fixVisitBaseUrl;

     await acc.visitAccntsOverview();
     await page.waitForURL('https://parabank.parasoft.com/parabank/overview.htm'); 

     const balanceText = (await ao.getBalance(1).textContent())?.trim();
     const amountAvailableText = (await ao.getAvAmnt(1).textContent())?.trim();
     const totalAmountText = (await ao.getTotlAmnt(1).textContent())?.trim();

     expect(balanceText).toBe(amountAvailableText);
     expect(balanceText).toBe(totalAmountText);
});