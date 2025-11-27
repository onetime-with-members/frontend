describe('스케줄 등록', () => {
  it('스케줄 가이드 모달 표시해야 할 경우, 가이드 이미지들을 preload한다.', () => {
    cy.visit('/');

    cy.get('[data-testid="preloaded-schedule-guide-modal-1"]').should('exist');
    cy.get('[data-testid="preloaded-schedule-guide-modal-2"]').should('exist');

    cy.setCookie('schedule-guide-modal', 'false');

    cy.contains('[data-testid="preloaded-schedule-guide-modal-1"]').should(
      'not.exist',
    );
    cy.contains('[data-testid="preloaded-schedule-guide-modal-2"]').should(
      'not.exist',
    );
  });
});
