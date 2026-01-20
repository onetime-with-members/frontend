declare namespace Cypress {
  interface Cypress {
    env(key: 'apiUrl'): string;
    env(key: 'shortUrl'): string;
    env(key: 'authSecretKey'): string;
    env(key: 'expiredToken'): string;
  }

  interface Chainable {
    login(): Chainable<void>;
    logout(): Chainable<void>;
    visitFirstEvent(): Chainable<void>;
    removeFirstEvent(): Chainable<void>;
  }
}
