                    PLAYWRIGHT
                        |
                ----------------
                |              |
          Common use       Projects
                |              |
          baseURL         DEV / QA / STAGING
          headless        |
          screenshot      ├── Desktop Chrome
          video           ├── Desktop Chrome
                          └── Desktop Chrome



AND COMMAND :

    --project=dev
        ↓
    select DEV project
        ↓
    .env.dev already loaded
        ↓
    BASE_URL = dev URL
        ↓
    Desktop Chrome
        ↓
    run test



    ///env files 

//.env.dev - filename:

    #authentication details:
EMAIL=admin@nitc.ac.in
PASSWORD=password

//routes
BASE_URL=https://mis.dev.nitc.ac.in
//after login
DASHBOARD_URL=https://mis.dev.nitc.ac.in/apps
//profile image in create user 
PROFILE_IMAGE_PATH=public/user.jpg


.env.qa:

#authentication details:
EMAIL=admin@nitc.ac.in
PASSWORD=password

//routes
BASE_URL=https://mis.qa.nitc.ac.in
//after login
DASHBOARD_URL=https://mis.qa.nitc.ac.in/apps
//profile image in create user 
PROFILE_IMAGE_PATH=public/user.jpg


//.env.staging:

#authentication details:
EMAIL=admin@nitc.ac.in
PASSWORD=password

//routes
BASE_URL=https://mis.staging.nitc.ac.in
//after login
DASHBOARD_URL=https://mis.staging.nitc.ac.in/apps
//profile image in create user 
PROFILE_IMAGE_PATH=public/user.jpg




----------------------


#student import workflow 

success case of students import :

import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {


  await page.goto('/apps)
  await page.getBytext('addmissions')
  await page.getByRole('link', { name: 'Student Import', exact: true }).click();
  await page.getByRole('link', { name: 'Import Students' }).click();
  await page.locator('#mis-select-trigger-4').click();
  await page.locator('#brn-dialog-1').click();
  await page.locator('#mis-select-trigger-5').click();
  await page.locator('#brn-dialog-2').click();
  await page.locator('#mis-select-trigger-6').click();
  await page.locator('#brn-dialog-3').click();
  await page.locator('#mis-select-trigger-7').click();
  await page.locator('#brn-dialog-4').click();
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Download Template' }).click();
  const download = await downloadPromise;
  await page.getByRole('status').click();
  await page.getByText('Template for PhD downloaded').click();
  await page.locator('.size-11').click();
  await page.locator('input[type="file"]').setInputFiles('students_valid_data.xlsx');// excel file path- public -files-  students_valid_data.xlsx 
  await page.getByRole('button', { name: 'Analyze Spreadsheet' }).click();
  await page.getByText('Total Rows 4').click();
  await page.getByRole('heading', { name: '4' }).nth(1).click();
  await page.getByRole('button', { name: 'Import Students' }).click();
  await page.getByRole('status').filter({ hasText: 'Student import file uploaded' }).click();
  await page.getByRole('status').filter({ hasText: 'Import processing completed.' }).click();
  await page.getByText('Pending Approval').click();
  await page.getByRole('button', { name: 'Approve Batch' }).click();
  await page.getByRole('textbox', { name: 'Approval Remarks' }).click();
  await page.getByRole('textbox', { name: 'Approval Remarks' }).fill('good');
  await page.getByRole('button', { name: 'Confirm Approval' }).click();
  await page.getByRole('status').filter({ hasText: 'Student import has been' }).click();
  await page.getByRole('status').filter({ hasText: 'Student import approved' }).click();
  await page.getByRole('status').filter({ hasText: 'Roll numbers and' }).click();
  await page.getByText('Approved').click();
  await page.locator('#brn-dialog-trigger-15').click();
  await page.getByRole('button', { name: 'Approve & Continue' }).click();
  await page.getByRole('status').filter({ hasText: 'Roll numbers approved' }).click();
  await page.getByRole('status').filter({ hasText: 'Post-approval actions' }).click();
  await page.locator('#brn-dialog-trigger-19').click();
  await page.locator('#mis-select-trigger-12').click();
  await page.locator('#brn-dialog-8').click();
  await page.getByRole('heading', { name: 'Welcome to NIT Calicut - Ph.D' }).click();
  await page.getByRole('button', { name: 'Confirm & Send Emails' }).click();
  await page.getByRole('status').filter({ hasText: 'CNC mail creation confirmed' }).click();
  await page.getByRole('status').filter({ hasText: 'Welcome emails dispatched' }).click();
  await page.getByRole('link').filter({ hasText: /^$/ }).click();
  await page.locator('#mis-select-trigger-13').click();
  await page.locator('#brn-dialog-9').click();
  await page.locator('#mis-select-trigger-14').click();
  await page.locator('#brn-dialog-10').click();
  await page.locator('#mis-select-trigger-15').click();
  await page.locator('#brn-dialog-11').click();
  await page.locator('div').filter({ hasText: 'PhDAll Types Dual Degree PG' }).nth(2).click();
  await page.getByRole('cell', { name: 'Oct 15, 2026, 12:53 PM' }).click();
  await page.getByText('Completed').nth(3).click();
});


