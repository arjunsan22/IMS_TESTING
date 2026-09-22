import {test, expect} from "@playwright/test";
import {AdminLoginPage} from "../../pages/admin/AdminLoginPage";



test.describe("Data-Driven Admin_Login_Tests",()=>{

const loginCases = [
    {
        name: 'Valid Login',
        email: process.env.EMAIL!,//addding the ! mark is to ensure the playwrite never the email variable undefined
        password: process.env.PASSWORD!,
        expected: 'success'
    },
    {
        name: 'Invalid Password',
        email: process.env.EMAIL!,
        password: 'wrongpassword',
        expected: 'loginError'
    },
    {
        name: 'Invalid Email',
        email: 'wronguser@gmail.com',
        password: process.env.PASSWORD!,
        expected: 'loginError'
    },
    {
        name: 'Invalid Email Format',
        email: 'adminnitc.ac.in',
        password: process.env.PASSWORD!,
        expected: 'invalidEmail'
    },
    {
        name: 'Short Password',
        email: process.env.EMAIL!,
        password: '12345',
        expected: 'shortPassword'
    }
];


for(const testCase of  loginCases){

    test(`Admin_Login test for : ${testCase.name}`, async({page})=>{


    const loginPage = new AdminLoginPage(page);
    await page.goto(process.env.LOGIN_URL!)

    // Invalid email/short password cases-il Sign In button disabled aanu,
    // athukondu login() call cheyyathe inputs mathram fill cheyyunnu.
    // Success/loginError cases-il button enabled aayathukondu login() use cheyyunnu.

    if (testCase.expected === "success" ||testCase.expected === "loginError") {

        await loginPage.login(testCase.email,testCase.password);

    }
    else {

    await loginPage.enterEmail(testCase.email);
    await loginPage.enterPassword(testCase.password);

    }

           if(testCase.expected === "success"){
             await expect(page).toHaveURL(process.env.DASHBOARD_URL!);
             const adminUser = page.locator("//span[@title='Admin User']");

        //\\\// Element visible aano ennu check cheyyunu..../////\\\
                if (await adminUser.isVisible()) {
                    console.log("Admin User is visible in screen ✅");
                    await adminUser.click();
                } else {
                    console.log("Admin User not visible in screen ❌");
                }
            //checking administration heading is visible ......
            await expect(
                page.locator("//h2[normalize-space()='Administration']")
            ).toBeVisible();
            await page.waitForTimeout(2500)

        }
        else if (testCase.expected === "loginError"){
               await expect(
                page.getByText(/Invalid login credentials\.|Too many requests\. Please try again later\./)
            ).toBeVisible(); 
        }
        else if (testCase.expected === 'invalidEmail') {
             await expect(page.getByText('Please enter a valid email address.')).toBeVisible();
        }
        else if (testCase.expected === 'shortPassword'){
             await expect(page.getByText('Password must be at least 6 characters long.')).toBeVisible();
        }

    
    })
}

})
