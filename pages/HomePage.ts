import { expect, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { selectors } from "../utils/selectors";

export class HomePage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    async verifyLogo() {
        await this.verifyElementVisible(selectors.homePage.logoImage);
        await expect(this.page.locator(selectors.homePage.logoLink)).toHaveAttribute("href", "https://ovcharski.com/shop/");
    }

    async verifyWelcomeText(expectedText: string) {
        this.verifyElementVisible(selectors.homePage.welcomeText);
        this.verifyText(selectors.homePage.welcomeText, expectedText);
    }

    async verifyTextFooter(expectedText: string) {
        this.verifyElementVisible(selectors.homePage.footerText);
        this.verifyTextWithOptions(selectors.homePage.footerText, expectedText, {
            normalizeWhitespace: true,
            timeout: 5000,
        });
    }

    async captureHomePageScreenshot(screenshotName: string) {
        this.captureScreenshot(screenshotName);
    }

    async captureFullPageScreenshot(screenshotName: string) {
        this.captureScreenshot(screenshotName, true);
    }
}