import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { checkout } from '../support/pageObjects/checkout';
import { Checkout } from '../support/locators/checkout';

// Adding one item to the cart
When('User clicks on Add to cart button', () => {
  checkout.clickOnFirstAddToCartButton();
});

Then('One item should be added to the cart', () => {
  checkout.verifyItemWasAddedToTheCart('1');
});

// Removing one item from the cart
When('User clicks on Remove button', () => {
  checkout.clickOnFirstRemoveButton();
});

Then('One item should should be removed from the cart', () => {
  checkout.verifyItemWasRemovedFromTheCart('');
});

// Adding multiple items to the cart
Then('User should be able to add multiple items to the cart', () => {
  checkout.verifyMultipleItemsWereAddedToTheCart();
});

// Removing multiple items to the cart
Then('User should be able to remove multiple items from the cart', () => {
  checkout.verifyItemsWereRemovedFromTheCart();
});

// Completing checkout for one item
When('User clicks on Cart icon', () => {
  checkout.clickOnCartIcon();
});

When('User clicks on Checkout button', () => {
  checkout.clickOnCheckoutButton();
});

Then('User completes required info', () => {
  checkout.enterCheckoutMandatoryInfo();
});

When('User clicks on Continue button', () => {
  checkout.clickOnContinueButton();
});

Then('User reviews order info', () => {
  checkout.verifyOrderInfoIsCorrect();
});

When('User clicks on Finish button', () => {
  checkout.clickOnFinishButton();
});

Then('The Order Confirmation page should be displayed to the user', () => {
  checkout.verifyUserLandedOnOrderConfirmationPage();
});
