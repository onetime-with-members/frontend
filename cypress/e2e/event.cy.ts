describe('이벤트', () => {
  it('이벤트 페이지에서 유저에게는 수정과 삭제 버튼이 모두 보이고, 로그아웃하면 수정 버튼만 보인다.', () => {
    cy.intercept('POST', '**/api/v1/users/logout', {
      statusCode: 200,
      body: { code: 200, is_success: true },
    }).as('logoutApi');
    cy.login();
    cy.visit('/');
    cy.contains('section', '참여한 이벤트')
      .find('.grid')
      .find('a')
      .eq(0)
      .click();

    cy.get('header').find('button').eq(1).should('exist');

    cy.contains('한').click();
    cy.contains('로그아웃').click();
    cy.wait('@logoutApi');

    cy.get('header').find('button').eq(1).should('not.exist');
  });
});
