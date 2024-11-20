import { Locator, Page } from "@playwright/test";

import { clickAndExpectToBeVisible } from "../../utils/clickAndExpectToBeVisible";
export class CheckoutPage {
  private readonly page: Page;

  public readonly checkoutButton: Locator;
  public readonly continueButton: Locator;
  private readonly shopCartLink: Locator;
  public readonly finishButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutButton = page.getByRole("button", {
      name: "Checkout",
    });
    this.continueButton = page.getByRole("button", {
      name: "Continue",
    });
    this.shopCartLink = page.locator(".shopping_cart_link");
    this.finishButton = page.getByRole("button", {
      name: "Finish",
    });
  }

  private productCardLocator(productName: string) {
    return this.page.locator(".inventory_item", {
      hasText: productName,
    });
  }

  async addProductToCart(productName: string) {
    const addToCartButton =
      this.productCardLocator(productName).getByText("Add to cart");

    await addToCartButton.click();
  }

  async fillCheckoutInfo(firstName: string, lastName: string, code: string) {
    await this.page.getByPlaceholder("First Name").fill(firstName);

    await this.page.getByPlaceholder("Last Name").fill(lastName);

    await this.page.getByPlaceholder("Zip/Postal Code").fill(code);
  }

  async openCart() {
    await clickAndExpectToBeVisible({
      target: this.page.getByText("Your Cart"),
      trigger: this.shopCartLink,
    });
  }

  async removeProductFromCart(productName: string) {
    const removeButton = this.page
      .locator(".cart_item", { hasText: productName })
      .getByText("Remove");

    await removeButton.click();
  }
}
