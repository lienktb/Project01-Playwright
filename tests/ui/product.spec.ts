import test, { expect } from "@playwright/test";
import { ProductPage } from "../../pages/ProductPage";

test.describe("Product Page", () => {
    
    test("Check product detail page", async ({ page }) => {
        let productPage: ProductPage;
        productPage = new ProductPage(page);
        await productPage.navigationToCatelogy("https://ovcharski.com/shop/product-category/jenkins-artwork/");
        await productPage.clickProductLink("Jenkins Beekeeper");
        await expect(page).toHaveURL("https://ovcharski.com/shop/product/jenkins-beekeeper/");

        await productPage.verifyOldPrice("122", "20,00 лв");
        await productPage.verifyNewPrice("122", "15,99 лв");
        await productPage.verifySaleBadge("122");
    })

    test("Check catelogy page", async({ page }) => {
        await page.goto("https://ovcharski.com/shop/product-category/jenkins-artwork/")
        const productLists = page.locator(".product");
        const productCount = await productLists.count();
        await expect(productCount).toBe(10);    
    })
})