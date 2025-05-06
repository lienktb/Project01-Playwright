import { expect, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { selectors } from '../utils/selectors';

export class RegisterPage extends BasePage {
    constructor (page: Page) {
        super(page);
    }

    async fillRegistrationForm (username: string, firstName: string, lastName: string, email: string, password: string, confirmPassword: string, gender: string, birthday: string, country: string, phoneNumber: string) {
        await this.fillLocator(selectors.register.username, username);
        await this.fillLocator(selectors.register.firstName, firstName);
        await this.fillLocator(selectors.register.lastName, lastName);
        await this.fillLocator(selectors.register.email, email);
        await this.fillLocator(selectors.register.password, password);
        await this.fillLocator(selectors.register.confirmPassword, confirmPassword);
        gender && await this.clickElement(selectors.register.gender(gender));
        await this.fillBirthDate(selectors.register.birthday, birthday);
        await this.selectCountry(selectors.register.country, country);
        await this.fillLocator(selectors.register.phoneNumber, phoneNumber);
    }

    async selectCountry (locator: string, value: string) {
        await this.page.locator(locator).selectOption(value);
    }

    async fillBirthDate(selector: string, dateString: string) {
        await this.page.evaluate(
          ({ selector, dateString }) => {
            const input = document.querySelector(selector) as HTMLInputElement;
            if (input) {
              input.value = dateString;
              input.dispatchEvent(new Event('input', { bubbles: true }));
              input.dispatchEvent(new Event('change', { bubbles: true }));
            }
          },
          { selector, dateString } 
        );
    }

    async clickRegisterButton () {
        await this.clickElement(selectors.register.registerButton);
    }

    async register (username: string, firstName: string, lastName: string, email: string, password: string, confirmPassword: string, gender: string, birthday: string, country: string, phoneNumber: string) {
        await this.fillRegistrationForm(username, firstName, lastName, email, password, confirmPassword, gender, birthday, country, phoneNumber);
        await this.clickRegisterButton();
    }

    async verifyErrorMessage (field: string, expectedText: string) {
        await this.verifyElementVisible(field);
        await this.verifyText(field, expectedText);
    }

    async verifyFormSubmissionBlocked () {
        await expect(this.page).toHaveURL(/.*\/register\//)
    }
}