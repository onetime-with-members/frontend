describe('이벤트', () => {
  it('이벤트 페이지에서 유저에게는 수정과 삭제 버튼이 모두 보이고, 로그아웃하면 수정 버튼만 보인다.', () => {
    cy.login();
    cy.visitFirstEvent();

    cy.get('header').find('button').eq(1).should('exist');

    cy.logout();

    cy.get('header').find('button').eq(1).should('not.exist');
  });
});
