/**
 * @description Types a value into an input field with visibility and value checks.
 * @param selector Selector lo locate
 * @param value Text to be typed into the field
 * @author Emmanuel
 */
export function typeIntoField(selector: string, value: string): void {
  cy.get(selector).should('be.visible').type(value).should('have.value', value);
}
