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

    async verifyTextWithOptions(
        locator: string, 
        expectedText: string,
        options: {
            exact?: boolean;
            normalizeWhitespace?: boolean;
            timeout?: number;
        } = {},
    ) {
        const { exact = false, normalizeWhitespace = true, timeout = 5000 } = options;
        if (normalizeWhitespace) {
            await expect(this.page.locator(locator)).toHaveText(new RegExp(expectedText.replace(/\s+/g, '\\s+')), {
                timeout,
            });
        } else if (exact) {
            await expect(this.page.locator(locator)).toHaveText(expectedText, { timeout });
        } else {
            await expect(this.page.locator(locator)).toContainText(expectedText, { timeout });
        }
    }

    async verifyElementVisible(locator: string) {
        await expect(this.page.locator(locator)).toBeVisible();
    }

    async captureScreenshot(screenshotName: string, fullPage: boolean = false) {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');

        await this.page.screenshot({
            path: `screenshots/${screenshotName}-${timestamp}.png`,
            fullPage
        })
    }

    async captureFailureScreenShot(screenshotName: string, testInfo: any) {
        if (testInfo.status !== testInfo.expectedStatus) {
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');

            await this.page.screenshot({
                path: `screenshots/FAIL-${screenshotName}-${timestamp}.png`,
                fullPage: true,
            })
        }
    }
}