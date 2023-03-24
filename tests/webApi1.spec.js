const { test, expect } = require('@playwright/test');

test.only('Api testing', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
});