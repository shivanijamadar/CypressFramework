import { standardUser } from '../fixtures/userCredentials'
import { homePage } from '../pageObjects/homePage'
import { loginPage } from '../pageObjects/loginPage'
import { productDetailsPage } from '../pageObjects/productDetailsPage';
import { cartPage } from '../pageObjects/cartPage';
import { checkoutPageOne } from '../pageObjects/checkoutPageOne';
import { checkoutCompletedPage } from '../pageObjects/checkoutCompletedPage';

describe('Shopping process', () => {
  beforeEach(() => {
    cy.visit(Cypress.env('baseUrl'))
    cy.login(standardUser.emailId, standardUser.password)
  });

  context('Login', () => {
    it('User should be able to login', () => {
      homePage.customerInfoButton().invoke('text').should('contain', standardUser.emailId);
    })

    it('User should be able to logout', () => {
      homePage.logoutButton().click()
      loginPage.loginButton().should('be.visible')
    })
  })

  context('Product browsing and searching', () => {
    it('User should be able to browse products by Category', () => {
      const category = 'Electronics'
      const subCategories = ['Camera, photo', 'Cell phones']
      homePage.categoriesList().contains(category).click()
      homePage.subCategoriesList().each((category, index) => {
        expect(category.text()).to.contain(subCategories[index])
      });
      homePage.subCategoriesList().contains(subCategories[0]).click()
      cy.url().should('include', '/camera-photo')
      homePage.productTitle().each((product) => {
        expect(product.text()).to.match(/Camcorder|Camera/);
      });
    });

    it('User should be able to search a product', () => {
      const product = 'Blue Jeans'
      homePage.searchField().type(product)
      homePage.searchButton().click()
      homePage.productTitle().should('contain', product)
    })
  });

  context('Adding/Updating/Removing items from the cart', () => {
    it('User should be able to add items to cart', () => {
      removeProductsFromCart() //for data cleanup
      cy.visit(Cypress.env('baseUrl'))
      const category = 'Books'
      const product = 'Health Book'
      homePage.categoriesList().contains(category).click()
      homePage.productTitle().contains(product).click()
      productDetailsPage.quantityInput().invoke('val').as('productQty')
      productDetailsPage.itemPriceLabel().invoke('text').then((price) => {
        cy.wrap(price.trim()).as('productPrice')
      })
      productDetailsPage.addToCartButton().first().click()
      cartPage.cartLink().click()
      cartPage.productName().should('contain', product)
      cy.get('@productPrice').then((productPrice) => {
        cy.get('@productQty').then((productQty) => {
          cartPage.unitPriceLabel().invoke('text').should('contain', productPrice);
          cartPage.quantityInput().invoke('val').should('contain', productQty);
        })
      })
    });

    it('User should be able to update quantity of items in the cart', () => {
      removeProductsFromCart() //for data cleanup
      cy.visit(Cypress.env('baseUrl'))
      const category = 'Books'
      const product = 'Health Book'
      homePage.categoriesList().contains(category).click()
      homePage.productTitle().contains(product).click()
      productDetailsPage.itemPriceLabel().invoke('text').then((price) => {
        cy.wrap(price.trim()).as('productPrice')
      })
      productDetailsPage.addToCartButton().first().click()
      cartPage.cartLink().click()
      cartPage.productName().should('contain', product)
      cartPage.quantityInput().clear().type(2)
      cartPage.updateShoppingCartButton().click()
      cartPage.quantityInput().invoke('val').should('contain', 2);
      cy.get('@productPrice').then((productPrice) => {
        const newSubTotal = productPrice * 2
        cartPage.subTotal().invoke('text').should('contain', newSubTotal);
      })
    });
  });

  context('Checkout process', () => {
    it('User should be able to purchase a product', () => {
      removeProductsFromCart() //for data cleanup
      cy.visit(Cypress.env('baseUrl'))
      const category = 'Digital downloads'
      const product = '3rd Album'
      const country = 'India'
      const city = 'Mumbai'
      const addressLine1 = 'Opposite hotel'
      const postalCode = '40004'
      const phoneNumber = '90076'
      const cardHolderName = 'Kate'
      const cardNumber = '4988 4388 4388 4305' //test card number and code
      const cardCode = '737'
      homePage.categoriesList().contains(category).click()
      homePage.productTitle().contains(product).click()
      productDetailsPage.addToCartButton().first().click()
      cartPage.cartLink().click()
      cartPage.termsOfServiceCheckbox().click()
      cartPage.checkoutButton().click()
      checkoutPageOne.selectAddress().select('New Address')
      checkoutPageOne.countryDropdown().select(country)
      checkoutPageOne.cityInput().type(city)
      checkoutPageOne.addressLine1Input().type(addressLine1)
      checkoutPageOne.postalCodeInput().type(postalCode)
      checkoutPageOne.phoneNumberInput().type(phoneNumber)
      checkoutPageOne.addressContinueButton().click()
      checkoutPageOne.billingLoader().should('not.be.visible')
      checkoutPageOne.paymentMethod().contains('Credit Card').click()
      checkoutPageOne.paymentMethodContinueButton().click()
      checkoutPageOne.billingLoader().should('not.be.visible')
      checkoutPageOne.cardHolderNameInput().type(cardHolderName)
      checkoutPageOne.cardNumberInput().type(cardNumber)
      checkoutPageOne.cardCodeInput().type(cardCode)
      checkoutPageOne.paymentInfoContinueButton().click()
      checkoutPageOne.billingLoader().should('not.be.visible')
      checkoutPageOne.confirmOrderButton().click()
      checkoutCompletedPage.orderCompletedLabel().should('contain', 'Your order has been successfully processed!')
      checkoutCompletedPage.orderNumberLabel().should('contain', 'Order number:')
      checkoutCompletedPage.continueButton().should('be.visible')
    });
  });
})

// This function will go to the cart page check if any items already exists and remove them
// It will also validate the items have been removed and cart is empty
function removeProductsFromCart() {
  cartPage.cartLink().click()
  cartPage.shoppingCartSection().then(($body) => {
    if ($body.find('.remove-from-cart').length) {
      cartPage.removeFromCartCheckbox().each(($checkbox) => {
        cy.wrap($checkbox).click();
      });
      cartPage.updateShoppingCartButton().click()
      cartPage.orderSummaryLabel().should('contain', 'Your Shopping Cart is empty!')
    }
  })
} 