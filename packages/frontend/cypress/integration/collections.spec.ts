/// <reference types="cypress" />

describe('Collections: Listing', () => {
  it('User should see a list of collections', () => {
    cy.signIn();
    cy.visit('http://localhost:3000/collections');

    /* Check if page title is correct */
    cy.contains('Collections');

    /* Check if list of collections was rendered */
    cy.get('ul[class^=Listing]').children().should('have.length', 20);
  });
});
