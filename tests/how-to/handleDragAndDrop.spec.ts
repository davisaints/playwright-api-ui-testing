import { expect, test } from "@playwright/test";
import { sitesConfig } from "./sites.config";

test("Can drag and drop elements", async ({ page }) => {
  // Navigate to the demo page with draggable elements
  await page.goto(sitesConfig.dragAndDropPage);

  // Perform the drag and drop action
  const dragElement = page.getByText("Drag me", { exact: true });
  const dropTarget = page.getByLabel("Simple").getByText("Drop here");

  await dragElement.dragTo(dropTarget);

  // Verify that the drop action was successful
  await expect(page.getByText("Dropped!")).toBeVisible();
});
