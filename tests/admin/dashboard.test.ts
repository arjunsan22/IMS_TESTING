import { test, expect } from "../../fixtures/admin/adminLogin.fixture";

test.describe("Admin Dashboard Tests", () => {

    test("Dashboard should load correctly", async ({ loggedInPage }) => {


        await loggedInPage.locator("//h2[normalize-space()='Administration']").click();

        // Dashboard heading
        await expect(
            loggedInPage.getByRole("heading", {
                name: "System Dashboard"
            })
        ).toBeVisible();

        // Dashboard cards
        await expect(
            loggedInPage.getByText("Total Users", { exact: false })
        ).toBeVisible();

        await expect(
            loggedInPage.getByText("Roles & Access", { exact: false })
        ).toBeVisible();

        await expect(
            loggedInPage.getByText("Audit Events Today", { exact: false })
        ).toBeVisible();

        await expect( 
            loggedInPage.getByText("System Health", { exact: false })
        ).toBeVisible();

        // Graphs
        await expect(
            loggedInPage.getByText("User Growth Trend", { exact: false })
        ).toBeVisible();

        await expect(
            loggedInPage.getByText("Audit Event Activity", { exact: false })
        ).toBeVisible();

        await expect(
            loggedInPage.getByText("Role Distribution", { exact: false })
        ).toBeVisible();

        await expect(
            loggedInPage.getByText("Department Distribution", { exact: false })
        ).toBeVisible();
    });

});