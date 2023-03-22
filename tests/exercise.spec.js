const { test, expect } = require('@playwright/test');

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

    await expect(page.url()).toContain('/client/dashboard/cart');
    await expect(page.locator('[class="cartWrap ng-star-inserted"]')).toBeVisible();
    await page.locator('[class="btn btn-primary"]:text("Checkout")').click();

    await expect(page.url()).toContain('https://rahulshettyacademy.com/client/dashboard/order?prop=%5B%226262e990e26b7e1a10e89bfa%22%5D');

    // Asserting Email visibility 

    const mailField = await page.locator('.user__name.mt-5 input').nth(0).innerText();

    // const mailField = await page.locator('div').filter({ hasText: 'Shipping Information aline.bora@spritecloud.comPlace Order' }).locator('input[type="text"]').innerText();

    // console.log(mailField.split(" ")[2]);
    console.log(mailField);

    // const text = await mailField.innerText();
    // console.log(text);

    // await expect(text).toEqual(email);
    // await expect (mailField).toHaveText(email);

    // await page.pause();


    await page.locator('input[class="input txt"]').nth(0).type('123');
    await page.locator('input[name="coupon"]').type('rahulshettyacademy');
    await page.locator('input[class="input txt"]').nth(1).type('Qaline Silva');
    await page.locator('input[placeholder="Select Country"]').type('Neth');
    await page.locator('button[class="ta-item list-group-item ng-star-inserted"]').nth(0).click();
    await page.locator('[class="user__name mt-5"] [class="input txt text-validated ng-untouched ng-pristine ng-valid"]').textContent('aline.bora@spritecloud.com');

    await page.locator('a[class="btnn action__submit ng-star-inserted"]:text("Place Order ")').click();
    await page.locator('h1[class="hero-primary"]').textContent('Thankyou for the order.');

    // Getting Order Number and asserting on My Orders page
    const orderId = await page.locator('label[class="ng-star-inserted"]').textContent();

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

    const orderIdDetails = await page.locator('[class*="col-text"]').textContent();
    expect(orderId.includes(orderIdDetails)).toBeTruthy();
    // await expect(page.locator('tr[class="ng-star-inserted"]')).toHaveText(orderID);
});