const { test } = require('@playwright/test');
const { expect } = require('../playwright.config');

test.only('Login', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const products = page.locator(".card-body");
    const email = 'aline.bora@spritecloud.com'

    await page.goto("https://rahulshettyacademy.com/client/");
    await page.locator('input[id="userEmail"]').type(email);
    await page.locator('[id="userPassword"]').type('2AvR5G@YAFXck4E');
    await page.locator('[id="login"]').click();
    await products.count();

    await page.locator('[class="card"]').first().waitFor();

    await page.locator('button[class="btn w-10 rounded"]:text(" Add To Cart")').nth(1).click();
    await page.locator('[routerlink="/dashboard/cart"]').click();

    // Fix asserting url | await expect(page).toHaveUrl('/client/dashboard/cart')
    // Add assert for item in cart | await page.locator('[class="cartWrap ng-star-inserted"]').toBeVisible();

    await page.locator('[class="btn btn-primary"]:text("Checkout")').click();

    // Fix asserting url | await expect(page).toHaveUrl('https://rahulshettyacademy.com/client/dashboard/order?prop=%5B%226262e95ae26b7e1a10e89bf0%22%5D');

    // Check asserting Email | await expect (page.locator('input[class="input txt text-validated ng-pristine ng-valid ng-touched"]')).toHaveText(email);
    await page.locator('input[class="input txt"]').nth(0).type('123');
    await page.locator('input[name="coupon"]').type('rahulshettyacademy');
    await page.locator('input[class="input txt"]').nth(1).type('Qaline Silva');
    await page.locator('input[placeholder="Select Country"]').type('Neth');
    await page.locator('button[class="ta-item list-group-item ng-star-inserted"]').nth(0).click();
    await page.locator('[class="user__name mt-5"] [class="input txt text-validated ng-untouched ng-pristine ng-valid"]').textContent('aline.bora@spritecloud.com');

    await page.locator('a[class="btnn action__submit ng-star-inserted"]:text("Place Order ")').click();
    await page.locator('h1[class="hero-primary"]').textContent('Thankyou for the order.');

    // Getting Order Number
    const orderId = await page.locator('label[class="ng-star-inserted"]').textContent();

    await page.locator('button[routerlink="/dashboard/myorders"]').click();
    await page.locator('tbody').waitFor();

    const rows = await page.locator('tbody tr');

    for (let i = 0; i<await rows.count(); ++i) {
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if (orderId.includes(rowOrderId)) {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }

    const orderIdDetails = await page.locator('[class*="col-text"]').textContent();
    expect (orderId.includes(orderIdDetails)).toBeTruthy();
    
    await page.pause();
    // await expect(page.locator('tr[class="ng-star-inserted"]').toHaveText(orderID));



});