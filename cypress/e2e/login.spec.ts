import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { login } from '../support/pageObjects/login';

// Mobile View Port
// beforeEach(() => {
//   cy.viewport('iphone-x');
// });

// Login Test Cases
Given('User navigates to the to Swag Labs web page', () => {
  cy.visit('/');
});

When('User enters {string} and {string}', (username: string, password: string) => {
  if (username === '' && password === '') {
    cy.log('No username or password to enter!');
  } else if (username === '') {
    login.enterPassword(password);
  } else if (password === '') {
    login.enterUsername(username);
  } else {
    login.enterUsernameAndPassord(username, password);
  }
});

When('User clicks on Sign In button', () => {
  login.clickOnSignInButton();
});

Then('User should land on the {string} page', (landingPage: string) => {
  login.verifyLandingPage(landingPage);
});

// Navigation Test Case
Then('User should navigate through the product catalog', () => {
  login.navigateThroughProductCatalog();
});
