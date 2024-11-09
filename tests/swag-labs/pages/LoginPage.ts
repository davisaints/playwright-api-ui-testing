import { Locator, Page } from "@playwright/test";
import { sitesConfig } from "../sites.config";

export class LoginPage {
  private readonly page: Page;
  private readonly loginButton: Locator;
  private readonly passwordInput: Locator;
  private readonly usernameInput: Locator;

  private readonly userCredentials = sitesConfig.loginCredentials.usernames;

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

  async loginAs(userAccount: "Standard user" | "Locked out user") {
    const { username, password } = this.userCredentials[userAccount];

    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);

    await this.loginButton.click();
  }
}
