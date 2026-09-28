import { Page } from "@playwright/test";

export class CreateUserPage {

    constructor(private page: Page) {}

    async openCreateUser() {

        await this.page.goto('/apps')

        await this.page.locator("//h2[normalize-space()='Administration']").click();
        
        await this.page
            .getByRole("link", { name: "Users", exact: true })
            .click();

        await this.page
            .getByRole("link", { name: "Add User" })
            .click();
    }

    async enterFullName(fullName: string) {

        await this.page
            .getByRole("textbox", { name: "Full Name" })
            .fill(fullName);
    }

    async enterEmail(email: string) {

        await this.page
            .getByRole("textbox", { name: "Email Address" })
            .fill(email);
    }

    async enterPassword(password: string) {

        await this.page
            .getByRole("textbox", {
                name: "Password",
                exact: true
            })
            .fill(password);
    }

    async enterConfirmPassword(confirmPassword: string) {

        await this.page
            .getByRole("textbox", { name: "Confirm Password" })
            .fill(confirmPassword);
    }


    async uploadProfileImage(imagePath: string) {

    await this.page
        .locator('input[type="file"]')
        .setInputFiles(imagePath);
}

    async selectRole() {

        await this.page
            .getByRole("button", { name: "student" })
            .click();


    }

    async clickCreateUser() {

        await this.page
            .getByRole("button", { name: "Create User" })
            .click();
    }

    async searchUser(email: string) {

        await this.page
            .getByRole("textbox", {
                name: "Search by name or email..."
            })
            .fill(email);
    }

    async createUser(
        fullName: string,
        email: string,
        password: string,
        confirmPassword: string,
         imagePath: string
    ) {

        await this.enterFullName(fullName);
        await this.enterEmail(email);
        await this.enterPassword(password);
        await this.enterConfirmPassword(confirmPassword);
        await this.uploadProfileImage(imagePath);
        await this.selectRole();
        await this.clickCreateUser();
    }
}