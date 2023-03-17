const { test } = require('@playwright/test');
const { expect } = require('../playwright.config');

test.only('Login', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://rahulshettyacademy.com/client/");
    await page.locator('input[id="userEmail"]').type('aline.bora@spritecloud.com');
    await page.locator('[id="userPassword"]').type('2AvR5G@YAFXck4E');
    await page.locator('[id="login"]').click();
    await page.locator('button[class="btn w-10 rounded"]:text(" Add To Cart")').nth(1).click();
    await page.locator('[routerlink="/dashboard/cart"]').click();

    // Fix asserting url | await expect(page).toHaveUrl('/client/dashboard/cart');
    // Add assert for item in cart | await page.locator('[class="cartWrap ng-star-inserted"]').toBeVisible();

    await page.locator('[class="btn btn-primary"]:text("Checkout")').click();

    // Fix asserting url | await expect(page).toHaveUrl('https://rahulshettyacademy.com/client/dashboard/order?prop=%5B%226262e95ae26b7e1a10e89bf0%22%5D');

    await page.locator('input[class="input txt"]').nth(0).type('123');
    await page.locator('input[name="coupon"]').type('rahulshettyacademy');
    await page.locator('input[class="input txt"]').nth(1).type('Qaline Silva');
    await page.locator('input[placeholder="Select Country"]').type('Neth');
    await page.locator('button[class="ta-item list-group-item ng-star-inserted"]').nth(0).click();

    await page.locator('[class="user__name mt-5"] [class="input txt text-validated ng-untouched ng-pristine ng-valid"]').textContent('aline.bora@spritecloud.com');

    await page.locator('a[class="btnn action__submit ng-star-inserted"]:text("Place Order ")').click();
    console.log(await page.locator('h1[class="hero-primary"]').textContent('Thankyou for the order.'));

    await page.pause();

});


