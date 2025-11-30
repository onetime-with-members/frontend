describe('스케줄 등록', () => {
  it('회원일 경우, 첫 접속 시에 스케줄 가이드 모달이 보여지고 이후 접속 시에는 보여지지 않는다.', () => {
    cy.login();
    cy.visitFirstEvent();
    cy.contains('button', '스케줄 추가').click();

    cy.getCookie('schedule-guide-modal').should('not.exist');
    cy.get('[data-testid="schedule-guide-modal"]').should('exist');

    cy.get('[data-testid="schedule-guide-modal"]')
      .find('.tabler-icon-x')
      .click();
    cy.get('[data-testid="schedule-new-desktop-header"]')
      .find('.tabler-icon-chevron-left')
      .click();

    cy.contains('button', '스케줄 추가').click();

    cy.getCookie('schedule-guide-modal').should('exist');
    cy.get('[data-testid="schedule-guide-modal"]').should('not.exist');
  });

  // it('회원일 경우, 첫 접속 시에 스케줄 가이드 모달이 보여지고 이후 접속 시에는 보여지지 않는다.', () => {
  //   cy.login();
  //   cy.visitFirstEvent();
  //   cy.contains('button', '스케줄 추가').click();

  //   cy.getCookie('schedule-guide-modal').should('not.exist');
  //   cy.get('[data-testid="schedule-guide-modal"]').should('exist');

  //   cy.get('[data-testid="schedule-guide-modal"]')
  //     .find('.tabler-icon-x')
  //     .click();
  //   cy.get('[data-testid="schedule-new-desktop-header"]')
  //     .find('.tabler-icon-chevron-left')
  //     .click();

  //   cy.contains('button', '스케줄 추가').click();

  //   cy.get('[data-testid="schedule-guide-modal"]').should('not.exist');
  //   cy.getCookie('schedule-guide-modal').should('exist');

  //   cy.request({
  //     url: `${Cypress.env('apiUrl')}/users/guides/view-status`,
  //     method: 'DELETE',
  //     headers: {
  //       Authorization: `Bearer ${Cypress.env('token')}`,
  //     },
  //     body: {
  //       guide_type: 'SCHEDULE_GUIDE_MODAL_001',
  //     },
  //   });
  // });

  it('비회원일 경우, 첫 접속 시에 스케줄 가이드 모달이 보여지고 이후 접속 시에는 보여지지 않는다.', () => {
    cy.login();
    cy.visitFirstEvent();
    cy.wait(2000);
    cy.logout();

    cy.contains('button', '스케줄 추가').click();
    cy.contains('다음에 할게요').click();

    cy.get('input[placeholder="당신의 이름은 무엇인가요?"]').type('홍민서');
    cy.get('input[id="pin"]').type('1');
    cy.get('input[id="pin-2"]').type('1');
    cy.get('input[id="pin-3"]').type('1');
    cy.get('input[id="pin-4"]').type('1');
    cy.contains('button', '다음').click();

    cy.getCookie('schedule-guide-modal').should('not.exist');
    cy.get('[data-testid="schedule-guide-modal"]').should('exist');

    cy.get('[data-testid="schedule-guide-modal"]')
      .find('.tabler-icon-x')
      .click();
    cy.get('[data-testid="schedule-new-desktop-header"]')
      .find('.tabler-icon-chevron-left')
      .click()
      .click();

    cy.contains('button', '스케줄 추가').click();
    cy.contains('다음에 할게요').click();

    cy.get('input[placeholder="당신의 이름은 무엇인가요?"]').type('홍민서');
    cy.get('input[id="pin"]').type('1');
    cy.get('input[id="pin-2"]').type('1');
    cy.get('input[id="pin-3"]').type('1');
    cy.get('input[id="pin-4"]').type('1');
    cy.contains('button', '다음').click();

    cy.getCookie('schedule-guide-modal').should('exist');
    cy.get('[data-testid="schedule-guide-modal"]').should('not.exist');
  });

  it('스케줄 가이드 모달을 표시해야 할 경우, 가이드 이미지들이 preload된다.', () => {
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