//invalid students data excel :

import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
 await page.goto('/apps')
   await page.getBytext('admissions')

  await page.getByRole('link', { name: 'Student Import', exact: true }).click();
  await page.getByRole('link', { name: 'Import Students' }).click();
  await page.locator('#mis-select-trigger-4').click();
  await page.locator('#brn-dialog-1').click();
  await page.locator('#mis-select-trigger-5').click();
  await page.locator('#brn-dialog-2').click();
  await page.locator('#mis-select-trigger-6').click();
  await page.locator('#brn-dialog-3').click();
  await page.locator('#mis-select-trigger-7').click();
  await page.locator('#brn-dialog-4').click();
  await page.locator('.border-2').click();
  await page.locator('input[type="file"]').setInputFiles('students_valid_data.xlsx');
  await page.getByRole('button', { name: 'Remove' }).click();
  await page.locator('.size-11').click();
  await page.locator('input[type="file"]').setInputFiles('students_invalid_data.xlsx');
  await page.getByRole('button', { name: 'Analyze Spreadsheet' }).click();
  await page.getByRole('heading', { name: 'Cannot Import: 9 Row(s)' }).click();
  await page.getByText('Spreadsheet validation failed').click();
  await page.getByText('Rows with Errors 90% 9').click();
  await page.getByRole('button', { name: 'Re-upload Fixed File' }).click();
});


// regect students batch

import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  
  await page.goto('/apps');
  await page.click('admissions')
  await page.getByRole('link', { name: 'Student Import', exact: true }).click();
  await page.getByRole('link', { name: 'Import Students' }).click();
  await page.locator('#mis-select-trigger-4').click();
  await page.locator('#brn-dialog-1').click();
  await page.locator('#mis-select-trigger-5').click();
  await page.locator('#brn-dialog-2').click();
  await page.locator('#mis-select-trigger-6').click();
  await page.locator('#brn-dialog-3').click();
  await page.locator('#mis-select-trigger-7').click();
  await page.getByRole('option', { name: '-2027 Winter' }).click();
  await page.locator('.border-2').click();
  await page.locator('input[type="file"]').setInputFiles('students_valid_data.xlsx');
  await page.getByRole('button', { name: 'Analyze Spreadsheet' }).click();
  await page.getByRole('button', { name: 'Import Students' }).click();
  await page.getByText('Pending Approval').click();
  await page.getByRole('button', { name: 'Reject Batch' }).click();
  await page.getByRole('textbox', { name: 'Rejection Reason *' }).click();
  await page.getByRole('textbox', { name: 'Rejection Reason *' }).fill('not good');
  await page.getByRole('button', { name: 'Confirm Rejection' }).click();
  await page.getByRole('status').filter({ hasText: 'Student import rejected.' }).click();
  await page.getByRole('status').filter({ hasText: 'Student import was rejected.' }).click();
  await page.getByRole('button', { name: 'Delete' }).click();
  await page.getByRole('alertdialog', { name: 'Delete Student Import' }).click();
  await page.getByRole('button', { name: 'Delete' }).click();
  await page.getByText('Student import deleted successfully.')

});


// delete a batch:

import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
    await page.goto('/apps')
  await page.getByRole('heading', { name: 'Admissions' }).click();
  await page.getByRole('link', { name: 'Student Import', exact: true }).click();
  await page.getByText('PhD').nth(1).click();
  await page.getByText('Completed').nth(2).click();
  await page.locator('#brn-dialog-trigger-3').click();
  await page.getByRole('link', { name: 'View Details' }).click();
  await page.getByRole('button', { name: 'Delete' }).click();
  await page.getByRole('alertdialog', { name: 'Delete Student Import' }).click();
  await page.getByRole('button', { name: 'Delete' }).click();
await page.getByText('Student import deleted successfully.')
  

});

