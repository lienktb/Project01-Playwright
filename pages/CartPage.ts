import { expect, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CartPage extends BasePage {
    constructor(page: Page) {
        super(page )
    }

    async navigateToCartPage(url: string) {
        this.navigate(url);
    }

    async clickIconCartHeader() {
        const cartIcon = '[title="View your shopping cart"]';
        await this.clickElement(cartIcon);
    }

    async verifyCartPage() {
        await expect(this.page).toHaveTitle("Cart – Automation Demo Site");
        await this.verifyText(".entry-title", "Cart");
    }
}