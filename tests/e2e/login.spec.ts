import test, { expect } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";
import { selectors } from "../../utils/selectors";

test("Login success", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const user = {username: "tester02", password: "Tester123456"}
    await loginPage.navigate("https://ovcharski.com/shop/login/");

    await loginPage.login(user.username, user.password);

    await expect(page).toHaveTitle("User – Automation Demo Site");
    await expect(page).toHaveURL(`https://ovcharski.com/shop/user/${user.username}/`);
})

test.describe("Login fail", () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.navigate("https://ovcharski.com/shop/login/");
    })

    test("Email or password are empty", async ({ page }) => {
        const user = {username: "", password: ""}
    
        await loginPage.login(user.username, user.password);
    
        await expect(page).toHaveTitle("Login – Automation Demo Site");
        await expect(page).toHaveURL(`https://ovcharski.com/shop/login/`);

        await loginPage.verifyErrorMessage(selectors.login.usernameError, "Please enter your username or email");
        await loginPage.verifyErrorMessage(selectors.login.passwordError, "Please enter your password");
    })

    test("Password is incorrect", async ({ page }) => {
        const user = {username: "tester02", password: "sf"}
        await loginPage.navigate("https://ovcharski.com/shop/login/");
    
        await loginPage.login(user.username, user.password);
    
        await expect(page).toHaveTitle("Login – Automation Demo Site");
        await expect(page).toHaveURL(`https://ovcharski.com/shop/login/`);

        await loginPage.verifyErrorMessage(selectors.login.passwordError, "Password is incorrect. Please try again.");
    })

    test("Password is empty", async ({ page }) => {
        const user = {username: "tester02", password: ""}
        await loginPage.navigate("https://ovcharski.com/shop/login/");
    
        await loginPage.login(user.username, user.password);
    
        await expect(page).toHaveTitle("Login – Automation Demo Site");
        await expect(page).toHaveURL(`https://ovcharski.com/shop/login/`);

        await loginPage.verifyErrorMessage(selectors.login.passwordError, "Please enter your password");
    })
})