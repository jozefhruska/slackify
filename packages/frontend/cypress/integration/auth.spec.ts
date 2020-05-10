/// <reference types="cypress" />

describe('Authentication', () => {
  it('Unauthenticated user should see "Add to Slack" and "Sign in with Slack" button', () => {
    cy.visit('http://localhost:3000/');

    const addToSlack = cy.get('#add-to-slack');
    addToSlack.should('exist');

    const signInButton = cy.get('#sign-in-with-slack');
    signInButton.should('exist');
  });

  it('Authenticated user should see dashboard', () => {
    cy.signIn();
    cy.visit('http://localhost:3000/');

    cy.contains('Dashboard');
  });
});
