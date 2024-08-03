export const loginPage = {
    loginButton: () => cy.get('.ico-login'),
    emailInput: () => cy.get('#Email'),
    passwordInput: () => cy.get('#Password'),
    submitButton: () => cy.get('[value="Log in"]'),
}