import { expect } from '@playwright/test';

export class HomePage {
     #page;
     #lnkAdminPage;
     #apBtnInit;
     #inptUsername;
     #inptUsername2;
     #inptUsername3;
     #inptPassword;
     #inptPassword2;
     #btnLogIn;
     #lnkForgotLogin;
     #lnkRegister;
     #msgLoginErrorTitl;
     #msgLoginErrorText;
     #lnkLogout;
     #lnkLogout2;

     constructor(page){
          this.#page = page;

          this.#lnkAdminPage = page.getByRole('link', { name: 'Admin Page' });
          this.#apBtnInit = page.getByRole('button', { name: 'Initialize' });

	  //login elements
	  this.#inptUsername = page.getByRole('textbox', { name: 'username' });
          this.#inptUsername2 = page.locator('input[name="username"]');
          this.#inptUsername3 = page.locator('input[type="text"]').first();

	  this.#inptPassword =  page.getByRole('textbox', { name: 'password' });
          this.#inptPassword2 = page.locator('input[type="password"]'); 

	  this.#btnLogIn = page.getByRole('button', { name: 'Log In' });

          //Links
	  this.#lnkForgotLogin = page.getByRole('link', { name: 'Forgot login info?' });
	  this.#lnkRegister = page.getByRole('link', { name: 'Register' });
          this.#lnkLogout = page.getByRole('link', { name: 'Log Out' });
          this.#lnkLogout2 = page.locator('#leftPanel > ul > li:nth-child(8)');

          //login error
          this.#msgLoginErrorTitl = page.getByRole('heading', {name: 'Error!'}); 
          this.#msgLoginErrorText = page.locator('#rightPanel > .error');
          
     }
     //action methods
     async visitHomepage(){
          await this.#page.goto('/'); 
     }
     
     async gotoAdminPage(){
          await this.#lnkAdminPage.click();
     }
   
     async clickInitializeBtn(){
          await this.#apBtnInit.click();       
     } 
     
     async initializeDb(){
          await this.gotoAdminPage();
          await this.clickInitializeBtn();
     }


     async enterUsername(txtUsername){

          if(await this.#inptUsername.isVisible()){
            await this.#inptUsername.fill(txtUsername);
          }
          else if(this.#inptUsername2.isVisible()){
              await this.#inptUsername2.fill(txtUsername);
          }
         else{
             await this.#inptUsername3.fill(txtUsername);
         }
     }
     
     async enterPassword(txtPassword){
          if(await this.#inptPassword.isVisible()){
               await this.#inptPassword.fill(txtPassword);
             } 
          else{
              await this.#inptPassword2.fill(txtPassword);
            }
     }

     async clickLogin(){
          await this.#btnLogIn.click();
     }

     async clearUsername(){
          if(await this.#inptUsername.isVisible()){
               await this.#inptUsername.clear();
          }
         else if (await this.#inptUsername2.isVisible()) {
              await this.#inptUsername2.clear();
          }
         else {
              await this.#inptUsername3.clear(); 
         }
     }

     async clearPassword(){
          if(await this.#inptPassword.isVisible()){
                await this.#inptPassword.clear();
             }
          else {
               await this.#inptPassword2.clear();
            }     
     }
     
     async performLogin(txtUsername, txtPassword){
          //clear form inputs
          await this.clearUsername();
          await this.clearPassword();

          //enter new data & submit
          await this.enterUsername(txtUsername);
          await this.enterPassword(txtPassword);
          await this.clickLogin();
     }
    
     async goToRegistration(){
          await this.#lnkRegister.click();
    }
     
    async recoverLoginDetails(){
         await this.#lnkForgotLogin.click();
    }
   
    getErrorMsgTitle(){
         return this.#msgLoginErrorTitl;
    }
    
    getTextErrorMsgText(){
         return this.#msgLoginErrorText;
    }
     
    getErrorMsgText(){
         return this.#msgLoginErrorText;
    }
    
     async performLogout() {
    if (await this.#lnkLogout.isVisible()) {
      await this.#lnkLogout.click();
    } else {
      await this.#lnkLogout2.click();
    }
  }S  
}