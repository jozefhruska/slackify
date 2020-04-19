/// <reference types="cypress" />

describe('Authentication', () => {
  it('Unauthenticated user should see "Sign in with Slack" button', () => {
    cy.visit('http://localhost:3000/');

    const signInButton = cy.get('#sign-in-button');

    signInButton.should('exist');
  });

  it('Authenticated user should see dashboard', () => {
    cy.signIn();
    cy.visit('http://localhost:3000/');

    cy.contains('Dashboard');
  });
});
