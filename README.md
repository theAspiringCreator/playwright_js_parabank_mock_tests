# Parabank tests

## Project description
The aim of the project is to automate functional tests for mock web based internet banking app **ParaBank** located at [**https://parabank.parasoft.com/parabank/index.htm**](./https://parabank.parasoft.com/parabank/index.htm) using **Playwright** with **JavaScript**.

**Test data** are generated randomly via custom function and saved in JSON files. The code is saved in **utils** folder.

Basic configuration including base URL is set in **playwright.config.js**

The project uses **POM** (page object model) to organize access to page element locators. For accessing the homepage and declaring the variables for each page, I have used the **fixture** saved in tests folder.

Tests are saved in **tests** folder. The app does not retain user data for a long time, so each test starts with setting the testing interface, which in this case means to initialize the database in [**Admin**](./https://parabank.parasoft.com/parabank/admin.htm) section of the tested website.

### Currently tested features:
   * Registration;
   * Login;
   * Open account.

### Running tests via command line:
To enable random data creation, which is loaded in file package.json, follow this steps:
1. Navigate to **tests** directory.
2. Run command **npm run test** * *file name including the extension* *
   Example:    **npm run test** * *regTests.spec.js* *

## User stories

### Registration
1. As a client I want to register via registration form in order to be able to use bank services.
2. As a bank clerk I want the registration form to contain mandatory fields mentioned in specifications and phone number as an optional field.
3. As a bank clerk I want the registration form to reject the registration if the mandatory fields are not filled in.
4. As a client I want to see an error message if I do not fill in the mandatory field so I know why my registration fail.
5. As a client I want the mandatory fields to be marked by asterisk * so I know which of them I am expected to fill in.
6. As a client I want to receive a message on my screen  if my registration was successful so I can securely log in and do not have to register again.
7. As a bank clerk I want an app to reject an attempt to submit an empty registration form and display error message instead.


### Login
1. As a bank clerk I want an app to require username and password to verify user's identity.
2. As a client I want to see my account with my name after successful login to perform operations.
3. As a bank clerk I want the app to display the user the appropriate error message (see specifications) when the login details are not filled in
4. As a user I want the app to  display the appropriate error message (see specifications) when the login details are not correct so I know why I my account page is not displayed to me
  
### Open Account
1. As a logged in client I want to be able to open a checking account.
2. As a logged in client I want to be able to open a savings account.
3. As a bank clerk I want an app to display a message each time a checking account is successfully created.
4. As a bank clerk I want an app to display a message each time a savings account is successfully created.
5. As a bank clerk I want an app to display correct account numbers, balances, amounts available, total amount and disclaimer (for text see specifications).
   
