
describe('User Journey in the Edit Products Section', () => {
    beforeEach(() => {
        //This is done because to edit products you must be loggedin as a administrator
        cy.visit('https://rpm-motos.com/login') 
        cy.get(':nth-child(2) > input').type("pruebaUsuario") 
        cy.get(':nth-child(3) > input').type("password123")
        cy.get('.button-1').click() 
        cy.location("pathname").should("equal", "/menu")// 1. Open the web application and navigate to <web_url>/menu.
    })
  
    // TC-RPM-105 New Product Form: Successful product creation with valid inputs
    it('The administrator can create products succesfully with calid data.', () => {
        cy.get('[href="/productForm"]').click()// 1. Open the web application and navigate to <web_url>/productForm.
        cy.get('#code').type(3011)// 2. Locate the SKU input field and enter a valid SKU code (e.g., 3011).
        cy.get('#name').type("BIELA 110 CC EVOPLUS")// 3. Locate the Product Name input field and enter a valid product name (e.g., BIELA 110 CC EVOPLUS).
        cy.get('#brand').type("EVOPLUS")// 4. Locate the Brand input field and enter a valid product brand if necessary, not required (e.g., EVOPLUS).
        cy.get('#category').select("Bielas")// 5. Locate the Category input field and select a product category (e.g., Bielas).
        cy.get('#description').type("Biela 25 cm x 5 cm 110 cc/100 cc")// 6. Locate the Description input field and enter a description if necessary, not required (e.g., Biela 25 cm x 5 cm 110 cc/100 cc).
        // 7. NOT REQUIRED Locate the Image input field and upload a valid image if necessary, not required (e.g., llantacg.png).
        cy.get('.button-1').click()// 8. Click on the Add product button.
        cy.get('[style="color: green;"]').should("exist")// E. R. Upon clicking the Add Product button, the application processes the request and displays a success message
    })

    // TC-RPM-106 Edit Product Form: Successful product editing with valid inputs
    it('The administrator can edit products succesfully with calid data.', () => {
        cy.visit('https://rpm-motos.com/menu') 
        cy.get('[href="/editProduct"]').click() // 1. Open the web application and navigate to <web_url>/editProduct.
        cy.get('#code').type(3011)// 2. Locate the SKU input field and enter a valid SKU code for an existing product (e.g., 3011).
        cy.get('.edit-button').click()// 3. Locate the Search Product button and click it.
        cy.get('#name').type("Bujia CG")//4. Locate the Product Name input field that is auto completed with the product information, clear the input field and enter another valid product name (e.g., Bujia CG).
        cy.get('#brand').type("MYK")// 5. Locate the Brand input field that is auto-completed with the product information, clear the input field and enter another valid brand name (e.g., MYK).
        cy.get('#category').select("Accesorios-de-motor")// 6. Locate the Category input field that is auto-selected with the product information, and select another category for the product  (e.g., Bujias).
        cy.get('#description').type("Bujia MYK CG X8YK")// 7. Locate the Description input field that is auto-completed with the product information, clear the input field and enter another valid description (e.g., Bujia MYK CG X8YK).
        // NOT REQUIRED 8. Locate the Image input field that is auto-loaded with the product image, clear the input field and upload another valid image(e.g., bujiacg.png).
        cy.get('.button-1').click()// 9. Click on the Save Changes button.
        cy.get('[style="color: green;"]').should("exist")// E.R. The application processes the product editing request and the product is visible on its category list with the changes.
    })

    // TC-RPM-107 Delete Product: Successful product deletion and inaccessibility after removal
    it('The administrator can delete products succesfully with calid data.', () => {
        cy.visit('https://rpm-motos.com/menu') 
        cy.get('[href="/editProduct"]').click() //1. Open the web application and navigate to <web_url>/productList.
        cy.get('#code').type(3011)// 2. Locate the SKU input field and enter a valid SKU code for an existing product (e.g., 3011).
        cy.get('.edit-button').click()//3. Locate the Search Product button and click it.
        cy.get('.button-3').click()//4. Click on the Delete button associated with the product. Confirm the deletion in the confirmation modal (if applicable). 
        cy.get('[style="color: green;"]').should("exist")// E.R. Upon clicking the DELETE Product button, the application processes the request and displays a success message.
    })
  })