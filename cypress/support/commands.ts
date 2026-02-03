/// <reference types="cypress" />
import dayjs from 'dayjs';

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
  cy.request({
    url: `${Cypress.env('apiUrl')}/test/auth/login`,
    method: 'POST',
    body: {
      secret_key: Cypress.env('authSecretKey'),
    },
  }).then(
    ({
      body: {
        payload: { access_token: accessToken, refresh_token: refreshToken },
      },
    }) => {
      cy.setCookie(
        'session',
        JSON.stringify({
          accessToken,
          refreshToken,
        } satisfies Session),
      );
      cy.wrap(accessToken).as('accessToken');
      cy.wrap(refreshToken).as('refreshToken');
    },
  );
});

Cypress.Commands.add('logout', () => {
  cy.intercept('POST', '**/api/v1/users/logout', {
    statusCode: 200,
    body: { code: 200, is_success: true },
  }).as('logoutApi');

  cy.contains('테').click();
  cy.contains('로그아웃').click();
  cy.wait('@logoutApi');
});

Cypress.Commands.add('visitFirstEvent', () => {
  cy.visit('/ko');
  cy.contains('a', '이벤트 생성하기').click();

  cy.get('[placeholder="어떤 이벤트인가요?"]').type('Cypress 테스트용 이벤트');

  let currentDate = dayjs().date(29);
  Array.from({ length: 5 }).forEach(() => {
    const prevDate = currentDate;
    currentDate = currentDate.add(1, 'day');

    if (currentDate.startOf('month').diff(prevDate.startOf('month'), 'month')) {
      cy.get('button.rotate-90').find('.tabler-icon-triangle-filled').click();
    }

    cy.get('[data-testid="calendar-picker"]')
      .contains('button[aria-disabled="false"]', `${currentDate.date()}`)
      .trigger('mousedown')
      .trigger('mousemove')
      .trigger('mouseup');
  });

  cy.contains('button', '이벤트 생성하기').click();
  cy.wait(1000);
});

Cypress.Commands.add('removeFirstEvent', () => {
  cy.login();
  cy.reload();
  cy.visit('/');
  cy.contains('section', '참여한 이벤트')
    .find('.grid')
    .contains('a', 'Cypress 테스트용 이벤트')
    .click();
  cy.get('svg.trash-icon').click();
  cy.contains('button', '삭제').click();
});
