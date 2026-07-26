import { test } from '../tests/fixtures.spec.js';

export class AccountsPage {
     #page;
     #msgWelcomeTitlLeft;
     #msgWelcomeTitlRight
     #msgWelcomeRight;
     #titlAccntServices;
     #lnkOpenAccnt;
     #lnkAccntsOverview;
     #lnkTransferFunds;
     #lnkFindTrans;
     #lnkLogOut;

    
     constructor(page){
          this.#page = page;

	  //welcome texts
	  this.#msgWelcomeTitlLeft = page.locator('p.smallText');
	  this.#titlAccntServices = page.getByRole('heading', { name: 'Account Services' });
          this.#msgWelcomeTitlRight = page.locator('div#rightPanel > h1.title');
          this.#msgWelcomeRight = page.locator('div#rightPanel > p');

          //Links
	  this.#lnkOpenAccnt = page.getByRole('link', { name: 'Open New Account' });
	  this.#lnkAccntsOverview = page.getByRole('link', { name: 'Accounts Overview' });
       	  this.#lnkTransferFunds = page.getByRole('link', { name: 'Transfer Funds' });
       	  this.#lnkFindTrans = page.getByRole('link', { name: 'Find Transanction' });
      	  this.#lnkLogOut = page.getByRole('link', { name: 'Log Out' });
     }

     //action methods
     async openAccnt(){
          await this.#lnkOpenAccnt.click();
     }
    
     //link clicks
     async visitAccntsOverview(){
           await this.#lnkAccntsOverview.click();
     }
 
     async visitTransferMoney(){
          await this.#lnkTransferFunds.click();
     }
     
     async visitTransactionSearch(){
          await this.#lnkFindTrans.click();
     }

     async performLogout(){
          await this.#lnkLogOut.click();
     }     


     //get text values

     getTextWelcomeTitlLeft(){
          return this.#msgWelcomeTitlLeft; 
     }

     getTextWelcomeTitlRight(){
          return this.#msgWelcomeTitlRight; 
     }

     getTextWelcomeRight(){
          return this.#msgWelcomeRight; 
     }

    
}   