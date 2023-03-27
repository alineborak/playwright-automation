const { test, expect } = require('@playwright/test');

test.only('Login', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const products = page.locator(".card-body");
    const email = 'aline.bora@spritecloud.com'

    // Login
    await page.goto("https://rahulshettyacademy.com/client/");
    await page.locator('input[id="userEmail"]').type(email);
    await page.locator('[id="userPassword"]').type('2AvR5G@YAFXck4E');
    await page.locator('[id="login"]').click();
    await products.count();
    await page.locator('[class="card"]').first().waitFor();

    // Adding product to cart
    await page.locator('button[class="btn w-10 rounded"]:text(" Add To Cart")').nth(1).click();
    await page.locator('[routerlink="/dashboard/cart"]').click();

    // Check if product has been added to cart 
    await expect(page.url()).toContain('/client/dashboard/cart');
    await expect(page.locator('[class="cartWrap ng-star-inserted"]')).toBeVisible();
    await page.locator('[class="btn btn-primary"]:text("Checkout")').click();
    await expect(page.url()).toContain('https://rahulshettyacademy.com/client/dashboard/order?prop=%5B%226262e990e26b7e1a10e89bfa%22%5D');

    // Asserting Email visibility 
    const mailField = await page.locator('div.user__name.mt-5').innerText();
    await expect (mailField).toContain(email);
    await page.locator('input[class="input txt"]').nth(0).type('123');
    await page.locator('input[name="coupon"]').type('rahulshettyacademy');
    await page.locator('input[class="input txt"]').nth(1).type('Qaline Silva');
    await page.locator('input[placeholder="Select Country"]').type('Neth');
    await page.locator('button[class="ta-item list-group-item ng-star-inserted"]').nth(0).click();
    await page.locator('[class="user__name mt-5"] [class="input txt text-validated ng-untouched ng-pristine ng-valid"]').textContent(email);

    //Place order and check confirmation of purchase page
    await page.locator('a[class="btnn action__submit ng-star-inserted"]:text("Place Order ")').click();
    await page.locator('h1[class="hero-primary"]').textContent('Thankyou for the order.');

    // Getting Order ID Number and asserting on My Orders page
    const orderId = await page.locator('.em-spacer-1 .ng-star-inserted').textContent();
    console.log(orderId);
    await page.locator('button[routerlink="/dashboard/myorders"]').click();
    await page.locator('tbody').waitFor();

    const rows = await page.locator('tbody tr');
    for (let i = 0; i < await rows.count(); ++i) {
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if (orderId.includes(rowOrderId)) {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }
    // Check if order has been finalized
    const orderIdDetails = await page.locator('.col-text').textContent();
    console.log(orderIdDetails);
    expect(orderId.includes(orderIdDetails)).toBeTruthy();
});