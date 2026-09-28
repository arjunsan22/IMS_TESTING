
import { Page } from "@playwright/test";

export class DepartmentPage {

    constructor(private page: Page) {}

    async openCreateDepartment() {

        await this.page.goto("/apps");

        await this.page.locator("//h2[normalize-space()='Administration']").click();

        await this.page
            .getByRole("link", { name: "Departments" })
            .click();

        await this.page
            .getByRole("link", { name: "Create Department" })
            .click();
    }

    async enterDepartmentName(departmentName: string) {
        await this.page
            .getByRole("textbox", { name: "Department Name *" })
            .fill(departmentName);
    }

    async enterShortCode(shortCode: string) {
        await this.page
            .getByRole("textbox", { name: "Short Code *" })
            .fill(shortCode);
    }

    async selectDepartmentType() {
        await this.page
            .getByRole("combobox", { name: "Department Type *" })
            .click();

        await this.page.locator("#brn-dialog-1").click();
    }

    async enterRollNumberPrefix(rollNumberPrefix: string) {
        await this.page
            .getByRole("textbox", { name: "Roll Number Prefix" })
            .fill(rollNumberPrefix);
    }

    async enterCourseCodePrefix(courseCodePrefix: string) {
        await this.page
            .getByRole("textbox", { name: "Course Code Prefix" })
            .fill(courseCodePrefix);
    }

    async clickCreateDepartment() {
        await this.page
            .getByRole("button", { name: "Create Department" })
            .click();
    }

    async createDepartment(
        departmentName: string,
        shortCode: string,
        rollNumberPrefix: string,
        courseCodePrefix: string
    ) {
        await this.enterDepartmentName(departmentName);
        await this.enterShortCode(shortCode);
        await this.selectDepartmentType();
        await this.enterRollNumberPrefix(rollNumberPrefix);
        await this.enterCourseCodePrefix(courseCodePrefix);
        await this.clickCreateDepartment();
    }

    async searchDepartment(shortCode: string) {
        await this.page.getByRole("textbox", {name: "Search by name, code, or type"})
            .fill(shortCode);

        await this.page.waitForTimeout(100)
    
    
    }

////////
        //EDIT DEPARTMENT///
///////

async openEditDepartment(shortCode: string) {

    await this.page.goto("/apps");

    await this.page
        .locator("//h2[normalize-space()='Administration']")
        .click();

    await this.page
        .getByRole("link", { name: "Departments" })
        .click();

    await this.page
        .getByRole("textbox", {
            name: "Search by name, code, or type"
        })
        .fill(shortCode);

        await this.page.waitForTimeout(200)

await this.page
    .locator("tbody tr:nth-child(1)")
    .locator("a[title='Edit Department']")
    .click();
}

async clickUpdateDepartment() {
    await this.page
        .getByRole("button", { name: "Save Changes" })
        .click();
}


}