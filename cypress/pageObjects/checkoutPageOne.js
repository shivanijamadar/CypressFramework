export const checkoutPageOne = {
    countryDropdown: () => cy.get('#BillingNewAddress_CountryId'),
    cityInput: () => cy.get('#BillingNewAddress_City'),
    addressLine1Input: () => cy.get('#BillingNewAddress_Address1'),
    postalCodeInput: () => cy.get('#BillingNewAddress_ZipPostalCode'),
    phoneNumberInput: () => cy.get('#BillingNewAddress_PhoneNumber'),
    addressContinueButton: () => cy.get('.new-address-next-step-button'),
    paymentMethodContinueButton: () => cy.get('.payment-method-next-step-button'),
    paymentInfoContinueButton: () => cy.get('.payment-info-next-step-button'),
    paymentMethod: () => cy.get('.payment-details'),
    cardHolderNameInput: () => cy.get('#CardholderName'),
    cardNumberInput: () => cy.get('#CardNumber'),
    cardCodeInput: () => cy.get('#CardCode'),
    confirmOrderButton: () => cy.get('.confirm-order-next-step-button'),
    billingLoader: () => cy.get('#billing-please-wait'),
    selectAddress: () => cy.get('.address-select')
}