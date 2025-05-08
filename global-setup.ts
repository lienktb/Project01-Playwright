import { chromium, expect, Browser } from '@playwright/test';
import { LoginPage } from "./pages/LoginPage";

const globalSetup = async () => {
    let browser: Browser | null = null;

    try {
        browser = await chromium.launch();
        const context = await browser.newContext();
        const page = await context.newPage();
    
        const loginPage = new LoginPage(page);
        const user = {username: "tester02", password: "Tester123456"};
    
        await loginPage.navigate("https://ovcharski.com/shop/login/");
        await loginPage.login(user.username, user.password);
    
        await expect(page).toHaveTitle("User – Automation Demo Site");
        await expect(page).toHaveURL(`https://ovcharski.com/shop/user/${user.username}/`);
    
        await page.context().storageState({ path: './LoginAuth.json'});
    } catch (error) {
        console.log("Error global setup", error);
    } finally {
        if (browser) {
            browser.close();
        }
    }
}

export default globalSetup;