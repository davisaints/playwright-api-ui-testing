import { expect, test } from "@playwright/test";
import { sitesConfig } from "./sites.config";

test("Can handle alert dialog - accept and dismiss actions", async ({
  page,
}) => {
  // Navigate to the page with alerts
  await page.goto(sitesConfig.alertPage);

  // --- Accept Action ---
  // Click the 'Confirm' button to trigger the alert
  await page.locator("#confirmButton").click();

  // Handle the dialog by accepting it (Click "OK")
  page.once("dialog", (dialog) => {
    dialog.accept();
  });

  // Verify the message after accepting the dialog
  await expect(page.getByText("You selected Ok")).toBeVisible();

  // --- Dismiss Action ---
  // Click the 'Confirm' button again to trigger the alert
  await page.locator("#confirmButton").click();

  // Handle the dialog by dismissing it (Click "Cancel")
  page.once("dialog", (dialog) => {
    dialog.dismiss();
  });

  // Verify the message after dismissing the dialog
  await expect(page.getByText("You selected Cancel")).toBeVisible();
});
