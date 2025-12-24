import { myEventsResponseList } from '../../fixtures/my-event';

describe('참여한 이벤트 페이지', () => {
  it('참여한 이벤트의 무한 스크롤이 올바르게 작동한다.', () => {
    cy.intercept('GET', '**/events/user/all*', myEventsResponseList[0]);
    cy.intercept(
      'GET',
      '**/events/user/all*cursor=2025-12-24T17:07:35.064*',
      myEventsResponseList[1],
    );
    cy.login();
    cy.visit('/mypage/events');

    cy.get('[data-testid="desktop-tab-layout"]')
      .find('[data-testid="my-event-list"]')
      .find('a[data-testid="my-event"]')
      .as('allMyEvents');
    cy.get('[data-testid="desktop-tab-layout"]')
      .find('[data-testid="infinite-scroll-trigger"]')
      .as('infiniteScrollTrigger');

    cy.get('@allMyEvents').should('have.length', 4);
    cy.get('@infiniteScrollTrigger').scrollIntoView();
    cy.get('@allMyEvents').should('have.length', 8);
  });
});
