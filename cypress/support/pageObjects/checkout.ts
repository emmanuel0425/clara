import { Checkout } from '../locators/checkout';
import { Login } from '../locators/login';
import { faker } from '@faker-js/faker';
import { login } from './login';
import { typeIntoField } from '../../e2e/utils/form-utils';

class CheckoutPO {
  // Properties to store form data for validation
  firstName: string = '';
  lastName: string = '';
  zipCode: string = '';

  /**
   * @description Click on first Add to cart button.
   * @author Emmanuel
   */
  clickOnFirstAddToCartButton(): void {
    cy.contains(Checkout.ADD_TO_CART_BUTTON).first().should('be.visible').and('be.enabled').click();
  }

  /**
   * @description Click on element.
   * @param selector Selector of element to click on
   * @author Emmanuel
   */
  clickOnElement(selector: string): void {
    cy.get(selector).scrollIntoView().should('be.visible').click();
  }

  /**
   * @description Verify one item was added to the cart and cart was updated correctly.
   * @param quantity - Number should be displayed in the cart
   * @author Emmanuel
   */
  verifyItemWasAddedToTheCart(quantity: string): void {
    cy.get(Checkout.CART_ICON)
      .find(Checkout.CART_AMOUNT)
      .then(($el) => {
        cy.wrap($el).should('have.class', 'shopping_cart_badge');

        const amount: string = $el.text();
        expect(amount).to.eq(quantity);
      });
  }

  /**
   * @description Click on first Remove button.
   * @author Emmanuel
   */
  clickOnFirstRemoveButton(): void {
    cy.contains(Checkout.REMOVE_BUTTON).first().should('be.visible').and('be.enabled').click();
  }

  /**
   * @description Add an item to the cart.
   * @param selector Selector to locate element to click on
   * @param expectedQuantity Number of the expected amount of items in the cart
   * @author Emmanuel
   */
  addItemToCart(selector: string, expectedQuantity: string): void {
    this.clickOnElement(selector);
    this.verifyItemWasAddedToTheCart(expectedQuantity);
  }

  /**
   * @description Remove an item from the cart.
   * @param selector Selector to locate element to click on
   * @param expectedQuantity Number of the expected amount of items in the cart
   * @author Emmanuel
   */
  removeItemFromCart(selector: string, expectedQuantity: string): void {
    this.clickOnElement(selector);
    this.verifyItemWasRemovedFromTheCart(expectedQuantity);
  }

  /**
   * @description Verify multiple items were added to the cart and cart was updated correctly.
   * @author Emmanuel
   */
  verifyMultipleItemsWereAddedToTheCart(): void {
    const cartButtons: string[] = [
      Checkout.BACKPACK_CART_BUTTON,
      Checkout.BIKELIGHT_CART_BUTTON,
      Checkout.BOLTTSHIRT_CART_BUTTON,
      Checkout.FLEECEJACKET_CART_BUTTON,
      Checkout.ONESIE_CART_BUTTON,
      Checkout.REDTSHIRT_CART_BUTTON,
    ];

    cy.get(Login.INVENTORY_DIV)
      .children()
      .should('have.length', cartButtons.length)
      .then(() => {
        cartButtons.forEach((selector, index) => {
          this.addItemToCart(selector, (index + 1).toString());
        });
      });
  }

  /**
   * @description Verify multiple items were removed from the cart and it was updated correctly.
   * @author Emmanuel
   */
  verifyItemsWereRemovedFromTheCart(): void {
    const removeButtons: string[] = [
      Checkout.REMOVE_BACKPACK_BUTTON,
      Checkout.REMOVE_BIKELIGHT_BUTTON,
      Checkout.REMOVE_BOLTTSHIRT_BUTTON,
      Checkout.REMOVE_FLEECEJACKET_BUTTON,
      Checkout.REMOVE_ONESIE_BUTTON,
      Checkout.REMOVE_REDTSHIRT_BUTTON,
    ];

    removeButtons.forEach((selector, index) => {
      // Calculate expected quantity after removal
      const remainingQuantity: number = removeButtons.length - (index + 1);
      const expected: string = remainingQuantity === 0 ? '' : remainingQuantity.toString();

      this.removeItemFromCart(selector, expected);
    });
  }

