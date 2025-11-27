describe('스케줄 등록', () => {
  it('스케줄 가이드 모달 표시해야 할 경우, 가이드 이미지들을 preload한다.', () => {
    cy.visit('/');

    cy.get('[data-testid="schedule-guide-modal-1-preload"]').should('exist');
    cy.get('[data-testid="schedule-guide-modal-2-preload"]').should('exist');

    cy.setCookie('schedule-guide-modal', 'false');

    cy.contains('[data-testid="schedule-guide-modal-1-preload"]').should(
      'not.exist',
    );
    cy.contains('[data-testid="schedule-guide-modal-2-preload"]').should(
      'not.exist',
    );
  });

  it('언어 설정에 따라 각 언어에 맞는 가이드 이미지들이 preload된다.', () => {
    cy.visit('/ko/landing');

    cy.get('[data-testid="schedule-guide-modal-1-preload"]')
      .invoke('attr', 'src')
      .then((src) => {
        expect(src).to.contain('schedule-modal-1-ko.png');
      });
    cy.get('[data-testid="schedule-guide-modal-2-preload"]')
      .invoke('attr', 'src')
      .then((src) => {
        expect(src).to.contain('schedule-modal-2-ko.png');
      });

    cy.visit('/en/landing');

    cy.get('[data-testid="schedule-guide-modal-1-preload"]')
      .invoke('attr', 'src')
      .then((src) => {
        expect(src).to.contain('schedule-modal-1-en.png');
      });
    cy.get('[data-testid="schedule-guide-modal-2-preload"]')
      .invoke('attr', 'src')
      .then((src) => {
        expect(src).to.contain('schedule-modal-2-en.png');
      });
  });
});
