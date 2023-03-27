const { test, expect } = require('@playwright/test');

test('Api testing', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
});