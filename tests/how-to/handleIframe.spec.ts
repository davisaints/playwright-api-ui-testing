import { expect, test } from "@playwright/test";
import { sitesConfig } from "./sites.config";

test("Can interact with iframe", async ({ page }) => {
  // Navigate to the demo page with iframes
  await page.goto(sitesConfig.iframePage);

  // Get the content inside the iframe
  const pageInsideIframe = page
    .frameLocator("#frame1")
    .getByText("This is a sample page");

  // Verify that the text is visible inside the iframe
  await expect(pageInsideIframe).toBeVisible();
});
