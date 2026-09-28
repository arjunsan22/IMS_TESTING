import { test, expect } from "../../../fixtures/admin/adminLogin.fixture";
import { EditUserPage } from "../../../pages/admin/users/EditUserPage";


test.describe("Admin - Edit User Tests", () => {

    const userCases = [

        {
            name: "Valid Edit User",
            expected: "success"
        },

        {
            name: "Required Full Name",
            expected: "requiredName"
        },

        {
            name: "Required Email",
            expected: "requiredEmail"
        },

        {
            name: "Short Password",
            expected: "shortPassword"
        },

        {
            name: "Password Mismatch",
            expected: "passwordMismatch"
        }

    ];


    test(
        "Edit User test for : All Scenarios",
        async ({ loggedInPage }) => {

            const editUserPage =
                new EditUserPage(loggedInPage);


            for (const testCase of userCases) {

                await editUserPage.openEditUser();


                // ==============================
                // VALID EDIT USER
                // ==============================

                if (testCase.expected === "success") {

                    await editUserPage.updateUser(
                        "Arjun Updated",
                        "arju@gmail.com"
                    );

                    await expect(
                        loggedInPage.getByText(
                            "User updated successfully."
                        )
                    ).toBeVisible();
                }


                // ==============================
                // REQUIRED FULL NAME
                // ==============================

               
                else if (
                    testCase.expected === "requiredName"
                ) {

                    await editUserPage.enterFullName("");

                    await editUserPage.clickUpdateUser();

                    await expect(
                        loggedInPage.getByText(
                            "Full name is required."
                        )
                    ).toBeVisible();
                }


                // ==============================
                // REQUIRED EMAIL
                // ==============================

                else if (
                    testCase.expected === "requiredEmail"
                ) {

                    await editUserPage.enterEmail("");

                    await editUserPage.clickUpdateUser();

                    await expect(
                        loggedInPage.getByText(
                            "Email address is required."
                        )
                    ).toBeVisible();
                }


                // ==============================
                // SHORT PASSWORD
                // ==============================

                else if (
                    testCase.expected === "shortPassword"
                ) {

                    await editUserPage.enterPassword(
                        "1234567"
                    );

                    await editUserPage.enterConfirmPassword(
                        "1234567"
                    );

                    await loggedInPage.getByRole("button", { name: "Update User" }).click();

                    await expect(loggedInPage.getByText("The password field must be at least 8 characters.")
                    ).toBeVisible();
                }


                // ==============================
                // PASSWORD MISMATCH
                // ==============================

                else if (
                    testCase.expected === "passwordMismatch"
                ) {

                    await editUserPage.enterPassword(
                        "12345678"
                    );

                    await editUserPage.enterConfirmPassword(
                        "1234567"
                    );

                    await editUserPage.clickUpdateUser();

                    await expect(
                        loggedInPage.getByText(
                            "Passwords do not match."
                        )
                    ).toBeVisible();
                }
            }
        }
    );

});