import { test as base } from '@playwright/test';

import { getRandomNumber } from '../utils/helpers';

import { HomePage } from '../pageObjects/homePage.js';
import { RegPage } from '../pageObjects/regPage';
import { ReLogDetPage } from '../pageObjects/reLogDetPage';
import { NewAccntPage } from '../pageObjects/newAccntPage';
import { AccountsPage } from '../pageObjects/accountsPage';
import { AccOverviewPage } from '../pageObjects/accOverviewPage';
import { TransferFundsPage} from '../pageObjects/transferFundsPage';
import { FindTransPage } from '../pageObjects/findTransPage';



export const test = base.extend({

     fixVisitBaseUrl: async({ page }, use) => {
          //page Objects
          const hp = new HomePage(page);
          const rp = new RegPage(page);
          const reLogP = new ReLogDetPage(page);
          const na = new NewAccntPage(page);
          const acc = new AccountsPage(page);
          const ao = new AccOverviewPage(page);
          const tf = new TransferFundsPage(page);
          const fs = new FindTransPage(page);

          //repetitive test steps
          await hp.visitHomepage();
          await use({hp, rp, reLogP, na, acc, ao, tf, fs });
     },
    
});