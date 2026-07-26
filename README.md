# Parabank tests

## Project description
The aim of the project is to automate functional tests for mock web based internet banking app **ParaBank** located at [**https://parabank.parasoft.com/parabank/index.htm**](./https://parabank.parasoft.com/parabank/index.htm) using **Playwright** with **JavaScript**.

**Test data** are generated randomly via custom function and saved in JSON files. The code is saved in **utils** folder.

Basic configuration including base URL is set in **playwright.config.js**

The project uses **POM** (page object model) to organize access to page element locators. For accessing the homepage and declaring the variables for each page, I have used the **fixture** saved in tests folder.

Tests are saved in **tests** folder. The app does not retain user data for a long time, so each test starts with setting the testing interface, which in this case means to initialize the database in [**Admin**](./https://parabank.parasoft.com/parabank/admin.htm) section of the tested website.

### Currently tested features:
   * Registration;
   * Login.


## User stories

### Registration
1. As a client I want to have the opportunity to register via registration form in order to be able to use bank services.
2. As an app administrator I want the registration form to require clients fill in all the fields mentioned in specifications expect phone number.
3. As an app administrator I want the registration form to reject the registration if the mandatory fields are not filled in.
4. As a client I want to see an error message if I do not fill in the mandatory field so I know why my registration fail.
5. As a client I want the mandatory fields to be marked by asterisk * so I know which of them I am expected to fill in.
6. As a client I want to receive a message on my screen  if my registration was successful so I can securely log in and do not have to register again.
7. As a client I want to receive a message on my screen know if my registration has failed so I know I have to try again.
8. As an app admin I want an app to reject an attempt to submit an empty registration form and display error message instead.
9. As an app admin I want an app to display only the error message for the data that are not supplied, so the user can supply the necessary data.

### Login
1. As a client I want to see my account with my name after sussessful login to perform operations.
2. As an admin I want the app to display the user the appropriate error message when:
   * the login details are not filled in
   * the login details do not match the ones in the database
so the user knows why he is not allowed to enter their account and can log in again.
  
4. 
5. 
6. 
