class LoginPage {
    constructor(page) {
        this.page = page;
        this.signInButton = page.locator('[id="login"]');
        this.userEmail = page.locator('input[id="userEmail"]');
        this.userPassword = page.locator('[id="userPassword"]');
    }
    async goTo() {
        await this.page.goto("https://rahulshettyacademy.com/client/");
    }
    async validLogin(email, password) {
        await this.userEmail.type(email);
        await this.userPassword.type(password);
        await this.signInButton.click();
    }
}
module.exports = LoginPage;