/// <reference types="cypress" />

describe('Components: Listing', () => {
  it('User should see a list of components', () => {
    cy.signIn();
    cy.visit('http://localhost:3000/components');

    /* Check if page title is correct */
    cy.contains('Components');

    /* Check if no components message was rendered */
    cy.contains('There are no more components.');
  });
});
