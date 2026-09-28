import { Page } from "@playwright/test";

export class EditUserPage {

    constructor(private page: Page) {}

    async openEditUser() {

        await this.page.goto("/apps");

        await this.page
            .locator("//h2[normalize-space()='Administration']")
            .click();

        await this.page
            .getByRole("link", { name: "Users", exact: true })
            .click();

        // Searching for the user mail to edit
        await this.page
            .getByRole("textbox", {
                name: "Search by name or email..."
            })
            .fill("arju@gmail.com");

        const userRow = this.page
            .getByRole("row")
            .filter({
                hasText: "arju@gmail.com"
            });

        await userRow
            .getByRole("button", { name: "Action options" })
            .click();

        
        await this.page
            .getByRole("menuitem", { name: "Edit User" })
            .click();
    }

    async enterFullName(fullName: string) {

        await this.page
            .getByRole("textbox", { name: "Full Name" })
            .fill(fullName);
    }

    async enterEmail(email: string) {

        await this.page.getByRole("textbox", { name: "Email Address" })
            .fill(email);
    }

    async enterPassword(password: string) {

        await this.page
            .getByRole("textbox", {name: "Password (Leave blank to keep",exact: false
            })
            .fill(password);
    }

    async enterConfirmPassword(confirmPassword: string) {

        await this.page
            .getByRole("textbox", {name: "Confirm New Password"}).fill(confirmPassword);
    }

    async clickUpdateUser() {

        await this.page.getByRole("button", { name: "Update User" }).click();
    }

    async updateUser(
        fullName: string,
        email: string,
        password?: string,
        confirmPassword?: string
    ) {

        await this.enterFullName(fullName);

        await this.enterEmail(email);

        
        if (password !== undefined) {
            await this.enterPassword(password);
        }

        
        if (confirmPassword !== undefined) {
            await this.enterConfirmPassword(confirmPassword);
        }

        await this.clickUpdateUser();
    }
}