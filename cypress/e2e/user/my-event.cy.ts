import { myEventList, myEventsResponseList } from '../../fixtures/my-event';

describe('대시보드 페이지 참여한 이벤트 섹션', () => {
  [0, 1, 4].forEach((n) => {
    const myEventListLength = n === 4 ? 2 : n;

    it(`참여한 이벤트가 ${myEventListLength}개로 표시된다.`, () => {
      cy.intercept(
        {
          method: 'GET',
          url: '**/events/user/all*',
          query: {
            size: '4',
          },
        },
        myEventList({ size: n }),
      );
      cy.login();
      cy.visit('/ko');
      if (n === 0) {
        cy.contains('아직 참여한 이벤트가 없어요.').should('exist');
      } else {
        cy.get('[data-testid="my-event"]').should(
          'have.length',
          myEventListLength,
        );
      }
    });
  });
});

describe('참여한 이벤트 페이지', () => {
  it('참여한 이벤트의 무한 스크롤이 올바르게 작동한다.', () => {
    cy.intercept(
      {
        method: 'GET',
        url: '**/events/user/all*',
        query: {
          size: '4',
        },
      },
      myEventsResponseList[0],
    );
    cy.intercept(
      {
        method: 'GET',
        url: '**/events/user/all*',
        query: {
          size: '4',
          cursor: '2025-12-24T17:07:35.064',
        },
      },
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
