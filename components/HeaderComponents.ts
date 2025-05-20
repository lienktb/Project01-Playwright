import { Page, expect } from '@playwright/test';
import { selectors } from '../utils/selectors';

export class HeaderComponent {
    constructor(private page: Page) {}

    async clickLogo() {
        await this.page.locator(selectors.header.logoLink).click();
    }

    async clickMenuItem(name: string) {
        await this.page.locator(selectors.header.mainMenu).getByRole('link', { name }).click();
    }

    async verifyMenuUrl(name: string, expectedUrl: string, requiresAuth: boolean) {
        if(requiresAuth) {
            if (name === "User") {
                expect(this.page).toHaveURL('https://ovcharski.com/shop/');
            } else if (name === "Account") {
                expect(this.page).toHaveURL(/\/login/);
            }
        } else {
            await expect(this.page).toHaveURL(expectedUrl);
        }
    }

    async openCart() {
        await this.page.locator(selectors.header.headerCart).hover();
    }

    async verifyVisible() {
        await expect(this.page.locator(selectors.header.headerContainer)).toBeVisible();
    }

    async verifyMiniCartVisible() {
        const miniCart = this.page.locator(selectors.header.miniCart);
        await expect(miniCart).toBeVisible();
    }

    async verifyMiniCartEmpty() {
        await expect(this.page.locator(selectors.header.messageCartEmpty)).toBeVisible();
        await expect(this.page.locator(selectors.header.miniCartItem)).toHaveCount(0);
    }

    async verifyProductInMiniCart(name: string) {
        const miniCart = this.page.locator(selectors.header.miniCart);
        await expect(miniCart.locator(selectors.header.cartList)).toContainText(name);
    }

    async searchForByEnter(term: string) {
        const searchInput = this.page.locator(selectors.header.searchInput);
        await searchInput.fill(term);
        await searchInput.press('Enter');
        await this.page.waitForLoadState('networkidle');
    }

    async verifyNoProductsFoundMessage() {
        const messageNoFoundProduct = this.page.locator(selectors.header.messageNoFoundProduct);
        await expect(messageNoFoundProduct).toBeVisible();
        await expect(messageNoFoundProduct).toContainText("No products were found matching your selection.");
    }

    async verifyProductsFound() {
        expect(await this.page.locator(selectors.header.productItem).count()).toBeGreaterThan(0);
    }

    async clickHamburgerMenu() {
        await this.page.locator(selectors.header.navMenuButton).click();
    }

    async verifyMobileMenuVisible() {
        await expect(this.page.locator(selectors.header.mobileMenu)).toBeVisible();
    }
}