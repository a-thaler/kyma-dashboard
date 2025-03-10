/// <reference types="cypress" />
import 'cypress-file-upload';

const FUNCTION_NAME = 'test-function';
const FUNCTION_RECEIVER_NAME = 'in-cluster-eventing-receiver';
const API_RULE_AND_FUNCTION_NAME = 'in-cluster-eventing-publisher';

context('Prepare funtions for testing', () => {
  before(() => {
    cy.loginAndSelectCluster();
    cy.goToNamespaceDetails();
  });

  it('Create a simple Function', () => {
    cy.createSimpleFunction(FUNCTION_NAME);
  });

  it('Create a receiver Function', () => {
    cy.createFunction(
      FUNCTION_RECEIVER_NAME,
      'fixtures/in-cluster-eventing-receiver.js',
      'fixtures/in-cluster-eventing-receiver-dependencies.json',
    );
  });

  it('Create a publisher Function', () => {
    cy.createFunction(
      API_RULE_AND_FUNCTION_NAME,
      'fixtures/in-cluster-eventing-publisher.js',
      'fixtures/in-cluster-eventing-publisher-dependencies.json',
    );
  });

  // edit test case is the last one because of the following error:
  // "the object has been modified; please apply your changes to the latest
  // version and try again"
  // you must wait for the function to remain unchanged
  it('Edit a simple test Function and check updated runtime', () => {
    cy.getLeftNav()
      .contains('Functions', { includeShadowDom: true })
      .click();

    cy.contains(FUNCTION_NAME).click();

    cy.contains('button', 'Edit').click();

    cy.get('[aria-label="Combobox input arrow"]:visible')
      .eq(2)
      .click();

    cy.contains('Node.js 16').click();

    cy.get('[role=dialog]')
      .contains('button', 'Update')
      .click();

    cy.contains('Node.js 16').should('be.visible');
  });
});
