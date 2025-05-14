import { expect, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ProductPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    async navigateToProduct (productUrl: string) {
        await this.navigate(productUrl);
    }

    async navigationToCatelogy(catelogyUrl: string) {
        await this.navigate(catelogyUrl);
    }

    async clickProductLink(productName: string) {
        await this.page.getByRole("link", { name: productName}).first().click();
    }
    
    async verifyPrice(productId: string, expectedPrice: string) {
        const priceSelector = `#product-${productId}`;
        await this.verifyElementVisible(priceSelector);
        await this.verifyText(priceSelector, expectedPrice);
    }

    async verifyOldPrice(productId: string, expectedOldPrice: string) {
        const oldPriceSelector = `#product-${productId} .summary del:has-text("${expectedOldPrice}")`;
        await this.verifyElementVisible(oldPriceSelector);
        await this.verifyText(oldPriceSelector, expectedOldPrice);
    }

    async verifyNewPrice(productId: string, expectedNewPrice: string) {
        const newPriceSelector = `#product-${productId} .summary ins:has-text("${expectedNewPrice}")`;
        await this.verifyElementVisible(newPriceSelector);
        await this.verifyText(newPriceSelector, expectedNewPrice);
    }

    async verifySaleBadge(productId: string) {
        const saleBadgeSelector = `#product-${productId} > .onsale:has-text("Sale!")`;
        await this.verifyElementVisible(saleBadgeSelector);
    }

    async clickAddToCartButtonCardProduct(productId: string) {
        const addToCartButton = `a[href="?add-to-cart=${productId}"]`;

        // mô phỏng hành vi click giống người dùng thật nhất
        await this.page.evaluate((sel) => {
            const el = document.querySelector(sel);
            if (el) {
                el.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
            }
        }, addToCartButton);
    }

    async clickAddToCartButtonProductPage() {
        const addToCartButton = ".single_add_to_cart_button";
        await this.clickElement(addToCartButton);
    }

    async clickStickyAddToCart() {
        const addToCartButton = ".single_add_to_cart_button";
        await this.clickElement(addToCartButton);
    }

    async verifyViewCartButton(productId: string) {
        const viewCartButton = `.post-${ productId } .added_to_cart`;
        await this.verifyElementVisible(viewCartButton);
    }

    async verifyCartHeader(number: string) {
        const cartCount = this.page.locator("#site-header-cart .count");
        if (parseInt(number) > 2) {
            await expect(cartCount).toHaveText(`${number} items`);
        } else {
            await expect(cartCount).toHaveText(`${number} item`);
        }
    }

    async fillQuantity(number: string) {
        await this.page.waitForSelector('.input-text', { state: 'visible' });

        await this.fillLocator(`.input-text`, number);
        await this.page.locator('.input-text').blur();
    }

    async verifyQuantityInvalid() {
        const isValid = await this.page.$eval('.input-text', input => (input as HTMLInputElement).validity.valid);
        expect(isValid).toBe(false);
    }
}