import { Checkout } from '../locators/checkout';
import { Login } from '../locators/login';
import { faker } from '@faker-js/faker';
import { login } from './login';

class CheckoutPO {
  /**
   * @description Click on first Add to cart button.
   * @author Emmanuel
   */
  clickOnFirstAddToCartButton(): void {
    cy.contains(Checkout.ADD_TO_CART_BUTTON).first().should('be.visible').and('be.enabled').click();
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
   * @description Verify multiple items were added to the cart and cart was updated correctly.
   * @author Emmanuel
   */
  verifyMultipleItemsWereAddedToTheCart(): void {
    cy.get(Login.INVENTORY_DIV)
      .children()
      .should('have.length', 6)
      .then(() => {
        // Add first item to the cart
        cy.get(Checkout.BACKPACK_CART_BUTTON).click();
        this.verifyItemWasAddedToTheCart('1');
        // Add second item to the cart
        cy.get(Checkout.BIKELIGHT_CART_BUTTON).click();
        this.verifyItemWasAddedToTheCart('2');
        // Add third item to the cart
        cy.get(Checkout.BOLTTSHIRT_CART_BUTTON).click();
        this.verifyItemWasAddedToTheCart('3');
        // Add fourth item to the cart
        cy.get(Checkout.FLEECEJACKET_CART_BUTTON).click();
        this.verifyItemWasAddedToTheCart('4');
        // Add fifth item to the cart
        cy.get(Checkout.ONESIE_CART_BUTTON).click();
        this.verifyItemWasAddedToTheCart('5');
        // Add sixth item to the cart
        cy.get(Checkout.REDTSHIRT_CART_BUTTON).click();
        this.verifyItemWasAddedToTheCart('6');
      });
  }

  /**
   * @description Verify multiple items were removed from the cart and it was updated correctly.
   * @author Emmanuel
   */
  verifyItemsWereRemovedFromTheCart(): void {
    // Remove first item from the cart
    cy.get(Checkout.REMOVE_BACKPACK_BUTTON)
      .scrollIntoView()
      .should('be.visible')
      .and('be.enabled')
      .click();
    this.verifyItemWasRemovedFromTheCart('5');
    // Remove second item from the cart
    cy.get(Checkout.REMOVE_BIKELIGHT_BUTTON)
      .scrollIntoView()
      .should('be.visible')
      .and('be.enabled')
      .click();
    this.verifyItemWasRemovedFromTheCart('4');
    // Remove third item from the cart
    cy.get(Checkout.REMOVE_BOLTTSHIRT_BUTTON)
      .scrollIntoView()
      .should('be.visible')
      .and('be.enabled')
      .click();
    this.verifyItemWasRemovedFromTheCart('3');
    // Remove second item from the cart
    cy.get(Checkout.REMOVE_FLEECEJACKET_BUTTON)
      .scrollIntoView()
      .should('be.visible')
      .and('be.enabled')
      .click();
    this.verifyItemWasRemovedFromTheCart('2');
    // Remove first item from the cart
    cy.get(Checkout.REMOVE_ONESIE_BUTTON)
      .scrollIntoView()
      .should('be.visible')
      .and('be.enabled')
      .click();
    this.verifyItemWasRemovedFromTheCart('1');
    // Remove second item from the cart
    cy.get(Checkout.REMOVE_REDTSHIRT_BUTTON)
      .scrollIntoView()
      .should('be.visible')
      .and('be.enabled')
      .click();
    this.verifyItemWasRemovedFromTheCart('');
  }

  /**
   * @description Check items quantity in the cart.
   * @param quantity - Number should be displayed in the cart
   * @author Emmanuel
   */
  verifyItemWasRemovedFromTheCart(quantity: string): void {
    if (quantity === '') {
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
    cy.get(Checkout.CART_ICON).should('be.visible').click();
  }

  /**
   * @description Click on Checkout button.
   * @author Emmanuel
   */
  clickOnCheckoutButton(): void {
    cy.get(Checkout.CHECKOUT_BUTTON).should('be.visible').and('be.enabled').click();
  }

  /**
   * @description Enter First Name, Last Name and Postal Code.
   * @author Emmanuel
   */
  enterCheckoutMandatoryInfo(): void {
    cy.get(Checkout.FIRST_NAME_TXTBOX).should('be.visible').type(faker.person.firstName());
    cy.get(Checkout.LAST_NAME_TXTBOX).should('be.visible').type(faker.person.lastName());
    cy.get(Checkout.POSTAL_CODE_TXTBOX).should('be.visible').type(faker.location.zipCode());
  }

  /**
   * @description Click on Continue button.
   * @author Emmanuel
   */
  clickOnContinueButton(): void {
    cy.get(Checkout.CONTINUE_BUTTON).should('be.visible').and('be.enabled').click();
  }

  /**
   * @description Get sum of the price of all items added to the cart.
   * @author Emmanuel
   */
  getItemsTotal(): Cypress.Chainable<number> {
    let itemPriceTotal: number = 0;

    return cy
      .get(Checkout.CART_LIST_DIV)
      .find(Checkout.CART_ITEMS)
      .then(($items) => {
        const promises = [];

        for (let i = 0; i < $items.length; i++) {
          const itemPricePromise = cy
            .wrap($items)
            .get(Checkout.ITEM_PRICE_DIV)
            .eq(i)
            .then(($el) => {
              // Get items sum price
              const str: string = $el.text();
              const itemPriceStr: string = str.replace('$', '');
              const itemPrice: number = parseFloat(itemPriceStr);
              itemPriceTotal += itemPrice;
            });

          promises.push(itemPricePromise);
        }

        // Wait for all promises to resolve, and return the final total
        return cy.wrap(Promise.all(promises)).then(() => {
          return itemPriceTotal; // Return final sum as a number
        });
      });
  }

  /**
   * @description Verify order info is correct.
   * @author Emmanuel
   */
  verifyOrderInfoIsCorrect(): void {
    cy.get(Checkout.TAXES_DIV).then(($el) => {
      // Get tax amount
      const str: string = $el.text();
      const taxStr: string = str.replace(/Tax: \$/g, '');
      const tax: number = parseFloat(taxStr);
      cy.get(Checkout.TOTAL_DIV).then(($el) => {
        // Calculate and assert total amount
        const str: string = $el.text();
        const totalStr: string = str.replace(/Total: \$/g, '');
        const total: number = parseFloat(totalStr);

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
    cy.get(Checkout.FINISH_BUTTON).should('be.visible').and('be.enabled').click();
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
