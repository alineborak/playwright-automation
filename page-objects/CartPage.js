const { expect } = require('@playwright/test');


class CartPage {
    constructor(page) {
        this.page = page;
        this.cartUrl = expect(page.url());
        this.cartItem = expect(page.locator('[class="cartWrap ng-star-inserted"]'));
        this.checkOutBtn = page.locator('[class="btn btn-primary"]:text("Checkout")');
    }

    async addToCart () {
        await this.cartUrl.toContain('/client/dashboard/cart');
        await this.cartItem.toBeVisible();
        await this.checkOutBtn.click();
    }
}

module.exports = CartPage;