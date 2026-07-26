export class RegPage {
  #page;
  #inptFirstName;
  #inptLastName;
  #inptAddress;
  #inptCity;
  #inptState;
  #inptZip;
  #inptPhone;
  #inptSsn;
  #inptUsername;
  #inptPassword;
  #inptConfirm;
  #btnRegister;	

  #msgFnError;
  #msgLnError;
  #msgAddressError;
  #msgCityError;
  #msgStateError;
  #msgZipError;
  #msgSsnError;
  #msgUsernameError;
  #msgPasswordError;
  #msgRepeatedPasswordError;

  constructor(page){
    this.#page = page;

    // Initialize locators
    this.#inptFirstName =  page.getByRole('textbox').nth(2);
    this.#inptLastName =  page.locator('[id="customer.lastName"]');
    this.#inptAddress =  page.locator('[id="customer.address.street"]');
    this.#inptCity = page.locator('[id="customer.address.city"]');
    this.#inptState = page.locator('[id="customer.address.state"]');
    this.#inptZip = page.locator('[id="customer.address.zipCode"]');
    this.#inptPhone = page.locator('[id="customer.phoneNumber"]');;
    this.#inptSsn = page.locator('[id="customer.ssn"]');
    this.#inptUsername = page.locator('[id="customer.username"]');;
    this.#inptPassword = page.locator('[id="customer.password"]');;
    this.#inptConfirm = page.locator('#repeatedPassword');
    this.#btnRegister = page.getByRole('button', { name: 'Register' })

    //errors
    this.#msgFnError = page.locator('[id="customer.firstName.errors"]');
    this.#msgLnError = page.locator('[id="customer.lastName.errors"]');
    this.#msgAddressError = page.locator('[id="customer.address.street.errors"]'); 
    this.#msgCityError = page.locator('[id="customer.address.city.errors"]');  
    this.#msgStateError = page.locator('[id="customer.address.state.errors"]');  
    this.#msgZipError = page.locator('[id="customer.address.zipCode.errors"]');
    this.#msgSsnError = page.locator('[id="customer.ssn.errors"]');
    this.#msgUsernameError = page.locator('[id="customer.username.errors"]');
    this.#msgPasswordError = page.locator('[id="customer.password.errors"]');
    this.#msgRepeatedPasswordError = page.locator('[id="repeatedPassword.errors"]');
   }
   
    //Action methods
    //form fields
    getFirstName(){
         return this.#inptFirstName;
    }

    getLastName(){
         return this.#inptLastName;
    }

    getStreet(){
         return this.#inptAddress;
    }            

    getCity(){
         return this.#inptCity;
    }

    getState(){
         return this.#inptState;
    }

    getZip(){
         return this.#inptZip;
    }             

    getPhone(){
         return this.#inptPhone;
    }

    getSsn(){
         return this.#inptSsn;
    }

    getUsername(){
         return this.#inptUsername;
    }

    getPassword(){
         return this.#inptPassword;
    }
    
    getConfPassword(){
         return this.#inptConfirm;
    }
              
     async clickRegisterBtn(){ 
          await this.#btnRegister.click();
    }

    async clearFormData(){
         await this.getFirstName().clear();
         await this.getLastName().clear();
         await this.getStreet().clear();
         await this.getCity().clear();
         await this.getState().clear();
         await this.getZip().clear();
         await this.getPhone().clear();
         await this.getSsn().clear();
         await this.getUsername().clear();
         await this.getPassword().clear();
         await this.getConfPassword().clear();
    }

    async performReg(
                     dataFirstName,
                     dataLastName,
                     dataStreet,
                     dataCity,
                     dataState,
                     dataZip,
                     dataPhone,
                     dataSsn,
                     dataUsername,
                     dataPassword,
                     dataConfPassword
                     ){

         await this.getFirstName().fill(dataFirstName);
         await this.getLastName().fill(dataLastName);
         await this.getStreet().fill(dataStreet);
         await this.getCity().fill(dataCity);
         await this.getState().fill(dataState);
         await this.getZip().fill(dataZip);
         await this.getPhone().fill(dataPhone);
         await this.getSsn().fill(dataSsn);
         await this.getUsername().fill(dataUsername);
         await this.getPassword().fill(dataPassword);
         await this.getConfPassword().fill(dataConfPassword);
         await this.clickRegisterBtn();
         }

         getFnError(){
              return this.#msgFnError;
         }

         getLnError(){
              return this.#msgLnError;
         }                  
         
         getStreetError(){
              return this.#msgAddressError;
         }
        
         getCityError(){
              return this.#msgCityError;
         }

         getStateError(){
              return this.#msgStateError;
         }
          
         getZipError(){
             return this.#msgZipError;
         }
         
         getSsnError(){
             return this.#msgSsnError;
         }
         
         getUsernameError(){
            return this.#msgUsernameError;
         }
         
         getPasswordError(){ 
              return this.#msgPasswordError;
         }

         getRepeatedPasswordError(){
              return this.#msgRepeatedPasswordError;
         }


    // Get all elements ending with '.errors' to use dynamically in tests
        getAllErrors() {
             return this.#page.locator('[id$=".errors"]');
      }

/**
   * Locate any error message by its text
   * @param {string} errorText 
   */
  getErrorMessageByText(errorText) {
     // Search for span element ending with .errors containing the text in parameter
     return this.#page.locator('[id$=".errors"]').getByText(errorText);
  }
}
    

