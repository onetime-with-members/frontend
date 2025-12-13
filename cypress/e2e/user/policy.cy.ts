import {
  policyDetailTestCases,
  policyEditTestCases,
} from '../../fixtures/policy';

describe.only('정책 상세 내용 페이지', () => {
  policyDetailTestCases.map(({ name, locale, url, partOfContent }) => {
    it(`${name}의 ${locale === 'ko' ? '한국어' : '영어'} 버전 상세 내용 페이지가 올바르게 표시되는지 확인한다.`, () => {
      cy.visit(`/${locale}/${url}`);
      cy.contains('h1', name).should('exist');
      cy.contains('h3', partOfContent).should('exist');
    });
  });
});

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

  describe('체크박스 체크에 따른 버튼 활성화 여부 확인', () => {
    policyEditTestCases.map(
      ({ service, privacy, marketing, condition, result, isDisabled }) => {
        it(`${condition}할 경우 버튼이 ${result}된다.`, () => {
          cy.get('[data-testid="policy-single-checkbox-list"]')
            .find('.policy-checkbox')
            .as('checkboxList');

          if (service) cy.get('@checkboxList').eq(0).click();
          if (privacy) cy.get('@checkboxList').eq(1).click();
          if (marketing) cy.get('@checkboxList').eq(2).click();

          cy.contains('button', '확인').should(
            isDisabled ? 'be.disabled' : 'not.be.disabled',
          );
        });
      },
    );
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

  afterEach(() => {
    cy.request({
      url: `${Cypress.env('apiUrl')}/users/policy`,
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${Cypress.env('token')}`,
      },
      body: {
        service_policy_agreement: true,
        privacy_policy_agreement: true,
        marketing_policy_agreement: true,
      },
    });
  });
});
