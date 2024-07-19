describe("Event creation flow", () => {
  const email = "diego@gmail.com";
  const password = "123456789";

  it('passes', () => {
    cy.visit('http://localhost:3000');
    cy.get('header button').contains('INICIAR SESIÓN').click();
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);
    cy.get('button').contains('Continuar con correo electrónico').click();
    cy.get('header button').contains('CREAR EVENTO').click();
    cy.get('label').contains('Seleccionar').selectFile({
      contents: Cypress.Buffer.from('Fitness Content'),
      fileName: 'Fitness.png',
      mimeType: 'image/png'
    });
    cy.get('input[name="eventDate"]').type("2024-10-12");
    cy.get('input[name="eventStartTime"]').type("08:00");
    cy.get('input[name="eventEndTime"]').type("20:00");
    cy.get('input[name="eventTitle"]').type("Dia en el GYM");
    cy.get('textarea[name="eventDescription"]').type("Ven a entrenar como nunca en tu vida");
    cy.get('select[name="eventLocation"]').select('Valencia');
    cy.get('input[name="eventPrice"]').type('150');
    cy.get('input[id="quantity"]').click();
    cy.get('input[id="capacity"]').type('200');
    cy.get('button').contains('CREAR EVENTO').click();
  })

});
