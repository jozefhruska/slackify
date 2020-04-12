/// <reference types="cypress" />

describe('Sign in', () => {
  it('Visits sign in page', () => {
    cy.visit('http://localhost:3000/');
  });
});
