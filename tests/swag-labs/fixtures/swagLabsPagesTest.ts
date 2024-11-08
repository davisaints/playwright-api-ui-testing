import { test } from "@playwright/test";

import { LoginPage } from "../pages/LoginPage";

const swagLabsPagesTest = test.extend<{
  loginPage: LoginPage;
}>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
});

export { swagLabsPagesTest };
