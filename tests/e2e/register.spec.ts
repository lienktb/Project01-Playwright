import test, { expect } from "@playwright/test";
import { RegisterPage } from "../../pages/RegisterPage";
import { selectors } from '../../utils/selectors';
import { faker } from '@faker-js/faker';

test('Register success', async ({ page }) => {
    const registerPage = new RegisterPage(page);

    await registerPage.navigate("https://ovcharski.com/shop/register/");

    const fakeUser = {
        username: faker.internet.username(),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        password: 'Test123456',
        confirmPassword: '', // sẽ gán bằng password ở dưới
        gender: faker.helpers.arrayElement(['Male', 'Female']),
        birthday: faker.date.birthdate({ min: 18, max: 65, mode: 'age' }).toISOString().split('T')[0],
        country: "Albania",
        phoneNumber: "0987678555",
    };
    
    fakeUser.confirmPassword = fakeUser.password;

    await registerPage.register(fakeUser.username, fakeUser.firstName, fakeUser.lastName, fakeUser.email, fakeUser.password, fakeUser.confirmPassword, fakeUser.gender, fakeUser.birthday, fakeUser.country, fakeUser.phoneNumber);

    await registerPage.verifyText("h1.entry-title", `${fakeUser.firstName} ${fakeUser.lastName}`);

    await expect(page).toHaveTitle("User – Automation Demo Site");
})

test.describe('Invalid Registration Scenarios', () => {
    let registerPage: RegisterPage;

    test.beforeEach(async ({ page }) => {
        registerPage = new RegisterPage(page);
        await registerPage.navigate("https://ovcharski.com/shop/register/");
    })

    test('Email invalid format', async () => {
        await registerPage.register("tester3432", "tester", "001", "email-invalid", "Tester123456", "Tester123456", "Male", "06 May 1995", "Albania", "0987678555");

        await registerPage.verifyText("h1.entry-title", "Register");

        await registerPage.verifyFormSubmissionBlocked();
        await registerPage.verifyErrorMessage(selectors.register.emailError, "The email you entered is incorrect");
    })

    test('Empty required fields', async () => {
        await registerPage.register("", "tester", "001", "", "", "", "", "06 May 1995", "Albania", "0987678555");

        await registerPage.verifyText("h1.entry-title", "Register");

        await registerPage.verifyFormSubmissionBlocked();
        await registerPage.verifyErrorMessage(selectors.register.usernameError, "Username is required");
        await registerPage.verifyErrorMessage(selectors.register.emailError, "E-mail Address is required");
        await registerPage.verifyErrorMessage(selectors.register.passwordError, "Password is required");
        await registerPage.verifyErrorMessage(selectors.register.genderError, "Gender* is required.");
    })

    test('Password short', async () => {
        await registerPage.register("tester234", "tester", "001", "emailAS3@gmail.com", "Te4", "Te4", "Male", "06 May 1995", "Albania", "0987678555");

        await registerPage.verifyText("h1.entry-title", "Register");

        await registerPage.verifyFormSubmissionBlocked();
        await registerPage.verifyErrorMessage(selectors.register.passwordError, "Your Password must contain at least 8 characters");
    })

    test('Password contain the part of email address', async () => {
        await registerPage.register("tester234", "tester", "001", "emailAS3@gmail.com", "emailAS3", "Te4435345", "Male", "06 May 1995", "Albania", "0987678555");

        await registerPage.verifyText("h1.entry-title", "Register");

        await registerPage.verifyFormSubmissionBlocked();
        await registerPage.verifyErrorMessage(selectors.register.passwordError, "Your password cannot contain the part of your email address");
    })

    test('Confirm password wrong', async () => {
        await registerPage.register("tester234", "tester", "001", "emailAS3@gmail.com", "Test1234", "Te4435345", "Male", "06 May 1995", "Albania", "0987678555");

        await registerPage.verifyText("h1.entry-title", "Register");

        await registerPage.verifyFormSubmissionBlocked();
        await registerPage.verifyErrorMessage(selectors.register.confirmPasswordError, "Your passwords do not match");
    })

    test('Should not register with existing username', async () => {
        await registerPage.register("tester02", "tester", "001", "emailAS3@gmail.com", "Test1234", "Te4435345", "Male", "06 May 1995", "Albania", "0987678555");

        await registerPage.verifyText("h1.entry-title", "Register");

        await registerPage.verifyFormSubmissionBlocked();
        await registerPage.verifyErrorMessage(selectors.register.usernameError, "The username you entered is incorrect");
    })
})