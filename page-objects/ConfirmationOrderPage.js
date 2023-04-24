const { expect } = require('@playwright/test');

class ConfirmationOrderPage {
    constructor(page) {
        this.orderConfirmation = page.locator('h1[class="hero-primary"]');
        this.viewMyOrders = page.locator('button[routerlink="/dashboard/myorders"]');
        this.body = page.locator('tbody');
        this.orderIdAtConfirmation = page.locator('.em-spacer-1 .ng-star-inserted');
        this.orderIdField = page.locator('.col-text');
        this.page = page;
    }

    async getOrderConfirmation() {
        await this.orderConfirmation.textContent('Thankyou for the order.');
        const orderId = await this.orderIdAtConfirmation.textContent();

        return orderId;
    }
    
    async checkOrderId(orderId) {
        await this.viewMyOrders.click();
        await this.body.waitFor();

        const rowsWithOrders = await this.page.locator('tbody tr');
        for (let i = 0; i < await rowsWithOrders.count(); ++i) {
            const rowOrderId = await rowsWithOrders.nth(i).locator("th").textContent();
            if (orderId.includes(rowOrderId)) {
                await rowsWithOrders.nth(i).locator("button").first().click();
                break;
            }
        }

        const orderIdDetails = await this.orderIdField.textContent();
        expect(orderId.includes(orderIdDetails)).toBeTruthy();

    }
}

module.exports = ConfirmationOrderPage;