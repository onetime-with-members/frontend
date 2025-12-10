describe('정책 동의 여부 수정', () => {
  beforeEach(() => {
    cy.login();
    cy.request({
      url: `${Cypress.env('apiUrl')}/users/policy`,
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${Cypress.env('token')}`,
      },
      body: {
        service_policy_agreement: false,
        privacy_policy_agreement: false,
        marketing_policy_agreement: false,
      },
    });
    cy.visit('/ko/events/new');
    cy.location('pathname').should('contain', '/policy/edit');
  });

  it('전체 동의 버튼을 누르고 제출하면, 이전 페이지로 리다이렉트된다.', () => {
    cy.contains('전체 동의').click();
    cy.contains('button', '확인').click();

    cy.location('pathname').should('contain', '/events/new');
  });

  it('모든 체크박스들을 체크하고 제출하면, 이전 페이지로 리다이렉트된다.', () => {
    cy.get('[data-testid="policy-single-checkbox-list"]')
      .find('.policy-checkbox')
      .click({ multiple: true });
    cy.contains('button', '확인').click();

    cy.location('pathname').should('contain', '/events/new');
  });

  it('탈퇴 페이지로 이동하는 링크를 클릭하면 탈퇴 페이지로 이동되고, X 버튼을 누르면 다시 정책 수정 페이지로 되돌아간다.', () => {
    cy.contains('a', '탈퇴 페이지').click();
    cy.location('pathname').should('contain', '/withdraw');

    cy.get('.tabler-icon-x').click();
    cy.location('pathname').should('contain', '/policy/edit');
  });

  it('체크박스 옆에 정책 이름을 클릭하면, 각각의 정책에 대한 상세 페이지로 이동된다.', () => {
    cy.contains('서비스 이용약관').click();
    cy.location('pathname').should('contain', '/policy/service');
    cy.contains('h1', '서비스 이용약관').should('exist');

    cy.get('.hidden').find('.tabler-icon-chevron-left').click();
    cy.contains('개인정보 수집 및 이용').click();
    cy.location('pathname').should('contain', '/policy/privacy');
    cy.contains('h1', '개인정보 수집 및 이용').should('exist');

    cy.get('.hidden').find('.tabler-icon-chevron-left').click();
    cy.contains('마케팅 정보 수신').click();
    cy.location('pathname').should('contain', '/policy/edit');
  });

  it('네비게이션 바의 동작이 모두 비활성화된다.', () => {
    cy.get('nav').find('img[alt="OneTime"]').click({ force: true });
    cy.location('pathname').should('contain', '/policy/edit');

    cy.get('nav').contains('홍').click();
    cy.contains('로그아웃').should('not.exist');
  });
});

describe('탙퇴', () => {
  beforeEach(() => {
    cy.intercept('POST', `${Cypress.env('apiUrl')}/users/action-withdraw`, {
      code: '200',
      message: '유저 서비스 탈퇴에 성공했습니다.',
      is_success: true,
    });
    cy.login();
    cy.visit('/withdraw');
  });

  it('비회원일 경우, 탈퇴 페이지 접속이 차단된다.', () => {
    cy.clearCookie('session');

    cy.get('[data-testid="login-page"]').should('exist');
  });

  it('탈퇴 후에 홈페이지로 리다이렉트되며, 네비게이션 바 우상단 프로필이 사라진다.', () => {
    cy.contains('상기 내용').click();
    cy.contains('button', '탈퇴하기').click();

    cy.contains('h1', '일정을 쉽고 빠르게').should('exist');
  });
});
