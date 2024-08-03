import { loginPage } from '../pageObjects/loginPage'

Cypress.Commands.add('login', (username, password) => {
    loginPage.loginButton().click()
    loginPage.emailInput().type(username)
    loginPage.passwordInput().type(password)
    loginPage.submitButton().click()
})
