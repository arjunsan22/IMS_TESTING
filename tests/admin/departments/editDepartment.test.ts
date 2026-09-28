import { test, expect } from "../../../fixtures/admin/adminLogin.fixture";
import { DepartmentPage } from "../../../pages/admin/departments/DepartmentPage";

function generateTimestamp() {
    const now = new Date();

    const pad = (value: number) =>
        String(value).padStart(2, "0");

    return `${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
}

test.describe("Admin - Edit Department Tests", () => {

    const departmentCases = [
        {
            name: "Valid Edit Department",
            expected: "success"
        },
        {
            name: "Required Department Name",
            expected: "requiredName"
        },
        {
            name: "Required Short Code",
            expected: "requiredShortCode"
        },
        {
            name: "Duplicate Short Code",
            expected: "duplicateShortCode"
        },
        {
            name: "Duplicate Roll Number Prefix",
            expected: "duplicateRollPrefix"
        },
        {
            name: "Duplicate Course Code Prefix",
            expected: "duplicateCoursePrefix"
        }
    ];

    test(
        "Edit Department test for : All Scenarios",
        async ({ loggedInPage }) => {

            const departmentPage = new DepartmentPage(loggedInPage);

            // Existing department created earlier
            let currentShortCode = "P200646";

            for (const testCase of departmentCases) {

                const timestamp = generateTimestamp();

                const newDepartmentName = `Psychology-${timestamp}`;

                const uniqueShortCode = `P${timestamp}`;
                const uniqueRollPrefix = `R${timestamp}`;
                const uniqueCoursePrefix = `C${timestamp}`;

                const existingShortCode = "CCCC";
                const existingRollPrefix = "CCCC";
                const existingCoursePrefix = "CCCC";

                await departmentPage.openEditDepartment(
                    currentShortCode
                );


                // ─────────────────────────────────────
                // VALID EDIT DEPARTMENT
                // ─────────────────────────────────────

                if (testCase.expected === "success") {

                    await departmentPage.enterDepartmentName(
                        newDepartmentName
                    );

                    await departmentPage.enterShortCode(
                        uniqueShortCode
                    );

                    await departmentPage.selectDepartmentType();

                    await departmentPage.enterRollNumberPrefix(
                        uniqueRollPrefix
                    );

                    await departmentPage.enterCourseCodePrefix(
                        uniqueCoursePrefix
                    );

                    await departmentPage.clickUpdateDepartment();

                    await expect(
                        loggedInPage.getByText("Department updated successfully."))
                        .toBeVisible();

                        currentShortCode = uniqueShortCode;
                }


                // ─────────────────────────────────────
                // REQUIRED DEPARTMENT NAME
                // ─────────────────────────────────────

                else if (testCase.expected === "requiredName") {

                    await departmentPage.enterDepartmentName("");

                    await loggedInPage.keyboard.press('Tab')

                    await expect(
                        loggedInPage.getByText(
                            "Department name is required."
                        )
                    ).toBeVisible();

                }


                // ─────────────────────────────────────
                // REQUIRED SHORT CODE
                // ─────────────────────────────────────

                else if (testCase.expected === "requiredShortCode") {

                    await departmentPage.enterShortCode("");

                    await loggedInPage.keyboard.press('Tab')

                    await expect(
                        loggedInPage.getByText(
                            "Short code is required."
                        )
                    ).toBeVisible();
                }


                // ─────────────────────────────────────
                // DUPLICATE SHORT CODE
                // ─────────────────────────────────────

                else if (testCase.expected === "duplicateShortCode") {

                    await departmentPage.enterShortCode(
                        existingShortCode
                    );

                    await departmentPage.clickUpdateDepartment();

                    await expect(
                        loggedInPage.getByText(
                            "The short code has already been taken."
                        )
                    ).toBeVisible();
                }


                // ─────────────────────────────────────
                // DUPLICATE ROLL NUMBER PREFIX
                // ─────────────────────────────────────

                else if (testCase.expected === "duplicateRollPrefix") {

                    await departmentPage.enterRollNumberPrefix(
                        existingRollPrefix
                    );

                    await departmentPage.clickUpdateDepartment();

                    await expect(
                        loggedInPage.getByText(
                            "The roll no prefix has already been taken."
                        )
                    ).toBeVisible();
                }


                // ─────────────────────────────────────
                // DUPLICATE COURSE CODE PREFIX
                // ─────────────────────────────────────

                else if (testCase.expected === "duplicateCoursePrefix") {

                    await departmentPage.enterCourseCodePrefix(
                        existingCoursePrefix
                    );

                    await departmentPage.clickUpdateDepartment();

                    await expect(
                        loggedInPage.getByText(
                            "The course code prefix has already been taken."
                        )
                    ).toBeVisible();
                }
            }
        }
    );
});