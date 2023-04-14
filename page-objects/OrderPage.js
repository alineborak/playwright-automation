class OrderPage {
    constructor(page) {
        this.page = page;
        this.orderUrl = expect(page.url());
        this.emailInfo = page.locator('div.user__name.mt-5');
        this.inputCvv = page.locator('input[class="input txt"]').nth(0);
        this.inputCoupon = page.locator('input[name="coupon"]');
        this.inputName = page.locator('input[class="input txt"]').nth(1);
        this.inputCountryName = page.locator('input[placeholder="Select Country"]');
        this.selectCountryInput = page.locator('button[class="ta-item list-group-item ng-star-inserted"]').nth(0);
        this.emailDisplay = page.locator('[class="user__name mt-5"] [class="input txt text-validated ng-untouched ng-pristine ng-valid"]');
        this.placeOrderBtn = page.locator('a[class="btnn action__submit ng-star-inserted"]:text("Place Order ")');
    }
    
    async clientOrderInput() {
        await this.orderUrl('/client/dashboard/order*')
        await this.emailInfo.innerText();
        await this.inputCvv.type('123');
        await this.inputCoupon.type('rahulshettyacademy');
        await this.inputName.type('Qaline Silva');
        await this.inputCountryName.type('Neth');
        await this.selectCountryInput.click();
        await this.placeOrderBtn.click();
    }
}
module.exports = OrderPage;