import { expect, mergeTests } from "@playwright/test";
import { swagLabsPagesTest } from "./fixtures/swagLabsPagesTest";

export const test = mergeTests(swagLabsPagesTest);

const products = [
  "Sauce Labs Bike Light",
  "Sauce Labs Bolt T-Shirt",
  "Sauce Labs Fleece Jacket",
];

const userInfo = {
  firstName: "John",
  lastName: "Smith",
  postalCode: "123456",
};

test.beforeEach(async ({ loginPage }) => {
  await loginPage.goToLoginPage();

  await loginPage.loginAs("Standard user");
});

test("User can checkout products", async ({ checkoutPage, page }) => {
  await test.step("Given the user adds products to the cart", async () => {
    for (const product of products) {
      await checkoutPage.addProductToCart(product);
    }
    await checkoutPage.openCart();
    await checkoutPage.checkoutButton.click();
  });

  await test.step("When the user fills in the checkout information", async () => {
    await checkoutPage.fillCheckoutInfo(
      userInfo.firstName,
      userInfo.lastName,
      userInfo.postalCode
    );
    await checkoutPage.continueButton.click();
  });

  await test.step("And the user completes the checkout process", async () => {
    await checkoutPage.finishButton.click();
  });

  await test.step("Then the order confirmation message is displayed", async () => {
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

  await test.step("Then the product is removed from the cart", async () => {
    await expect(page.getByRole("link", { name: products[0] })).toBeHidden();
  });
});

test("User can view checkout details before completing purchase", async ({
  checkoutPage,
  page,
}) => {
  await test.step("Given the user adds products to the cart", async () => {
    for (const product of products) {
      await checkoutPage.addProductToCart(product);
    }
    await checkoutPage.openCart();
    await checkoutPage.checkoutButton.click();
  });

  await test.step("When the user fills in the checkout information", async () => {
    await checkoutPage.fillCheckoutInfo(
      userInfo.firstName,
      userInfo.lastName,
      userInfo.postalCode
    );
    await checkoutPage.continueButton.click();
  });

  await test.step("Then the payment, shipping, and total price information is displayed", async () => {
    const paymentInfoValue = page.locator('[data-test="payment-info-value"]');
    await expect(paymentInfoValue).toHaveText("SauceCard #31337");

    const shippingInfoValue = page.locator('[data-test="shipping-info-value"]');
    await expect(shippingInfoValue).toHaveText("Free Pony Express Delivery!");

    const summaryTotalLabel = page.locator('[data-test="total-label"]');
    await expect(summaryTotalLabel).toHaveText("Total: $82.05");
  });
});
