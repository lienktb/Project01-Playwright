import test, { expect } from "@playwright/test";
import { ProductPage } from "../../pages/ProductPage";

test.describe("Product Page", () => {
    let productPage: ProductPage;
    test.beforeEach(async ({ page }) => {
        productPage = new ProductPage(page);
        await productPage.navigationToCatelogy("https://ovcharski.com/shop/product-category/jenkins-artwork/");
    })

    test("Add to cart from card product", async ({ page }) => {
        // await productPage.clickProductLink("Jenkins Beekeeper");
        await productPage.clickAddToCartButton("120");
        await productPage.verifyViewCartButton("120");
        await productPage.verifyCartHeader();
    })
})