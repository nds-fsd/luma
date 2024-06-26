describe("Subscription flow", () => {
  const email = "diego@gmail.com";
  const password = "123456789";

  beforeEach(() => {
    cy.login();
  });

  it('passes', () => {

    cy.get('header button').contains('DESCUBRIR').click();
    cy.contains('Eventos populares', { timeout: 10000 }).should('be.visible');
    cy.get('button').contains('Suscribirse').click();
    cy.get('button').contains('✓ Suscrito').should('be.visible');
  });
});
