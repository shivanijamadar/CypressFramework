export const homePage = {
    customerInfoButton: () => cy.get('.header-links .account'),
    logoutButton: () => cy.get('.ico-logout'),
    searchField: () => cy.get('#small-searchterms'),
    searchButton: () => cy.get('[value="Search"]'),
    categoriesList: () => cy.get('.block-category-navigation li'),
    subCategoriesList: () => cy.get('.sub-category-item'),
    productTitle: () => cy.get('.product-title'),
}