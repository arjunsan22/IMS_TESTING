import {test , expect} from "../../../../fixtures/admin/adminLogin.fixture"
import { StudentImportPage } from "../../../../pages/admin/Admissions/Student_Import/StudentImportPage"
import path from "node:path";

const studentFiles = {
    valid: path.resolve(
        process.cwd(),
        process.env.VALID_STUDENTS_FILE_PATH!
    ),
    invalid: path.resolve(
        process.cwd(),
        process.env.INVALID_STUDENTS_FILE_PATH!
    ),
};



test.describe("student Import Module",()=>{

    test("01 - Valid student data import", async({loggedInPage})=>{
        
        const studentImport = new StudentImportPage(loggedInPage);

        await studentImport.openStudentImport();
        await studentImport.openImportStudents();
        await studentImport.selectImportOptions();

        await studentImport.uploadFile(studentFiles.valid);
        await studentImport.analyzeSpreadsheet();

  // Valid spreadsheet - expected row count verify cheyyunnu.
        await expect(
            loggedInPage.getByText("Total Rows 4")
        ).toBeVisible();

       await studentImport.importStudents();

        await studentImport.expectStatusMessage(
            "Student import file uploaded"
        );

        await studentImport.expectStatusMessage(
            "Import processing completed."
        );

        // Batch pending approval stage-il ethiyaal mathram approve cheyyuka.
        await expect(
            loggedInPage.getByText("Pending Approval")
        ).toBeVisible();

        await studentImport.approveBatch("good");

        await studentImport.expectStatusMessage(
            "Student import approved"
        );

        //verify roll numbers 

        await studentImport.expectStatusMessage(
            "Roll numbers and institutional emails generated"
        );

        await expect(
            loggedInPage.getByText(
                "Workflow: Waiting for Roll Number Approval"
            )
        ).toBeVisible();

        
        //eni generated roll number approval
        await studentImport.approveRollNumbers();

       
        await studentImport.expectStatusMessage(
            "Roll numbers approved"
        );

        // Verify post-approval actions.
        await studentImport.expectStatusMessage(
            "Post-approval actions"
        );

        await expect(
            loggedInPage.getByRole("heading", {
                name: /Action Required: CNC Accounts Provisioned - welcome emails pending/i,
            })
        ).toBeVisible();

        //  Select the welcome email template.
        await studentImport.selectWelcomeEmailTemplate();

        //  Confirm and send welcome emails.
        await studentImport.confirmAndSendEmails();

        await studentImport.expectStatusMessage(
            "CNC mail creation confirmed"
        );

        await studentImport.expectStatusMessage(
            "Welcome emails dispatched"
        );

        //  Return to the student imports.
        await studentImport.returnToStudentImportListing();

        // eni filtering for PhD + Completed + Approved.
        await studentImport.filterCompletedApprovedPhDBatches();

        // Verify the completed batch is displayed.
        await expect(
            loggedInPage.getByRole("cell", {
                name: "Completed",
                exact: true,
            }).nth(1)
        ).toBeVisible();

 })// end of first test


//second test - invalid data
test("02 - Invalid student data validation", async ({ loggedInPage }) => {
        const studentImport = new StudentImportPage(loggedInPage);

        await studentImport.openStudentImport();
        await studentImport.openImportStudents();
        await studentImport.selectImportOptions();

        await studentImport.uploadFile(studentFiles.invalid);
        await studentImport.analyzeSpreadsheet();

        await expect(
            loggedInPage.getByRole("heading", {
                name: "Cannot Import: 9 Row(s)",
            })
        ).toBeVisible();

        await expect(
            loggedInPage.getByText("Spreadsheet validation failed")
        ).toBeVisible();

        await expect(
            loggedInPage.getByText("Rows with Errors 90% 9")
        ).toBeVisible();

        await expect(
            loggedInPage.getByRole("button", {
                name: "Re-upload Fixed File",
            })
        ).toBeVisible();
    });// end of second test

// third test - rejection
    test("03 - Reject a student import batch", async ({ loggedInPage }) => {
        const studentImport = new StudentImportPage(loggedInPage);

        // Ee test swantham batch create cheyyunnu.
        await studentImport.openStudentImport();
        await studentImport.openImportStudents();
        await studentImport.selectImportOptions();

        await studentImport.uploadFile(studentFiles.valid);
        await studentImport.analyzeSpreadsheet();
        await studentImport.importStudents();

        await studentImport.expectStatusMessage(
            "Import processing completed."
        );

        await expect(
            loggedInPage.getByText("Pending Approval")
        ).toBeVisible();

        await studentImport.rejectBatch("not good");

        await studentImport.expectStatusMessage(
            "Student import was rejected."
        );
    });// end of third test


    // fourth test - delete one branch

    test("04 - Delete a student import batch", async ({ loggedInPage }) => {
        const studentImport = new StudentImportPage(loggedInPage);

        await studentImport.openStudentImport();

        // TODO: Select the exact batch created for this test.
        // Verify its identity/status before clicking Delete.
        await expect(
            loggedInPage.getByRole("link", {
                name: "View Details",
            }).first()
        ).toBeVisible();

        await loggedInPage
            .getByRole("link", { name: "View Details" })
            .first()
            .click();

        await studentImport.deleteBatch();

        await studentImport.expectStatusMessage(
            "Student import deleted successfully."
        );

    });//end of fourth test

})