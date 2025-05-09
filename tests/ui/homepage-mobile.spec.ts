import test from "@playwright/test"
import { HomePage } from "../../pages/HomePage";
import { selectors } from "../../utils/selectors";

test.describe("Iphone X viewport", () => {
    test.use({ viewport: {width: 375, height: 812 }});

    test('Homepage mobile', async ({ page }) => {
        const homePage = new HomePage(page);
    
        await homePage.navigate("https://ovcharski.com/shop/");
        await homePage.verifyLogo();
        await homePage.verifyWelcomeText("Welcome to the store");
        await homePage.verifyTextFooter("© Automation Demo Site 2025 Built with WooCommerce");
        await homePage.verifyElementVisible(selectors.homePage.navMenuButton);

        await homePage.captureHomePageScreenshot('homepage');
        await homePage.captureFullPageScreenshot('homepage');
    
        await page.waitForTimeout(1000);
        // Close the page after the test
        await page.close();
    })
})