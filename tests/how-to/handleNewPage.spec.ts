import { expect, test } from "@playwright/test";
import { sitesConfig } from "./sites.config";

test("Can open new pages", async ({ context, page }) => {
  // Navigate to the browser windows demo page
  await page.goto(sitesConfig.newPagePage);

  // Wait for the new page (tab) to open when the button is clicked
  const pagePromise = context.waitForEvent("page");

  // Click the button to open a new tab
  await page.getByRole("button", { name: "New Tab" }).click();

  // Wait for the new tab to open
  const newPage = await pagePromise;

  // Verify the heading in the new page is visible
  await expect(
    newPage.getByRole("heading", { name: "This is a sample page" })
  ).toBeVisible();

  // Close the new page after validation
  await newPage.close();
});
