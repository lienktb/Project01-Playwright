import test, { expect } from "@playwright/test";
import { HeaderComponent } from "../../components/HeaderComponents";
import { addProductToCart } from "../../utils/cartHelpers";

const user = {username: "tester02", password: "Tester123456"};

const menus = [
    { name: 'Homepage', url: 'https://ovcharski.com/shop/', requiresAuth: false },
    { name: 'Shop', url: 'https://ovcharski.com/shop/shop/', requiresAuth: false },
    { name: 'Members', url: 'https://ovcharski.com/shop/members/', requiresAuth: false },
    { name: 'Login', url: 'https://ovcharski.com/shop/login/', requiresAuth: false },
    { name: 'User', url: `https://ovcharski.com/shop/user/${user.username}/`, requiresAuth: true },
    { name: 'Account', url: 'https://ovcharski.com/shop/account/', requiresAuth: true },
    { name: 'Register', url: 'https://ovcharski.com/shop/register/', requiresAuth: false }
]

test.describe('Header Menu Navigation - No Auth', () => {
    menus.forEach(menu => {
        test(`Click on ${menu.name} menu`, async ({ page }) => {
            const header = new HeaderComponent(page);
            await page.goto("https://ovcharski.com/shop/");

            await header.clickMenuItem(menu.name);
            await header.verifyMenuUrl(menu.name, menu.url, menu.requiresAuth);
        })
    })
})

test.describe('Header Menu Navigation - Auth', () => {
    test.use({ storageState: './LoginAuth.json' });
    menus.forEach(menu => {
        test(`Click on ${menu.name} menu`, async ({ page }) => {
            const header = new HeaderComponent(page);
            await page.goto("https://ovcharski.com/shop/");

            await header.clickMenuItem(menu.name);
            await header.verifyMenuUrl(menu.name, menu.url, false);
        })
    })
})

test.describe('Minicart', () => {
    test('Minicart is empty', async ({ page }) => {
        const header = new HeaderComponent(page);
        await page.goto("https://ovcharski.com/shop/");
        await header.openCart();
        await header.verifyMiniCartVisible();
        await header.verifyMiniCartEmpty();
    })

    test('Add to cart and show minicart with correct item', async ({ page }) => {
        const header = new HeaderComponent(page);

        await addProductToCart(page, "https://ovcharski.com/shop/product/jenkins-beekeeper/", "Jenkins Beekeeper – Automation Demo Site");
        
        await header.openCart();
        await header.verifyMiniCartVisible();
        await header.verifyProductInMiniCart("Jenkins Beekeeper");
    })
})

test.describe('Search box', () => {
    test('Search no products found message', async ({ page }) => {
        const header = new HeaderComponent(page);

        await page.goto("https://ovcharski.com/shop/");

        await header.searchForByEnter("abc");
        await header.verifyNoProductsFoundMessage();
     })

    test('Search products', async ({ page }) => {
        const header = new HeaderComponent(page);
        await page.goto("https://ovcharski.com/shop/");

        await header.searchForByEnter("Jenkins");
        await header.verifyProductsFound();
    })
})

test('Logo navigation', async ({ page }) => {
    const header = new HeaderComponent(page);
    await page.goto("https://ovcharski.com/shop/cart/");
    await header.clickLogo();

    await expect(page).toHaveURL("https://ovcharski.com/shop/");
})

test.describe('Mobile navigation', () => {
    test('Click hamburger to show menu mobile', async ({ page }) => {
        const header = new HeaderComponent(page);
        await page.setViewportSize({ width: 375, height: 812 });
        await page.goto('https://ovcharski.com/shop/');

        
    })
})