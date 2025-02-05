//TC-RPM-104 Access Control: Restricted pages are inaccessible to unauthenticated users

describe('Access Control', () => {
    beforeEach(() => {
        cy.visit('https://rpm-motos.com/') 
    })
  
    it('The users that are not logged in cannot access /menu, /register, /productForm or /editProduct paths.', () => {
        cy.visit('https://rpm-motos.com/menu') //1. Open the web application and navigate to <web_url>/menu.
        cy.location("pathname").should("equal", "/")// E.R The application must redirect the user to /.
        cy.visit('https://rpm-motos.com/register') //2. Open the web application and navigate to <web_url>/register.
        cy.location("pathname").should("equal", "/")// E.R The application must redirect the user to /.
        cy.visit('https://rpm-motos.com/productForm') //3. Open the web application and navigate to <web_url>/productForm.
        cy.location("pathname").should("equal", "/")// E.R The application must redirect the user to /.
        cy.visit('https://rpm-motos.com/editProduct') //4. Open the web application and navigate to <web_url>/editProduct.
        cy.location("pathname").should("equal", "/")// E.R The application must redirect the user to /.
    })
  })