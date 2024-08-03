export const checkoutCompletedPage = {
    orderCompletedLabel: () => cy.get('.order-completed .title'),
    orderNumberLabel: () => cy.get('.order-completed .details'),
    continueButton: () => cy.get('.order-completed .buttons'),
}