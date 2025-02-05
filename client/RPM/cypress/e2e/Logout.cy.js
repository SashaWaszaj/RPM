//TC-RPM-103 Log Out: Successful logout with logout button

describe('Logout', () => {
    beforeEach(() => {
        //This is done because to logout you must be loggedin
        cy.visit('https://rpm-motos.com/login') 
        cy.get(':nth-child(2) > input').type("pruebaUsuario") 
        cy.get(':nth-child(3) > input').type("password123")
        cy.get('.button-1').click() 
        cy.location("pathname").should("equal", "/menu")// 1. Open the web application and navigate to <web_url>/menu.
    })
  
    it('The user can Logout succesfully.', () => {
        cy.get('.link-menu > button').click()// 2. Locate the logout button and click on it, Locate the alert message and click on the accept button.
        cy.location("pathname").should("equal", "/login")//E.R. The application processes the logout request and redirects the user to the login page.
    })
  })