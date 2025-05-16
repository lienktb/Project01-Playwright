import { expect, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { normalizeQuotes } from "../utils/textUtils";

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

    async goToCartPage() {
        await this.clickIconCartHeader();
        await this.page.waitForTimeout(1000);
        await this.verifyCartPage();
    }

    async verifyCartItem() {
        const productItems = this.page.locator(".cart_item");
        const productCount = await productItems.count();
        const lastRow = productItems.last();

        expect(productCount).toBe(1);
        await expect(lastRow).toContainText("Jenkins Beekeeper");
        await expect(this.page.locator('.quantity input')).toHaveValue("1");
    }

    async fillQuantity(name: string, number: string) {
        const productItems = this.page.locator('.cart_item', { hasText: name });

        await productItems.locator(".input-text").fill(number);
        await productItems.locator(".input-text").blur();
    }

    async clickUpdateCartButton () {
        const locator = 'button:has-text("Update cart")';
        await expect(this.page.locator(locator)).not.toBeDisabled();
        await this.clickElement(locator);

        await expect(this.page.locator(locator)).toBeEnabled({ timeout: 5000 });
    }

    async verifyUpdateCart(name: string) {
        const productItems = this.page.locator('.cart_item', { hasText: name });
        await expect(productItems).toBeVisible();

        let priceText = await productItems.locator(".product-price").textContent() || "";
        let totalText = await productItems.locator(".product-subtotal").textContent() || "";
        let inputValue = await productItems.locator(".input-text").inputValue() || "";

        let price = parseFloat(priceText.replace(',', '.').replace(/[^\d.]/g, ''));
        let total = parseFloat(totalText.replace(',', '.').replace(/[^\d.]/g, ''));
        let input = parseInt(inputValue); // vì input có thể là số lượng, nên parseInt

        expect(price * input).toBeCloseTo(total, 2); 
    }

    async clickDeleteItem(name: string) {
        const productItems = this.page.locator('.cart_item', { hasText: name });
        await expect(productItems).toBeVisible();

        await productItems.locator(".remove").click();
    }

    async verifyMessageRemove(name: string) {
        await this.verifyElementVisible(".woocommerce-message");
        const messageRaw = await this.page.locator('.woocommerce-message').textContent();
        const messageText = normalizeQuotes(messageRaw ?? '');
        expect(messageText).toBe(`"${name}" removed. Undo?`);
    }

    async verifyCartEmpty() {
        await this.verifyElementVisible(".cart-empty");
        await this.verifyText(".cart-empty", "Your cart is currently empty.", true);
    }

    async verifyCartItemDeleted(name: string) {
        const productItems = this.page.locator('.cart_item', { hasText: name });
        await expect(productItems).toHaveCount(0);
    }
}