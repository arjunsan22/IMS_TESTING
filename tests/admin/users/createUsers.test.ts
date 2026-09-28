import { test, expect } from "../../../fixtures/admin/adminLogin.fixture";
import { CreateUserPage } from "../../../pages/admin/users/CreateUserPage";
import path from "path";

function generateTimestamp() {

    const now = new Date();

    const pad = (value: number) =>
        String(value).padStart(2, "0");

    return `${pad(now.getDate())}-${pad(now.getMonth() + 1)}-${now.getFullYear()}-${pad(now.getHours())}-${pad(now.getMinutes())}-${pad(now.getSeconds())}`;
}


test.describe("Admin - Create User Tests", () => {

    const userCases = [

        {
            name: "Valid Create User",
            expected: "success"
        },

        {
            name: "Invalid Email",
            expected: "invalidEmail"
        },

        {
            name: "Short Password",
            expected: "shortPassword"
        },

        {
            name: "Password Mismatch",
            expected: "passwordMismatch"
        },

        {
            name: "Required Fields",
            expected: "required"
        }

    ];

    test("Create User test for : All Scenarios", async ({ loggedInPage }) => {


        const createUserPage = new CreateUserPage(loggedInPage);

    for (const testCase of userCases) {

                const timestamp = generateTimestamp();

                const fullName =
                    `Arjun-${timestamp}`;

                const email =
                    `arjun${timestamp}@gmail.com`;

                const validPassword =
                    "12345678";


                
                await createUserPage.openCreateUser();


            
                // VALID CREATE USER
              

                if (testCase.expected === "success") {

                        const imagePath = path.resolve(process.env.PROFILE_IMAGE_PATH!);

                    await createUserPage.createUser(
                        fullName,
                        email,
                        validPassword,
                        validPassword,
                        imagePath
                    );
                    

                  //User created successfully.
                    await expect(loggedInPage.getByText("User created successfully."))
                    .toBeVisible();
                    // After creating the user,
                    // search for the newly created email
                    await createUserPage.searchUser(email);

                    // Check newly created user appears

                    const userRow =
                        loggedInPage
                            .getByRole("row")
                            .filter({ hasText: email });

                    await expect(userRow).toBeVisible();
                }


                
                // INVALID EMAIL
                

                else if (testCase.expected === "invalidEmail") {

                    // await createUserPage.enterFullName(fullName);

                    await createUserPage.enterEmail(
                        "arjun.gmail.com"
                    );

                    await createUserPage.enterPassword(
                        validPassword
                    );

                    // await createUserPage.enterConfirmPassword(
                    //     validPassword
                    // );

                    // await createUserPage.selectRole();


                    await expect(loggedInPage.getByText("Please enter a valid email address.")
                    ).toBeVisible();
                }


              
                // SHORT PASSWORD
                

                else if (testCase.expected === "shortPassword") {

                    // await createUserPage.enterFullName(fullName);

                    // await createUserPage.enterEmail(email);

                    await createUserPage.enterPassword(
                        "12345"
                    );

                    await createUserPage.enterConfirmPassword(
                        "12345"
                    );

                    // await createUserPage.selectRole();


                    await expect(loggedInPage.getByText("Password must be at least 8 characters."))
                    .toBeVisible();
                }


                
                // PASSWORD MISMATCH
                

                else if (testCase.expected === "passwordMismatch") {

                    // await createUserPage.enterFullName(fullName);

                    // await createUserPage.enterEmail(email);

                    await createUserPage.enterPassword(
                        validPassword
                    );

                    await createUserPage.enterConfirmPassword(
                        "1234567"
                    );

                    await createUserPage.selectRole();

                    await expect(loggedInPage.getByText("Passwords do not match." )).toBeVisible();
                }


                
                // REQUIRED FIELDS
               

                else if (testCase.expected === "required") {

                    await createUserPage.clickCreateUser();
                    await loggedInPage.waitForTimeout(400);
                    await expect(loggedInPage.getByText("Email address is required."))
                    .toBeVisible();

                    await expect(loggedInPage.getByText("Full name is required."))
                    .toBeVisible();
                }

            
    }
    });// test

});