  /**
   * @description Check items quantity in the cart.
   * @param quantity - Number should be displayed in the cart
   * @author Emmanuel
   */
  verifyItemWasRemovedFromTheCart(quantity: string): void {
    if (!quantity) {
      cy.get(Checkout.CART_ICON).then(($el) => {
        const amount: string = $el.text();
        expect(amount).to.eq(quantity);
        cy.wrap($el).should('not.have.class', 'shopping_cart_badge');
      });
    } else {
      cy.get(Checkout.CART_AMOUNT).then(($el) => {
        const amount: string = $el.text();
        expect(amount).to.eq(quantity);
        cy.wrap($el).should('have.class', 'shopping_cart_badge');
      });
    }
  }

  /**
   * @description Click on Cart icon.
   * @author Emmanuel
   */
  clickOnCartIcon(): void {
    this.clickOnElement(Checkout.CART_ICON);
  }

  /**
   * @description Click on Checkout button.
   * @author Emmanuel
   */
  clickOnCheckoutButton(): void {
    this.clickOnElement(Checkout.CHECKOUT_BUTTON);
  }

  /**
   * Generates fake but valid user data for form submission.
   * @author Emmanuel
   */
  generateFakeUserData(): void {
    this.firstName = faker.person.firstName();
    this.lastName = faker.person.lastName();
    this.zipCode = faker.location.zipCode();
  }

  /**
   * @description Enter First Name, Last Name and Postal Code.
   * @author Emmanuel
   */
  enterCheckoutMandatoryInfo(): void {
    this.generateFakeUserData();

    typeIntoField(Checkout.FIRST_NAME_TXTBOX, this.firstName);
    typeIntoField(Checkout.LAST_NAME_TXTBOX, this.lastName);
    typeIntoField(Checkout.POSTAL_CODE_TXTBOX, this.zipCode);
  }

  /**
   * @description Click on Continue button.
   * @author Emmanuel
   */
  clickOnContinueButton(): void {
    this.clickOnElement(Checkout.CONTINUE_BUTTON);
  }

  /**
   * @description Get sum of the price of all items added to the cart.
   * @author Emmanuel
   */
  getItemsTotal(): Cypress.Chainable<number> {
    let total = 0;
    return cy
      .get(Checkout.ITEM_PRICE_DIV)
      .each(($el) => {
        const price: number = parseFloat($el.text().replace('$', ''));
        total += price;
      })
      .then(() => total);
  }

  /**
   * @description Verify order info is correct.
   * @author Emmanuel
   */
  verifyOrderInfoIsCorrect(): void {
    cy.get(Checkout.TAXES_DIV).then(($el) => {
      // Get tax amount
      const tax: number = parseFloat($el.text().replace(/Tax: \$/g, ''));
      cy.get(Checkout.TOTAL_DIV).then(($el) => {
        // Calculate and assert total amount
        const total: number = parseFloat($el.text().replace(/Total: \$/g, ''));

        // Call the getItemsTotal function to assert items total amount is correct
        this.getItemsTotal().then(($itemsTotal) => {
          expect(total).to.eq(tax + $itemsTotal);
        });
      });
    });
  }

  /**
   * @description Click on Finish button.
   * @author Emmanuel
   */
  clickOnFinishButton(): void {
    this.clickOnElement(Checkout.FINISH_BUTTON);
  }

  /**
   * @description Verify user landed on Order Confirmation page.
   * @author Emmanuel
   */
  verifyUserLandedOnOrderConfirmationPage(): void {
    cy.fixture('checkout').then((data) => {
      login.verifyLandingPage(data.orderConfirmationMsg);
    });
  }
}

export const checkout: CheckoutPO = new CheckoutPO();
