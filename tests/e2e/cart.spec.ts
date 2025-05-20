import test, { expect } from "@playwright/test";
import { ProductPage } from "../../pages/ProductPage";
import { CartPage } from "../../pages/CartPage";
import { addProductToCart } from "../../utils/cartHelpers";

test("Check cart  item", async ({ page }) => {
    const cartPage = new CartPage(page);

    await addProductToCart(page, "https://ovcharski.com/shop/product/jenkins-beekeeper/", "Jenkins Beekeeper – Automation Demo Site")

    await cartPage.goToCartPage();

    await cartPage.verifyCartItem();
})

test("Update cart item", async ({ page }) => {
    const cartPage = new CartPage(page);

    await addProductToCart(page, "https://ovcharski.com/shop/product/jenkins-beekeeper/", "Jenkins Beekeeper – Automation Demo Site")

    await cartPage.goToCartPage();

    await cartPage.verifyCartItem();

    const productUpdate = { name: "Jenkins Beekeeper", quantity: "2", price: "15.99", total: "31.98" };
    await cartPage.fillQuantity(productUpdate.name, productUpdate.quantity);
    await cartPage.clickUpdateCartButton();
    
    await page.waitForSelector('.entry-content .blockOverlay', { state: 'hidden', timeout: 10000 });
    await cartPage.verifyUpdateCart(productUpdate.name);
})

test("Update cart item quantity = 0", async ({ page }) => {
    const cartPage = new CartPage(page);

    await addProductToCart(page, "https://ovcharski.com/shop/product/jenkins-beekeeper/", "Jenkins Beekeeper – Automation Demo Site")

    await cartPage.goToCartPage();
    await cartPage.verifyCartItem();

    const productUpdate = { name: "Jenkins Beekeeper", quantity: "0" };
    await cartPage.fillQuantity(productUpdate.name, productUpdate.quantity);
    await cartPage.clickUpdateCartButton();
    
    await page.waitForSelector('.entry-content .blockOverlay', { state: 'hidden', timeout: 10000 });

    await cartPage.verifyCartItemDeleted(productUpdate.name);
})

test("Delete cart item", async ({ page }) => {
    const cartPage = new CartPage(page);

    await addProductToCart(page, "https://ovcharski.com/shop/product/jenkins-beekeeper/", "Jenkins Beekeeper – Automation Demo Site")

    await cartPage.goToCartPage();
    await cartPage.verifyCartItem();
    
    await cartPage.clickDeleteItem("Jenkins Beekeeper");

    await page.waitForSelector('.entry-content .blockOverlay', { state: 'hidden', timeout: 10000 });
    await cartPage.verifyMessageRemove("Jenkins Beekeeper");
    await cartPage.verifyCartEmpty();
})