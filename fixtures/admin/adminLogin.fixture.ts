import {test as base, expect, Page} from "@playwright/test"
import {AdminLoginPage} from "../../pages/admin/AdminLoginPage"

type AdminFixtures = {
    loggedInPage: Page;
}//creating a type // telling to playwright Hey, this is the exact type of
//  data that will be inside my fixture


export const test = base.extend<AdminFixtures>({
//loggedInPage means custom fixture-ന്റെ name
    loggedInPage: async ({page}, use)=>{

        const loginPage = new AdminLoginPage(page);

        await page.goto("/login");

        // Valid admin login
        await loginPage.login(
            process.env.EMAIL!,
            process.env.PASSWORD!
        );

        await expect(page).toHaveURL("/apps");

        await page.waitForLoadState("networkidle");

        await use(page);// this line means login completed this page ready or give for tests
    }
})

export {expect} from "@playwright/test"

// Playwright-ന്റെ expect-നെ ഈ fixture file-ൽ നിന്ന് പുറത്തേക്ക് export ചെയ്യുന്നു,
// അതിനാൽ test files-ൽ @playwright/test-ൽ നിന്ന് expect വീണ്ടും import ചെയ്യാതെ
// ഈ fixture file-ൽ നിന്ന് തന്നെ expect ഉപയോഗിക്കാം.
//now in test file we can use like this :
//import { test, expect } from "../fixtures/adminFixture";