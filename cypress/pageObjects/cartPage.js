export const cartPage = {
    removeFromCartCheckbox: () => cy.get('.remove-from-cart'),
    updateShoppingCartButton: () => cy.get('[value="Update shopping cart"]'),
    cartLink: () => cy.get('#topcartlink'),
    orderSummaryLabel: () => cy.get('.order-summary-content'),
    productName: () => cy.get('.product-name'),
    unitPriceLabel: () => cy.get('.product-unit-price'),
    quantityInput: () => cy.get('.qty-input'),
    shoppingCartSection: () => cy.get('.shopping-cart-page'),
    subTotal: () => cy.get('.product-subtotal'),
    termsOfServiceCheckbox: () => cy.get('#termsofservice'),
    checkoutButton: () => cy.get('#checkout'),
}