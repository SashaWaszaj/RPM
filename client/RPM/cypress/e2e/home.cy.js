describe('home page', () => {
    beforeEach(() => {
      cy.visit('https://rpm-motos.com/')
    })
  
    it('the home displays carrousel images', () => {
      cy.get('.carousel-image')
    })

    it('the home displays "Novedades" title', () => {
      cy.get('.titulo-subtitulo-product-list-carrousel').should("contain", "Novedades")
    })

    it('the home displays products on the carrousel', () => {
      cy.get(':nth-child(2) > :nth-child(1) > div > .product-item-img', { timeout: 100000 })
      cy.get(':nth-child(2) > :nth-child(2) > h3', { timeout: 100000 })
      cy.get(':nth-child(2) > :nth-child(2) > h4', { timeout: 100000 })
    })

    it('the home displays "Marcas" title', () => {
      cy.get('.slider-container > h2').should("contain", "Marcas")
    })

    it('the home displays brands images', () => {
    cy.get('[data-index="3"] > :nth-child(1) > .img-carrousel > img', { timeout: 100000 })
    })

    it('the home displays whatsapp link', () => {
    cy.get('.whatsapp-float > a > img')
    })
  })
