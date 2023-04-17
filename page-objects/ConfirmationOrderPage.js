const { expect } = require('@playwright/test');

class ConfirmationOrderPage {
    constructor(page) {
        this.orderConfirmation = page.locator('h1[class="hero-primary"]');
        this.viewMyOrders = page.locator('button[routerlink="/dashboard/myorders"]');
        this.body = page.locator('tbody');
        this.orderId = page.locator('.em-spacer-1 .ng-star-inserted');
        this.orderIdField = page.locator('.col-text').textContent();
        this.page = page;
    }

    async getOrderConfirmation() {
        await this.orderConfirmation.textContent('Thankyou for the order.');
        await this.viewMyOrders.click();
        const getId = await this.orderId.textContent();
        console.log(getId);
        await this.body.waitFor();
    }

    async checkOrderId() {
        const rows = await this.page.locator('tbody tr');
        for (let i = 0; i < await rows.count(); ++i) {
            const rowOrderId = await rows.nth(i).locator("th").textContent();
            if (this.orderId.includes(rowOrderId)) {
                await rows.nth(i).locator("button").first().click();
                break;
            }
        }
    }

    // async checkOrderDone() {
    //     const orderIdDetails = this.orderIdField.textContent();
    // }
}

module.exports = ConfirmationOrderPage;