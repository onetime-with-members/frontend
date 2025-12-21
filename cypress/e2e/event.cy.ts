import { exampleEventList, memberCases } from '../fixtures/event';

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
      ({ name, enName, slug, title, recommendedTimes, participants }) => {
        describe(name, () => {
          it(`푸터에 있는 해당 링크를 클릭하면, 예시 이벤트 페이지로 이동되고 올바른 컨텐츠들이 표시된다.`, () => {
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
          it(`영어 버전에서 푸터에 있는 해당 링크를 클릭하면, 예시 이벤트 페이지로 이동된다.`, () => {
            cy.visit('/en');
            cy.get('footer').contains('a', enName).click();
            cy.location('pathname').should('contain', `/events/${slug}`);
          });
          it(`공유 팝업을 누르고 각 버튼을 클릭하면, 단축 URL과 QR 코드가 불러와진다.`, () => {
            cy.visit(`/events/${slug}`);

            cy.get('[alt="종이비행기 아이콘"]').click();
            cy.get(`input[value="${Cypress.env('shortUrl')}/${slug}"]`).should(
              'exist',
            );

            cy.get('.tabler-icon-qrcode').click();
            cy.get('img[alt="QR 코드 이미지"]')
              .invoke('attr', 'src')
              .should('contain', slug);
          });
          memberCases.forEach(({ name, type }) => {
            it(`${name}일 경우, 스케줄 등록을 해도 실제로 스케줄이 등록되지 않는다.`, () => {
              cy.setCookie('schedule-guide-modal', 'false');
              if (type === 'USER') cy.login();

              cy.visit(`/ko/events/${slug}`);
              cy.contains('button', '스케줄 추가').click();

              if (type === 'GUEST') {
                cy.contains('button', '다음에 할게요').click();

                cy.get('input[placeholder="당신의 이름은 무엇인가요?"]').type(
                  '홍민서',
                );
                cy.get('input[id="pin"]').type('1');
                cy.get('input[id="pin-2"]').type('1');
                cy.get('input[id="pin-3"]').type('1');
                cy.get('input[id="pin-4"]').type('1');
                cy.contains('button', '다음').click();
              }

              cy.contains('button', '스케줄 등록').click();

              if (type === 'GUEST') cy.wait(1000);
              cy.location('pathname').should('contain', `/events/${slug}`);
              cy.contains('button', '스케줄 추가').should('exist');
            });
          });
          it('이벤트를 수정해도 실제로 수정이 되지 않는다.', () => {
            cy.visit(`/ko/events/${slug}`);

            cy.get('svg.edit-icon').click();
            cy.get('[placeholder="어떤 이벤트인가요?"]').clear().type('수정됨');
            cy.contains('button', '이벤트 수정하기').click();

            cy.get('header').find('h1').should('contain', title);
          });
        });
      },
    );
    it('푸터에 있는 사용 사례 링크를 클릭 후, 해당 예시 이벤트 페이지에서 다른 사용 사례 링크를 클릭하면 단축 URL도 변경된다.', () => {
      const [{ name: name1, slug: slug1 }, { name: name2, slug: slug2 }] =
        exampleEventList;

      cy.visit('/ko');
      cy.get('footer').contains('a', name1).click();

      cy.get('[alt="종이비행기 아이콘"]').click();
      cy.get(`input[value="${Cypress.env('shortUrl')}/${slug1}"]`).should(
        'exist',
      );

      cy.get('.tabler-icon-x').click();
      cy.get('footer').contains('a', name2).click();

      cy.get('[alt="종이비행기 아이콘"]').click();
      cy.get(`input[value="${Cypress.env('shortUrl')}/${slug2}"]`).should(
        'exist',
      );
    });
  });
});
