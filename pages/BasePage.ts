import { expect, Page } from '@playwright/test';

export class BasePage {
    constructor (public page: Page) {
    }

    async navigate(url: string) {
        await this.page.goto(url);
    }

    async fillLocator(locator: string, value: string) {
        await this.page.locator(locator).fill(value);
    }

    async clickElement(locator: string) {
        await this.page.locator(locator).click();
    }

    async verifyText(locator: string, expectedText: string, exact: boolean = false) {
        if (exact) {
            await expect(this.page.locator(locator)).toHaveText(expectedText);
        } else {
            await expect(this.page.locator(locator)).toContainText(expectedText);
        }
    }

    async verifyElementVisible(locator: string) {
        await expect(this.page.locator(locator)).toBeVisible();
    }
}