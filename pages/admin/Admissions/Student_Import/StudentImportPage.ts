
import {Page, expect} from "@playwright/test";

export class StudentImportPage {
    constructor(private page: Page) {}

    async openStudentImport() {

        await this.page
        .locator("//h2[normalize-space()='Admissions']")
        .click();

        await this.page.getByRole("link",{
            name : "Student Import",
            exact: true,
        }).click();
    }

    // Import students form open cheyyunnu:


    async openImportStudents(){

        await this.page.getByRole("link",{
            name:"Import Students",
            exact:true,
        }).click();
        
    }


     // Dropdown selections.
    async selectQualificationType() {
        await this.page.locator("#mis-select-trigger-4").click();
        await this.page.locator("#brn-select-item-11").click();
    }

    async selectAcademicYear() {
        await this.page.locator("#mis-select-trigger-5").click();
        await this.page.locator("#brn-select-item-15").click();
    }

    async selectAcademicBatch() {
        await this.page.locator("#mis-select-trigger-6").click();
        await this.page.locator("#brn-select-item-16").click();
    }

    async selectAcademicPeriod() {
        await this.page.locator("#mis-select-trigger-7").click();
        await this.page.locator("#brn-select-item-18").click();
    }

    async selectImportOptions() {
        await this.selectQualificationType();
        await this.selectAcademicYear();
        await this.selectAcademicBatch();
        await this.selectAcademicPeriod();
    }

    async uploadFile(filePath: string) {
        await this.page
            .locator('input[type="file"]')
            .setInputFiles(filePath);
    }

        async analyzeSpreadsheet() {
        await this.page
            .getByRole("button", {
                name: "Analyze Spreadsheet",
            })
            .click();
    }

    async importStudents() {
        await this.page
            .getByRole("button", {
                name: "Import Students",
                exact: true,
            })
            .click();
    }


      // Success/error message assertion. Success and error msg ellam evide check cheyyum .
    async expectStatusMessage(message: string) {
        await expect(
            this.page.getByRole("status")
                .filter({ hasText: message })
        ).toBeVisible();
    }

    // Batch approval.
    async approveBatch(remarks: string) {
        await this.page
            .getByRole("button", { name: "Approve Batch" })
            .click();

        await this.page
            .getByRole("textbox", { name: "Approval Remarks" })
            .fill(remarks);

        await this.page
            .getByRole("button", { name: "Confirm Approval" })
            .click();
    }


        // Roll-number approval.
    async approveRollNumbers() {
        await expect(
            this.page.getByText(
                "Workflow: Waiting for Roll Number Approval"
            )
        ).toBeVisible();

        await this.page
            .locator("#brn-dialog-trigger-15")
            .click();

        const dialog = this.page.getByRole("alertdialog", {
            name: "Approve Roll Numbers",
        });

        await expect(dialog).toBeVisible();

        await dialog
            .getByRole("button", {
                name: "Approve & Continue",
            })
            .click();
    }


        // Welcome email template selection.
    async selectWelcomeEmailTemplate() {
        await this.page
            .locator("#brn-dialog-trigger-19")
            .click();

        await expect(
            this.page.getByText("Select Welcome Mail Template *")
        ).toBeVisible();

        await this.page
            .locator("#mis-select-trigger-12")
            .click();

       
        await this.page.locator("#brn-dialog-8").click();
        await this.page.locator("#brn-dialog-7").click();

        await expect(
            this.page.getByRole("heading", {
                name: "Welcome to NIT Calicut - Ph.D",
            })
        ).toBeVisible();
    }

    // Dispatch welcome emails.
    async confirmAndSendEmails() {
        await this.page
            .getByRole("button", {
                name: "Confirm & Send Emails",
            })
            .click();

        await expect(
            this.page.getByRole("heading", {
                name: "Welcome Email Dispatch",
            })
        ).toBeVisible();
    }

    // Return to Student Import listing.
    async returnToStudentImportListing() {
        await this.page
            .getByRole("link", {
                name: "Student Import",
                exact: true,
            })
            .click();
    }

    // Listing filters :
    async filterCompletedApprovedPhDBatches() {
        // Qualification Type -> PhD.
        await this.page.locator("#mis-select-trigger-6").click();
        await this.page.locator("#brn-dialog-1").click();

        // Status -> Completed.
        await this.page.locator("#mis-select-trigger-7").click();
        await this.page.locator("#brn-dialog-2").click();

        // Approval -> Approved.
        await this.page.locator("#mis-select-trigger-8").click();
        await this.page.locator("#brn-dialog-3").click();

        await this.page.waitForTimeout(100)
    }

    // Batch rejection.
    async rejectBatch(reason: string) {
        await this.page
            .getByRole("button", { name: "Reject Batch" })
            .click();

        await this.page
            .getByRole("textbox", { name: /Rejection Reason/ })
            .fill(reason);

        await this.page
            .getByRole("button", { name: "Confirm Rejection" })
            .click();
    }

    // Delete confirmation.

    async deleteBatch() {
        await this.page
            .getByRole("button", { name: "Delete" })
            .click();

        const dialog = this.page.getByRole("alertdialog", {
            name: "Delete Student Import",
        });

        await expect(dialog).toBeVisible();

        await dialog
            .getByRole("button", { name: "Delete" })
            .click();
    }


}