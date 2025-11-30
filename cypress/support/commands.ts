/// <reference types="cypress" />
import { Session } from '@/features/auth/types';

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

Cypress.Commands.add('login', () => {
  cy.setCookie(
    'session',
    JSON.stringify({
      accessToken: Cypress.env('token'),
      refreshToken: '',
    } satisfies Session),
  );
});

Cypress.Commands.add('logout', () => {
  cy.intercept('POST', '**/api/v1/users/logout', {
    statusCode: 200,
    body: { code: 200, is_success: true },
  }).as('logoutApi');

  cy.contains('홍').click();
  cy.contains('로그아웃').click();
  cy.wait('@logoutApi');
});

Cypress.Commands.add('visitFirstEvent', () => {
  cy.visit('/');
  cy.contains('section', '참여한 이벤트').find('.grid').find('a').eq(0).click();
});
