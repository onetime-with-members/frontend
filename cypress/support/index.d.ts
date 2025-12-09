declare namespace Cypress {
  interface Cypress {
    env(key: 'apiUrl'): string;
    env(key: 'token'): string;
    env(key: 'expiredToken'): string;
  }

  interface Chainable {
    login(): Chainable<void>;
    logout(): Chainable<void>;
    visitFirstEvent(): Chainable<void>;
  }
}
