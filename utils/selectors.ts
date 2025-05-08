export const selectors = {
    login: {
        username: "#username-92",
        password: "#user_password-92",
        loginButton: "#um-submit-btn",
        usernameError: "#um-error-for-username-92",
        passwordError: "#um-error-for-user_password-92"
    },
    register: {
        username: "#user_login-91",
        firstName: "#first_name-91",
        lastName: "#last_name-91",
        email: "#user_email-91",
        password: "#user_password-91",
        confirmPassword: "#confirm_user_password-91",
        gender: (value: string) => `#um_field_91_gender label:has(input[value="${value}"])`,
        birthday: "#birth_date-91",
        country: "#country",
        phoneNumber: "#phone_number-91",
        registerButton: "#um-submit-btn",
        loginButton: "a:has-text('Login')",
        usernameError: "#um-error-for-user_login-91",
        emailError: "#um-error-for-user_email-91",
        passwordError: "#um-error-for-user_password-91",
        confirmPasswordError: '#um-error-for-confirm_user_password-91',
        genderError: "#um-error-for-gender"
    }
}