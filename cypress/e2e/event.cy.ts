import { exampleEventList } from '../fixtures/event';

describe('이벤트', () => {
  it('이벤트 페이지에서 유저에게는 수정과 삭제 버튼이 모두 보이고, 로그아웃하면 수정 버튼만 보인다.', () => {
    cy.login();
    cy.visitFirstEvent();

    cy.get('header').find('button').eq(1).should('exist');
    cy.logout();
    cy.get('header').find('button').eq(1).should('not.exist');

    cy.removeFirstEvent();
  });

  describe('사용 사례 이벤트', () => {
    exampleEventList.forEach(
      ({ name, slug, title, recommendedTimes, participants }) => {
        it.only(`푸터에 있는 사용 사례 링크들 중 ${name} 링크를 클릭하면, ${name} 예시 이벤트 페이지로 이동된다.`, () => {
          cy.visit('/ko');
          cy.get('footer').contains('a', name).click();
          cy.location('pathname').should('contain', `/events/${slug}`);
          cy.get('header').find('h1').should('contain', title);
          recommendedTimes.forEach(({ date, time }) => {
            cy.contains('h2', date).should('exist');
            cy.contains('h3', time).should('exist');
          });
          cy.get('ul[date-testid="participant-list"]').as('participantList');
          participants.forEach((participant) => {
            cy.get('@participantList').contains(participant).should('exist');
          });
        });
      },
    );
  });
});
