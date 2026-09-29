import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
import dotenv from 'dotenv';
import path from 'path';



// Which project did we run?
// ------------------------------------

const projectArg = process.argv.find(arg => arg.startsWith('--project='));

const projectName = projectArg ? projectArg.split('=')[1] : 'dev';

// ------------------------------------
// Select corresponding .env file
// ------------------------------------

const envFile = `.env.${projectName}`;

dotenv.config({
    path: path.resolve(__dirname, envFile)
});


/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */

  testMatch:['tests/admin/Admissions/Academic_Structure/qualificationTypes.test.ts'],


  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
    
  reporter: [["dot"],["json",{
    outputFile:"jsonReports/jsonReport.json"
  }], ["html",{
    open: "never"
  }]],
  
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://localhost:3000',
        headless:false,
    screenshot:"on",
    // screenshot:"only-on-failure",
    video:"on",

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    
    trace: 'on-first-retry',

  // selected .env file-il ninnu BASE_URL varum
    baseURL: process.env.BASE_URL,  //environment URL configuration

    //why this baseURL in the use{} ?,-> so we can only write this in tests. 
//     await page.goto("/login");

// Playwright knows:

 // baseURL + /login

  },

  /* Configure projects for major browsers */

  projects: [

        {
            name: 'dev',
            use: {
                ...devices['Desktop Chrome'], //this line is -> browser/device configuration

                // baseURL: process.env.BASE_URL, 
                //Ithum possible aanu: its also correct step
                //but read line before the closing of this project array
            },
        },

        // {
        //     name: 'qa',
        //     use: {
        //         ...devices['Desktop Chrome'],
        //     },
        // },

        // {
        //     name: 'staging',
        //     use: {
        //         ...devices['Desktop Chrome'], 
        //     },
        // },

        // But note: ivide moonu project-ilum same -> process.env.BASE_URL thanne aanu.
        //  .env.dev / .env.qa / .env.staging already selected according to command.
//         So:

              // npx playwright test --project=dev

              // → process.env.BASE_URL = DEV

              // npx playwright test --project=qa

              // → process.env.BASE_URL = QA

              // and so on.
    ],


//     projects:

// projects: [
//     { name: "dev" },
//     { name: "qa" },
//     { name: "staging" }
// ]

//this tells to playwright, the environment names 

// but:

// dev → .env.dev
// qa → .env.qa
// staging → .env.staging

// എന്ന connection നാം മുകളിൽ ഈ code കൊണ്ടാണ് ഉണ്ടാക്കിയത്:
// const projectArg = process.argv.find(
//     arg => arg.startsWith('--project=')
// );

// const projectName = projectArg
//     ? projectArg.split('=')[1]
//     : 'dev';

// const envFile = `.env.${projectName}`;

// dotenv.config({
//     path: path.resolve(__dirname, envFile)
// });

});
