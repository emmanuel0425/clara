import { Login } from '../locators/login';
import { checkout } from './checkout';
import { typeIntoField } from '../../e2e/utils/form-utils';

class LoginPO {
  /**
   * @description Verify user lands on correct page.
   * @param landingPage Name of element to be visible on page
   * @author Emmanuel
   */
  verifyLandingPage(landingPage: string): void {
    cy.contains(landingPage).should('be.visible');
  }

  /**
   * @description Enter Username and Password credentials.
   * @param username User's username
   * @param password User's password
   * @author Emmanuel
   */
  enterUsernameAndPassword(username: string, password: string): void {
    typeIntoField(Login.USERNAME_TXTBOX, username);
    typeIntoField(Login.PASSWORD_TXTBOX, password);
  }

  /**
   * @description Enter User's Username.
   * @param username User's username
   * @author Emmanuel
   */
  enterUsername(username: string): void {
    typeIntoField(Login.USERNAME_TXTBOX, username);
  }

  /**
   * @description Enter User's Password.
   * @param password User's password
   * @author Emmanuel
   */
  enterPassword(password: string): void {
    typeIntoField(Login.PASSWORD_TXTBOX, password);
  }

  /**
   * @description Click on Sign in button.
   * @author Emmanuel
   */
  clickOnSignInButton(): void {
    cy.contains(Login.SIGN_IN_BUTTON).should('be.visible').and('be.enabled').click();
  }

  /**
   * @description Navigation through the product catalog.
   * @author Emmanuel
   */
  navigateThroughProductCatalog(): void {
    cy.get(Login.INVENTORY_DIV)
      .children()
      .should('have.length', 6)
      .each(($el, index) => {
        cy.get(`#item_${index}_title_link`).then(($link) => {
          const itemTitle: string = $link.text();
          cy.wrap($link).scrollIntoView().click();

          cy.get(Login.ITEM_TITLE_TEXT).should('have.text', itemTitle);
          cy.contains(Login.BACK_TO_PRODUCTS_BUTTON).should('be.visible').click();

          cy.fixture('login').then((data) => {
            cy.get(Login.HOME_PAGE_TITLE).invoke('text').should('eq', data.title);
          });
        });
      });
  }
}

export const login: LoginPO = new LoginPO();
