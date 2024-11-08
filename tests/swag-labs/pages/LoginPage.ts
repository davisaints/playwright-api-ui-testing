import { Locator, Page } from "@playwright/test";

import { sitesConfig } from "../sites.config";

export class LoginPage {
  private readonly page: Page;

  private readonly loginButton: Locator;
  private readonly passwordInput: Locator;
  private readonly usernameInput: Locator;

  private readonly userCredentials = {
    "Error user": {
      username: sitesConfig.loginCredentials.usernames.errorUser,
      password: sitesConfig.loginCredentials.passwords.generalPassword,
    },
    "Locked out user": {
      username: sitesConfig.loginCredentials.usernames.lockedUser,
      password: sitesConfig.loginCredentials.passwords.generalPassword,
    },
    "Performance glitch user": {
      username: sitesConfig.loginCredentials.usernames.performanceGlitchUser,
      password: sitesConfig.loginCredentials.passwords.generalPassword,
    },
    "Problem user": {
      username: sitesConfig.loginCredentials.usernames.problemUser,
      password: sitesConfig.loginCredentials.passwords.generalPassword,
    },
    "Standart user": {
      username: sitesConfig.loginCredentials.usernames.standartUser,
      password: sitesConfig.loginCredentials.passwords.generalPassword,
    },
    "Virtual user": {
      username: sitesConfig.loginCredentials.usernames.visualUser,
      password: sitesConfig.loginCredentials.passwords.generalPassword,
    },
  };

  constructor(page: Page) {
    this.page = page;
    this.loginButton = page.locator('[data-test="login-button"]');
    this.passwordInput = page.locator('input[placeholder="Password"]');
    this.usernameInput = page.locator('input[placeholder="Username"]');
  }

  async goToLoginPage() {
    await this.page.goto(sitesConfig.url.baseUrl);

    await this.page.waitForLoadState();
  }

  async loginAs(userAccount: keyof typeof this.userCredentials) {
    const credentials = this.userCredentials[userAccount];

    await this.usernameInput.fill(credentials.username);
    await this.passwordInput.fill(credentials.password);

    await this.loginButton.click();
  }
}
