import { expect, mergeTests } from "@playwright/test";
import { swagLabsPagesTest } from "./fixtures/swagLabsPagesTest";

export const test = mergeTests(swagLabsPagesTest);

const products = [
  "Sauce Labs Bike Light",
  "Sauce Labs Bolt T-Shirt",
  "Sauce Labs Fleece Jacket",
];

test.beforeEach(async ({ loginPage }) => {
  await test.step("Given the user navigates to the login page", async () => {
    await loginPage.goToLoginPage();
  });

  await test.step("And the user logs in as 'Standard user'", async () => {
    await loginPage.loginAs("Standard user");
  });
});

test("User can checkout products", async ({ checkoutPage, page }) => {
  await test.step("When the user adds products to the cart", async () => {
    for (const product of products) {
      await checkoutPage.addProductToCart(product);
    }

    await checkoutPage.openCart();

    await checkoutPage.checkoutButton.click();
  });

  await test.step("And the user fills in the checkout information", async () => {
    await checkoutPage.fillCheckoutInfo("userfn", "userln", "123456");

    await checkoutPage.continueButton.click();
  });

  await test.step("And the user completes the checkout process", async () => {
    await checkoutPage.finishButton.click();
  });

  await test.step("Then the order confirmation message should be displayed", async () => {
    await expect(page.getByText("Thank you for your order!")).toBeVisible();
  });
});

test("User can remove products from cart", async ({ checkoutPage, page }) => {
  await test.step("Given the user adds products to the cart", async () => {
    for (const product of products) {
      await checkoutPage.addProductToCart(product);
    }

    await checkoutPage.openCart();
  });

  await test.step("When the user removes a product", async () => {
    await checkoutPage.removeProductFromCart(products[0]);
  });

  await test.step("Then the product should be removed from the cart", async () => {
    await expect(page.getByRole("link", { name: products[0] })).toBeHidden();
  });
});
