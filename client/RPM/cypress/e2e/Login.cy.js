//TC-RPM-101 Log In: Successful login with valid credentials

describe('Login', () => {
    beforeEach(() => {
      cy.visit('https://rpm-motos.com/login') // 1. Open the web application and navigate to <web_url>/login.
    })
  
    it('The user can Login succesfully with valid credentials', () => {
        cy.get(':nth-child(2) > input').type("pruebaUsuario") // 2. Locate the User Name input field and enter a valid username (e.g., pruebaUsuario).
        cy.get(':nth-child(3) > input').type("password123")// 3. Locate the Password input field and enter a valid password (e.g., password123).
        cy.get('.button-1').click() // 4. Click on the Login button.
        cy.location("pathname").should("equal", "/menu") // E.R. The menu is displayed, confirming the login.
    })

  })