/// <reference types="cypress" />

describe('Collections: Listing', () => {
  beforeEach(() => {
    cy.signIn();
    cy.visit('http://localhost:3000/collections');
  });

  it('User should see a list of collections', () => {
    /* Check if page title is correct */
    cy.contains('Collections');

    /* Check if list of collections was rendered */
    cy.get('ul[class^=Listing]').children().should('have.length', 20);
  });

  it('Click on "View" should lead to component detail page', () => {
    /* Get first item in listing */
    cy.get('ul[class^=Listing]')
      .children()
      .first()
      .within(() => {
        /* Click on "View" button */
        cy.get('button').first().click();
      });

    /* Check if URL is correct */
    cy.url().should('match', /\/collections\/*/);
  });

  it('Click on "More" should display popper button', () => {
    /* Get first item in listing */
    cy.get('ul[class^=Listing]')
      .children()
      .first()
      .within(() => {
        /* Click on "View" button */
        cy.get('button').last().click();

        /* Check if Popper button content is rendered */
        cy.get('div[class^=PopperButtonstyles__PopperWrapper]').children().should('have.length', 3);
      });
  });

  it('Click on "Publish" button should update component', () => {
    /* Get first item in listing */
    cy.get('ul[class^=Listing]')
      .children()
      .first()
      .within(() => {
        /* Click on "View" button */
        cy.get('button').last().click();

        cy.get('div[class^=PopperButtonstyles__PopperWrapper]').within(() => {
          /* Click on "Publish" button */
          cy.get('button').first().click();
        });

        /* Check if update time was changed */
        cy.contains('a few seconds ago');
      });
  });

  it('Click on "Update" button should show an update modal', () => {
    /* Get first item in listing */
    cy.get('ul[class^=Listing]')
      .children()
      .first()
      .within(() => {
        /* Click on "View" button */
        cy.get('button').last().click();

        cy.get('div[class^=PopperButtonstyles__PopperWrapper]').within(() => {
          /* Click on "Update" button */
          cy.get('button').eq(1).click();
        });
      });

    cy.get('div[class^=Modalstyles__Wrapper]').contains('Update collection');
  });

  it('Click on "Delete" button should delete a collection', () => {
    /* Get first item in listing */
    cy.get('ul[class^=Listing]')
      .children()
      .first()
      .within(() => {
        /* Click on "View" button */
        cy.get('button').last().click();

        cy.get('div[class^=PopperButtonstyles__PopperWrapper]').within(() => {
          /* Click on "Delete" button */
          cy.get('button').last().click();
        });

        cy.wait(1000);
      });

    /* Check if collection was deleted */
    cy.get('ul[class^=Listing]').children().should('have.length', 19);
  });
});
