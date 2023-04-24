const { test, expect } = require('@playwright/test');
const LoginPage = require('../page-objects/LoginPage');
const DashboardPage = require('../page-objects/DashboardPage');
const CartPage = require('../page-objects/CartPage');
const OrderPage = require('../page-objects/OrderPage');
const ConfirmationOrderPage = require('../page-objects/ConfirmationOrderPage');

test('Login and making an order', async ({ page }) => {
    const email = 'aline.bora@spritecloud.com';
    const password = '2AvR5G@YAFXck4E';
    const productName = 'zara coat 3';

    // Login
    const loginPage = new LoginPage(page);
    await loginPage.goTo();
    await loginPage.validLogin(email, password);
    const dashboardPage = new DashboardPage(page);

    // Search Product and adding it to cart
    await dashboardPage.searchProduct(productName);
    await dashboardPage.navigateToCart();

    // Assert if product has been added to cart 
    const cartPage = new CartPage(page);
    await cartPage.addToCart();

    // Visiting Order Page and Asserting email visibility
    const orderPage = new OrderPage(page);

    const mailField = await page.locator('div.user__name.mt-5').innerText();
    await expect(mailField).toContain(email);
    // await orderPage.verifyEmailId();
    await orderPage.clientOrderInput();

    // Getting Order ID Number and asserting it on My Orders page
    const confirmationOrderPage = new ConfirmationOrderPage(page);
    const orderId = await confirmationOrderPage.getOrderConfirmation();
    await confirmationOrderPage.checkOrderId(orderId);
});