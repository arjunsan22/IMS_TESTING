import { test, expect } from "../../../fixtures/admin/adminLogin.fixture";
import { DepartmentPage } from "../../../pages/admin/departments/DepartmentPage";

function generateTimestamp() {
    const now = new Date();

    const pad = (value: number) =>
        String(value).padStart(2, "0");

    return `${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
}

test.describe("Admin - Create Department Tests", () => {

    const departmentCases = [
        {
            name: "Valid Create Department",
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
        "Create Department test for : All Scenarios",
        async ({ loggedInPage }) => {

            const departmentPage = new DepartmentPage(loggedInPage);

            for (const testCase of departmentCases) {

                const timestamp = generateTimestamp();

                const departmentName = `Psycho-${timestamp}`;

                // Existing values which are already present in DB
                const existingShortCode = "CCCC";
                const existingRollPrefix = "CCCC";
                const existingCoursePrefix = "CCCC";

                // Unique values for successful creation
                const uniqueShortCode = `PSY${timestamp}`;
                const uniqueRollPrefix = `psy${timestamp}`;
                const uniqueCoursePrefix = `psy${timestamp}`;

                await departmentPage.openCreateDepartment();


                // ─────────────────────────────────────
                // VALID CREATE DEPARTMENT
                // ─────────────────────────────────────

                if (testCase.expected === "success") {

                    await departmentPage.createDepartment(
                        departmentName,
                        uniqueShortCode,
                        uniqueRollPrefix,
                        uniqueCoursePrefix
                    );

                    await expect(
                        loggedInPage.getByText("Department created successfully.")
                    ).toBeVisible();

                    await departmentPage.searchDepartment(
                        uniqueShortCode
                    );

                }


                // ─────────────────────────────────────
                // REQUIRED DEPARTMENT NAME
                // ─────────────────────────────────────

                else if (testCase.expected === "requiredName") {

                    await departmentPage.enterDepartmentName("");

                    await departmentPage.enterShortCode(
                        uniqueShortCode
                    );

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

                    await departmentPage.selectDepartmentType();

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

                    await departmentPage.enterDepartmentName(
                        departmentName
                    );

                    await departmentPage.enterShortCode(
                        existingShortCode
                    );

                    await departmentPage.selectDepartmentType();

                    await departmentPage.enterRollNumberPrefix(
                        uniqueRollPrefix
                    );

                    await departmentPage.enterCourseCodePrefix(
                        uniqueCoursePrefix
                    );

                    await departmentPage.clickCreateDepartment();

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

                    await departmentPage.enterDepartmentName(
                        departmentName
                    );

                    await departmentPage.enterShortCode(
                        uniqueShortCode
                    );

                    await departmentPage.selectDepartmentType();

                    await departmentPage.enterRollNumberPrefix(
                        existingRollPrefix
                    );

                    await departmentPage.enterCourseCodePrefix(
                        uniqueCoursePrefix
                    );

                    await departmentPage.clickCreateDepartment();

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

                    await departmentPage.enterDepartmentName(
                        departmentName
                    );

                    await departmentPage.enterShortCode(
                        uniqueShortCode
                    );

                    await departmentPage.selectDepartmentType();

                    await departmentPage.enterRollNumberPrefix(
                        uniqueRollPrefix
                    );

                    await departmentPage.enterCourseCodePrefix(
                        existingCoursePrefix
                    );

                    await departmentPage.clickCreateDepartment();

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