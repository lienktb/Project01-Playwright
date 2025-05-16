import { expect, Page } from "@playwright/test";
import { ProductPage } from "../pages/ProductPage";

export async function addProductToCart(page: Page, productUrl: string, expectedTitle: string) {
    const productPage = new ProductPage(page);

    // add product to cart
    await productPage.navigateToProduct(productUrl);
    await expect(page).toHaveTitle(expectedTitle);

    await productPage.clickAddToCartButtonProductPage();

    // validate product is added to cart
    await productPage.verifyCartHeader("1");
}