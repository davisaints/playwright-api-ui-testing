import { expect, test } from "@playwright/test";
import { sitesConfig } from "./sites.config";

test("Can interact with table", async ({ page }) => {
  // Navigate to the demo page containing the web table
  await page.goto(sitesConfig.tablePage);

  // Select the first row in the table
  const firstRow = page.getByRole('row').nth(1);

  // Click the "Edit" button in the first row to open the edit form
  const editButton = firstRow.locator('[id^="edit"]');
  await editButton.click();

  // Fill in the new salary value in the Salary input field
  const salaryField = page.getByPlaceholder('Salary');
  await salaryField.fill('20000');

  // Click the "Submit" button to save the changes
  const submitButton = page.getByRole('button', { name: 'Submit' });
  await submitButton.click();

  // Verify that the updated salary is reflected in the table row
  await expect(firstRow).toContainText('20000');
});
