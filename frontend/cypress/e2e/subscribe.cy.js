describe("Subscription flow", () => {
  const email = "diego@gmail.com";
  const password = "123456789";

  it('passes', () => {
    cy.visit('http://localhost:3000');
    cy.get('header button').contains('INICIAR SESIÓN').click();
    cy.get('input[name = "email"]').type(email);
    cy.get('input[name = "password"]').type(password);
    cy.get('button').contains('Continuar con correo electrónico').click();
    cy.get('header button').contains('DESCUBRIR').click();
    cy.contains('Eventos populares', { timeout: 10000 }).should('be.visible');
    cy.get('button').contains('Suscribirse').click();
    cy.get('button').contains('✓ Suscrito').should('be.visible');
  });
});
