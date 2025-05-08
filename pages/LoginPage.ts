import { Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";
import { selectors } from "../utils/selectors";

export class LoginPage extends BasePage {
    constructor (page: Page) {
        super(page)
    }

    async fillLoginForm (username: string, password: string) {
        await this.fillLocator(selectors.login.username, username);
        await this.fillLocator(selectors.login.password, password);
    }

    async clickLoginButton () {
        await this.clickElement(selectors.login.loginButton);
    }

    async login (username: string, password: string) {
        await this.fillLoginForm(username, password);
        await this.clickLoginButton();
    }

    async verifyErrorMessage (field: string, expectedText: string) {
        await this.verifyElementVisible(field);
        await this.verifyText(field, expectedText);
    }

    async verifyFormSubmissionBlocked () {
        await expect(this.page).toHaveURL(/.*\/login\//);
    }
}