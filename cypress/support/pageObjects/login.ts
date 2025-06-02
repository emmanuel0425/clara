import { Login } from '../locators/login';

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
  enterUsernameAndPassord(username: string, password: string): void {
    cy.get(Login.USERNAME_TXTBOX).should('be.visible').type(username);
    cy.get(Login.PASSWORD_TXTBOX).should('be.visible').type(password);
  }

  /**
   * @description Enter User's Username.
   * @param username User's username
   * @author Emmanuel
   */
  enterUsername(username: string): void {
    cy.get(Login.USERNAME_TXTBOX).should('be.visible').type(username);
  }

  /**
   * @description Enter User's Password.
   * @param password User's password
   * @author Emmanuel
   */
  enterPassword(password: string): void {
    cy.get(Login.PASSWORD_TXTBOX).should('be.visible').type(password);
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
      .then(($elements) => {
        for (let i = 0; i < $elements.length; i++) {
          cy.get(`#item_${i}_title_link`).then(($el) => {
            // Get title text for each item
            const itemTitle: string = $el.text();

            cy.wrap($el).scrollIntoView().click();
            // Assert selected item is the same
            cy.get(Login.ITEM_TITLE_TEXT).should('have.text', itemTitle);

            cy.contains(Login.BACK_TO_PRODUCTS_BUTTON).should('be.visible').click();
            cy.fixture('login').then((data) => {
              // Assert user naviagates back to Home Page to continue navigation until the last item
              cy.get(Login.HOME_PAGE_TITLE).invoke('text').should('eq', data.title);
            });
          });
        }
      });
  }
}

export const login: LoginPO = new LoginPO();
