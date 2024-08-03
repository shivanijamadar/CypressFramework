export const productDetailsPage = {
    productDetailsSection: () => cy.get('.product-essential'),
    addToCartButton: () => cy.get('[value="Add to cart"]'),
    quantityInput: () => cy.get('.qty-input'),
    itemPriceLabel: () => cy.get('[itemprop="price"]')
}