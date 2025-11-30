declare namespace Cypress {
  interface Chainable {
    login(): Chainable<void>;
    logout(): Chainable<void>;
    visitFirstEvent(): Chainable<void>;
  }
}
