import { test } from "@playwright/test";

import { InventoryPage } from "../pages/InventoryPage";
import { LoginPage } from "../pages/LoginPage";

const swagLabsPagesTest = test.extend<{
  inventoryPage: InventoryPage;
  loginPage: LoginPage;
}>({
  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
});

export { swagLabsPagesTest };
