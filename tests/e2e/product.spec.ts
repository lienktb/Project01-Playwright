import test, { expect } from "@playwright/test";
import { ProductPage } from "../../pages/ProductPage";

test.describe("Product Page", () => {
    let productPage: ProductPage;
    test.beforeEach(async ({ page }) => {
        productPage = new ProductPage(page);
        await productPage.navigationToCatelogy("https://ovcharski.com/shop/product-category/jenkins-artwork/");
    })

    test("Add to cart from card product", async ({ page }) => {
        await productPage.clickAddToCartButtonCardProduct("120");
        await productPage.verifyViewCartButton("120");
        await productPage.verifyCartHeader("1");
    })

    test("Add to cart from product page", async ({ page }) => {
        await productPage.clickProductLink("Jenkins Beekeeper");
        await expect(page).toHaveTitle("Jenkins Beekeeper – Automation Demo Site");

        await productPage.clickAddToCartButtonProductPage();
        await productPage.verifyCartHeader("1");
    })

    test("Sticky add to cart", async ({ page }) => {
        await productPage.clickProductLink("Jenkins Beekeeper");
        await expect(page).toHaveTitle("Jenkins Beekeeper – Automation Demo Site");

        await productPage.clickStickyAddToCart();
        await productPage.verifyCartHeader("1");
    })

    test("Add to cart with quantity = 9", async ({ page }) => {
        await productPage.clickProductLink("Jenkins Beekeeper");
        await expect(page).toHaveTitle("Jenkins Beekeeper – Automation Demo Site");

        // input quantity = 9
        await productPage.fillQuantity("9");
        await productPage.clickAddToCartButtonProductPage();
        await productPage.verifyCartHeader("9");
    })

    test("Add to cart with quantity = 0", async ({ page }) => {
        await productPage.clickProductLink("Jenkins Beekeeper");
        await expect(page).toHaveTitle("Jenkins Beekeeper – Automation Demo Site");

        // input quantity = 9
        await productPage.fillQuantity("0");
        await productPage.clickAddToCartButtonProductPage();
        await productPage.verifyQuantityInvalid();
    })
})