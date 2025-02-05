//TC-RPM-102 Register: Successful registration of new user

describe('Login', () => {
    beforeEach(() => {
        //This is done because to register a new user you must be an administrator
        cy.visit('https://rpm-motos.com/login') 
        cy.get(':nth-child(2) > input').type("pruebaUsuario") 
        cy.get(':nth-child(3) > input').type("password123")
        cy.get('.button-1').click() 
        cy.location("pathname").should("equal", "/menu")
    })
  
    it('The user can Register anew user succesfully with valid credentials.', () => {
        cy.get('[href="/register"]').click()
        cy.get('#userName').type("RPM") // 2. Locate the User Name input field and enter a valid username (e.g., RPM).
        cy.get('#email').type("RPM@gmail.com")// 3. Locate the Email input field and enter a valid email (e.g., RPM@gmail.com).
        cy.get('#password').type("password123")// 4. Locate the Password input field and enter a valid password (e.g., password123).
        cy.get('#confirmPassword').type("password123")// 5. Locate the Confirm Password input field and enter the same valid password (e.g., password123).
        cy.get('.button-1').click() // 6. Click on the Login button.
        cy.location("pathname", { timeout: 100000 }).should("equal", "/menu") // E.R. The application processes the register request and redirects the user to the main menu or dashboard.
    })

  })