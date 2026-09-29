import { test, expect } from "../../../../fixtures/admin/adminLogin.fixture";
import { QualificationTypesPage } from "../../../../pages/admin/Admissions/Academic_Structure/QualificationTypesPage";

function generateTimestamp() {

    const now = new Date();

    const pad = (value: number) =>
        String(value).padStart(2, "0");

    return `${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
}

test.describe("Admin - Qualification Types Tests", () => {

    test(
        "Qualification Types - Add, Validation and Edit",
        async ({ loggedInPage }) => {

           
          const qualificationTypesPage =
                new QualificationTypesPage(loggedInPage);

            const timestamp = generateTimestamp();

            const qualificationTypeName = `Btech${timestamp}`;

            const updatedQualificationTypeName = `Mtech${timestamp}`;


            // =========================
            // Add Qualification Type
            // =========================

            await qualificationTypesPage.openQualificationTypes();

            await qualificationTypesPage.clickAddQualificationType();

          
            await qualificationTypesPage.createQualificationType(
                qualificationTypeName
            );



            // =========================
            // Required Name Validation
            // =========================

            await qualificationTypesPage.openQualificationTypes();

            await qualificationTypesPage.clickAddQualificationType();

            await qualificationTypesPage.enterQualificationTypeName("");

            await loggedInPage.keyboard.press('Tab')
            await expect(loggedInPage.getByText("Qualification type name is required.")
            ).toBeVisible();

            // =========================
            // Edit Qualification Type
            // =========================

            await qualificationTypesPage.openQualificationTypes();

            await qualificationTypesPage.searchQualificationType(
                qualificationTypeName
            );

            await qualificationTypesPage.clickQualificationType(
                qualificationTypeName
            );

            await qualificationTypesPage.clickEditQualificationType();

            await qualificationTypesPage.enterQualificationTypeName(
                updatedQualificationTypeName
            );

            await qualificationTypesPage.clickSaveChanges();



            await qualificationTypesPage.searchQualificationType(
                updatedQualificationTypeName
            );

            await expect(
                loggedInPage.getByText(
                    updatedQualificationTypeName
                )
            ).toBeVisible();
        }
    );
});