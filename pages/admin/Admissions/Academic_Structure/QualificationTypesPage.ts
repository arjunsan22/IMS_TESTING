import { Page } from "@playwright/test";

export class QualificationTypesPage {

    constructor(private page: Page) {}

    async openQualificationTypes() {

        await this.page.goto("/apps");

        await this.page
            .locator("//h2[normalize-space()='Admissions']")
            .click();

        await this.page
            .getByRole("button", { name: "Academic Structure" })
            .click();

        await this.page
            .getByRole("link", {
                name: "Qualification Types",
                exact: true
            })
            .click();
    }

    async clickAddQualificationType() {

        await this.page
            .getByRole("link", {
                name: "Add Qualification Type"
            })
            .click();
    }

    async enterQualificationTypeName(name: string) {

        await this.page
            .getByRole("textbox", {
                name: "Qualification Type Name *"
            })
            .fill(name);
    }

    async toggleStatus() {

        await this.page
            .getByRole("switch")
            .click();
    }

    async clickCreateQualificationType() {

        await this.page
            .getByRole("button", {
                name: "Create Qualification Type"
            })
            .click();
    }

    async createQualificationType(name: string) {

        await this.enterQualificationTypeName(name);

        await this.clickCreateQualificationType();
    }

    
    async searchQualificationType(name: string) {

        await this.page
            .getByRole("textbox", {
                name: "Search qualification types..."
            })
            .fill(name);
    }

    async clickQualificationType(name: string) {

        await this.page
            .getByText(name, { exact: true })
            .click();
    }

async clickEditQualificationType() {

    await this.page
        .locator("tbody tr:nth-child(1)")
        .locator("a[title='Edit Qualification Type']")
        .click();
}

    async clickSaveChanges() {

        await this.page
            .getByRole("button", {
                name: "Save Changes"
            })
            .click();
    }
}